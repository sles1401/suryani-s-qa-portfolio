import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { setTheme } from "./helpers";

// Axe scan for the Contact page: pristine form, then form with visible
// Zod validation errors, run in both themes. Catches contrast, label,
// and aria-describedby regressions on the error surface specifically.
for (const theme of ["light", "dark"] as const) {
  test.describe(`axe: Contact page (${theme})`, () => {
    test.beforeEach(async ({ page }) => {
      await setTheme(page, theme);
      await page.goto("/contact");
      await page.waitForLoadState("networkidle");
      // Bypass HTML5 constraint validation so we exercise the Zod-driven
      // error UI, not the browser tooltip.
      await page.evaluate(() => {
        document
          .querySelectorAll("form")
          .forEach((f) => f.setAttribute("novalidate", ""));
      });
    });

    test(`pristine Contact page has no serious/critical a11y issues (${theme})`, async ({
      page,
    }) => {
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
        .analyze();

      const blocking = results.violations.filter((v) =>
        ["serious", "critical"].includes(v.impact ?? "")
      );
      if (blocking.length) console.log(JSON.stringify(blocking, null, 2));
      expect(blocking).toEqual([]);
    });

    test(`Contact form with visible validation errors has no serious/critical a11y issues (${theme})`, async ({
      page,
    }) => {
      // Trigger empty-submit → required errors render.
      await page.getByRole("button", { name: /^Send Message$/i }).click();
      await expect(page.getByText(/^Name is required$/i)).toBeVisible();
      await expect(page.getByText(/^Invalid email address$/i)).toBeVisible();
      await expect(page.getByText(/^Message is required$/i)).toBeVisible();

      // Also exercise a format error to cover the "typed but invalid" path.
      await page.getByLabel(/Email Address/i).fill("not-an-email");
      await page.getByRole("button", { name: /^Send Message$/i }).click();
      await expect(page.getByText(/^Invalid email address$/i)).toBeVisible();

      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
        .analyze();

      const blocking = results.violations.filter((v) =>
        ["serious", "critical"].includes(v.impact ?? "")
      );
      if (blocking.length) console.log(JSON.stringify(blocking, null, 2));
      expect(blocking).toEqual([]);
    });
  });
}