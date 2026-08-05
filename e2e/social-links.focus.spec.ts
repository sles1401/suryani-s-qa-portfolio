import { test, expect, Locator, Page } from "@playwright/test";
import { setTheme } from "./helpers";

// Header + Footer social links (LinkedIn, GitHub) must be reachable by
// keyboard in DOM order and show a visible focus indicator in both themes.
const assertVisibleFocus = async (locator: Locator) => {
  await expect(locator).toBeFocused();
  const style = await locator.evaluate((el) => {
    const s = getComputedStyle(el as HTMLElement);
    return {
      outlineStyle: s.outlineStyle,
      outlineWidth: s.outlineWidth,
      boxShadow: s.boxShadow,
    };
  });
  const hasOutline =
    style.outlineStyle !== "none" && style.outlineWidth !== "0px";
  const hasRing = !!style.boxShadow && style.boxShadow !== "none";
  expect(
    hasOutline || hasRing,
    "focused social link must show a visible focus indicator"
  ).toBeTruthy();
};

const tabUntilFocused = async (page: Page, locator: Locator, max = 40) => {
  for (let i = 0; i < max; i++) {
    await page.keyboard.press("Tab");
    if (await locator.evaluate((el) => el === document.activeElement)) return true;
  }
  return false;
};

for (const theme of ["light", "dark"] as const) {
  test.describe(`Social links focus order + rings — ${theme}`, () => {
    test.beforeEach(async ({ page }) => {
      await setTheme(page, theme);
      await page.goto("/");
      await page.waitForLoadState("networkidle");
    });

    test(`header social links follow nav in tab order (${theme})`, async ({
      page,
    }) => {
      const header = page.getByRole("banner");
      const linkedin = header.getByRole("link", { name: "LinkedIn" });
      const github = header.getByRole("link", { name: "GitHub" });

      await expect(linkedin).toBeVisible();
      await expect(github).toBeVisible();

      // Header links come after the last nav link ("Contact") in DOM order.
      const contact = header
        .getByRole("link", { name: /^Contact$/ })
        .first();
      await contact.focus();
      await page.keyboard.press("Tab");
      await assertVisibleFocus(linkedin);
      await page.keyboard.press("Tab");
      await assertVisibleFocus(github);

      // Both are new-tab safe external links.
      for (const link of [linkedin, github]) {
        await expect(link).toHaveAttribute("target", "_blank");
        await expect(link).toHaveAttribute("rel", /noopener/);
      }
    });

    test(`footer social links are reachable and focus-visible (${theme})`, async ({
      page,
    }) => {
      const footer = page.getByRole("contentinfo");
      const email = footer.getByRole("link", { name: "Email" });
      const linkedin = footer.getByRole("link", { name: "LinkedIn" });
      const github = footer.getByRole("link", { name: "GitHub" });

      await footer.scrollIntoViewIfNeeded();
      await expect(email).toBeVisible();

      // Email → LinkedIn → GitHub is the DOM order in the footer.
      await email.focus();
      await assertVisibleFocus(email);
      await page.keyboard.press("Tab");
      await assertVisibleFocus(linkedin);
      await page.keyboard.press("Tab");
      await assertVisibleFocus(github);

      await expect(linkedin).toHaveAttribute(
        "href",
        "https://www.linkedin.com/in/suryani-lestari"
      );
      await expect(github).toHaveAttribute("href", "https://github.com/sles1401");
    });

    test(`footer social links are reachable by Tab alone (${theme})`, async ({
      page,
    }) => {
      const github = page.getByRole("contentinfo").getByRole("link", {
        name: "GitHub",
      });
      await page.evaluate(() => (document.activeElement as HTMLElement)?.blur());
      expect(await tabUntilFocused(page, github, 60)).toBeTruthy();
      await assertVisibleFocus(github);
    });
  });
}
