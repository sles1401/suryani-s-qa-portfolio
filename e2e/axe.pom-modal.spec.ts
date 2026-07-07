import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { gotoPortfolio, setTheme } from "./helpers";

// Dedicated axe scans for the QA Portfolio POM modal in both themes.
// The modal itself has no form/validation surface, but we run the scan
// twice per theme: once immediately on open, and once after interacting
// with focusable controls inside the dialog to surface any state-based
// a11y regressions (focus rings, aria state on the Close button, etc.).
const A11Y_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"];

for (const theme of ["light", "dark"] as const) {
  test.describe(`axe: POM modal (${theme})`, () => {
    test.beforeEach(async ({ page }) => {
      await setTheme(page, theme);
      await gotoPortfolio(page);
      await page
        .getByRole("button", {
          name: /Expand Page Object Model structure snippet/i,
        })
        .click();
      await expect(page.getByRole("dialog")).toBeVisible();
    });

    test(`open state has no serious/critical issues (${theme})`, async ({
      page,
    }) => {
      const results = await new AxeBuilder({ page })
        .include('[role="dialog"]')
        .withTags(A11Y_TAGS)
        .analyze();

      const blocking = results.violations.filter((v) =>
        ["serious", "critical"].includes(v.impact ?? "")
      );
      if (blocking.length) console.log(JSON.stringify(blocking, null, 2));
      expect(blocking).toEqual([]);
    });

    test(`interacted state (focus cycled) has no serious/critical issues (${theme})`, async ({
      page,
    }) => {
      const dialog = page.getByRole("dialog");
      // Cycle focus through the dialog controls so any focus-driven
      // aria state (e.g. aria-expanded, focus outlines) is exercised
      // before the scan runs.
      for (let i = 0; i < 4; i++) {
        await page.keyboard.press("Tab");
      }
      await dialog
        .getByRole("link", {
          name: /Open Java Playwright repository on GitHub/i,
        })
        .focus();
      await dialog.getByRole("button", { name: /close/i }).focus();

      const results = await new AxeBuilder({ page })
        .include('[role="dialog"]')
        .withTags(A11Y_TAGS)
        .analyze();

      const blocking = results.violations.filter((v) =>
        ["serious", "critical"].includes(v.impact ?? "")
      );
      if (blocking.length) console.log(JSON.stringify(blocking, null, 2));
      expect(blocking).toEqual([]);
    });
  });
}