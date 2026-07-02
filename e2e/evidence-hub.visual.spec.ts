import { test, expect } from "@playwright/test";
import { gotoPortfolio, setTheme } from "./helpers";

for (const theme of ["light", "dark"] as const) {
  test.describe(`Evidence Hub — ${theme} mode`, () => {
    test.beforeEach(async ({ page }) => {
      await setTheme(page, theme);
    });

    test(`snapshot: Evidence Hub grid (${theme})`, async ({ page }) => {
      await gotoPortfolio(page);
      const section = page.locator("#qa-deliverables");
      await expect(section).toHaveScreenshot(`evidence-hub-${theme}.png`, {
        animations: "disabled",
      });
    });

    test(`snapshot: POM modal (${theme})`, async ({ page }) => {
      await gotoPortfolio(page);
      await page
        .getByRole("button", {
          name: /Expand Page Object Model structure snippet/i,
        })
        .click();
      const dialog = page.getByRole("dialog");
      await expect(dialog).toBeVisible();
      await expect(dialog).toHaveScreenshot(`pom-modal-${theme}.png`, {
        animations: "disabled",
      });
    });
  });
}