import { test, expect } from "@playwright/test";
import { gotoPortfolio, setTheme } from "./helpers";

// The QA Portfolio POM dialog must expose correct dialog semantics while
// open (role="dialog", aria-modal, labelled/described by real nodes) and
// must remove all of those attributes from the DOM once closed, in both
// Light and Dark themes.
for (const theme of ["light", "dark"] as const) {
  test.describe(`POM modal — ARIA semantics (${theme})`, () => {
    test.beforeEach(async ({ page }) => {
      await setTheme(page, theme);
      await gotoPortfolio(page);
    });

    test(`dialog exposes role/aria on open, gone on close (${theme})`, async ({
      page,
    }) => {
      const trigger = page.getByRole("button", {
        name: /Expand Page Object Model structure snippet/i,
      });
      await trigger.focus();
      await page.keyboard.press("Enter");

      const dialog = page.getByRole("dialog");
      await expect(dialog).toBeVisible();

      // Core dialog semantics.
      await expect(dialog).toHaveAttribute("role", "dialog");
      await expect(dialog).toHaveAttribute("aria-modal", "true");

      // aria-labelledby / aria-describedby must reference real, non-empty nodes.
      const labelledBy = await dialog.getAttribute("aria-labelledby");
      expect(labelledBy, "dialog must have aria-labelledby").toBeTruthy();
      const labelText = await page
        .locator(`#${labelledBy}`)
        .innerText();
      expect(labelText.trim().length).toBeGreaterThan(0);

      const describedBy = await dialog.getAttribute("aria-describedby");
      if (describedBy) {
        const descText = await page.locator(`#${describedBy}`).innerText();
        expect(descText.trim().length).toBeGreaterThan(0);
      }

      // Close and verify no dialog role remains in the DOM.
      await page.keyboard.press("Escape");
      await expect(page.getByRole("dialog")).toHaveCount(0);

      // No stray aria-modal="true" nodes should be left behind.
      const stray = await page.locator('[aria-modal="true"]').count();
      expect(stray).toBe(0);
    });
  });
}