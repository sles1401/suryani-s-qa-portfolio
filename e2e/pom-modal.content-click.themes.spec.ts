import { test, expect } from "@playwright/test";
import { gotoPortfolio, setTheme } from "./helpers";

// Clicking inside the dialog surface (title, description, code snippet)
// must not dismiss the dialog. Focus must stay trapped inside for the
// duration, in both Light and Dark themes.
for (const theme of ["light", "dark"] as const) {
  test.describe(`POM modal — inside-click preserves open state (${theme})`, () => {
    test.beforeEach(async ({ page }) => {
      await setTheme(page, theme);
      await gotoPortfolio(page);
    });

    test(`clicking modal content keeps dialog open, focus trapped (${theme})`, async ({
      page,
    }) => {
      const trigger = page.getByRole("button", {
        name: /Expand Page Object Model structure snippet/i,
      });
      await trigger.click();

      const dialog = page.getByRole("dialog");
      await expect(dialog).toBeVisible();

      // Click the title, then any non-interactive text inside the dialog,
      // then the dialog surface itself. None of these should close it.
      const title = dialog.locator(`#${await dialog.getAttribute("aria-labelledby")}`);
      await title.click();
      await expect(dialog).toBeVisible();

      await dialog.click({ position: { x: 20, y: 20 } });
      await expect(dialog).toBeVisible();

      // Focus must still be trapped inside on subsequent Tab walks.
      for (let i = 0; i < 6; i++) {
        await page.keyboard.press("Tab");
        const inside = await dialog.evaluate((d) =>
          d.contains(document.activeElement)
        );
        expect(inside).toBe(true);
      }

      // Reverse walk stays trapped too.
      for (let i = 0; i < 6; i++) {
        await page.keyboard.press("Shift+Tab");
        const inside = await dialog.evaluate((d) =>
          d.contains(document.activeElement)
        );
        expect(inside).toBe(true);
      }

      // Sanity: dialog is still open at the end.
      await expect(dialog).toBeVisible();

      // Escape closes and releases the trap.
      await page.keyboard.press("Escape");
      await expect(dialog).toBeHidden();
      await expect(trigger).toBeFocused();
    });
  });
}