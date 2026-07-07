import { test, expect } from "@playwright/test";
import { gotoPortfolio, setTheme } from "./helpers";

// Forward (Tab) and backward (Shift+Tab) traversal must keep focus trapped
// inside the QA Portfolio POM dialog for the entire time it is open, in
// both Light and Dark themes. Once closed via Escape, focus must leave the
// dialog and return to the trigger.
for (const theme of ["light", "dark"] as const) {
  test.describe(`POM modal — bidirectional focus trap (${theme})`, () => {
    test.beforeEach(async ({ page }) => {
      await setTheme(page, theme);
      await gotoPortfolio(page);
    });

    test(`Tab and Shift+Tab stay trapped until Escape (${theme})`, async ({
      page,
    }) => {
      const trigger = page.getByRole("button", {
        name: /Expand Page Object Model structure snippet/i,
      });
      await trigger.focus();
      await page.keyboard.press("Enter");

      const dialog = page.getByRole("dialog");
      await expect(dialog).toBeVisible();

      // Forward walk — focus must remain inside the dialog on every step.
      for (let i = 0; i < 10; i++) {
        await page.keyboard.press("Tab");
        const inside = await dialog.evaluate((d) =>
          d.contains(document.activeElement)
        );
        expect(inside).toBe(true);
      }

      // Reverse walk — Shift+Tab must also be trapped.
      for (let i = 0; i < 10; i++) {
        await page.keyboard.press("Shift+Tab");
        const inside = await dialog.evaluate((d) =>
          d.contains(document.activeElement)
        );
        expect(inside).toBe(true);
      }

      // Escape releases the trap and returns focus to the trigger.
      await page.keyboard.press("Escape");
      await expect(dialog).toBeHidden();
      await expect(trigger).toBeFocused();
    });
  });
}