import { test, expect } from "@playwright/test";
import { setTheme } from "./helpers";

// Keyboard-only walk through the header nav and the Contact form,
// asserting focus lands on the expected control at each Tab and that
// the browser applies a visible :focus-visible outline (i.e. the
// computed outline is not "none").
const expectFocusVisible = async (locator: import("@playwright/test").Locator) => {
  await expect(locator).toBeFocused();
  const outline = await locator.evaluate((el) => {
    const s = getComputedStyle(el as HTMLElement);
    return {
      outlineStyle: s.outlineStyle,
      outlineWidth: s.outlineWidth,
      boxShadow: s.boxShadow,
    };
  });
  const hasOutline = outline.outlineStyle !== "none" && outline.outlineWidth !== "0px";
  const hasRing = outline.boxShadow && outline.boxShadow !== "none";
  expect(hasOutline || hasRing).toBeTruthy();
};

for (const theme of ["light", "dark"] as const) {
  test.describe(`Keyboard-only navigation + Contact submit — ${theme}`, () => {
    test.beforeEach(async ({ page }) => {
      await setTheme(page, theme);
    });

    test(`Tab reaches every top-nav link in DOM order (${theme})`, async ({
      page,
    }) => {
      await page.goto("/");
      await page.waitForLoadState("networkidle");

      // Focus the document body then Tab into the header. The logo link
      // is the first focusable element inside <nav>.
      await page.evaluate(() => (document.activeElement as HTMLElement)?.blur());
      await page.keyboard.press("Tab");

      const nav = page.getByRole("navigation");
      const logo = nav.getByRole("link", { name: /Suryani/i }).first();
      await expectFocusVisible(logo);

      for (const name of ["Home", "About", "Experience", "Skills", "Portfolio", "Resume", "Contact"]) {
        await page.keyboard.press("Tab");
        const link = nav.getByRole("link", { name: new RegExp(`^${name}$`) }).first();
        await expectFocusVisible(link);
      }
    });

    test(`Contact form is fully keyboard operable and submits (${theme})`, async ({
      page,
    }) => {
      await page.goto("/contact");
      await page.waitForLoadState("networkidle");

      const name = page.getByLabel(/Full Name/i);
      const email = page.getByLabel(/Email Address/i);
      const subject = page.getByLabel(/Subject/i);
      const message = page.getByLabel(/^Message/i);
      const submit = page.getByRole("button", { name: /^Send Message$/i });

      // Focus first field directly, then walk with Tab.
      await name.focus();
      await expectFocusVisible(name);
      await page.keyboard.type("Keyboard Tester");

      await page.keyboard.press("Tab");
      await expectFocusVisible(email);
      await page.keyboard.type("keyboard@example.com");

      await page.keyboard.press("Tab");
      await expectFocusVisible(subject);
      await page.keyboard.type("Keyboard-only run");

      await page.keyboard.press("Tab");
      await expectFocusVisible(message);
      await page.keyboard.type("Submitted using only the keyboard.");

      await page.keyboard.press("Tab");
      await expectFocusVisible(submit);
      await page.keyboard.press("Enter");

      await expect(
        page.getByRole("heading", { name: /Message Sent!/i })
      ).toBeVisible({ timeout: 5000 });
    });
  });
}