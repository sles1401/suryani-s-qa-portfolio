import { test, expect } from "@playwright/test";
import { gotoPortfolio, setTheme } from "./helpers";

// Verifies that closing the QA Portfolio POM modal via its Close button
// (mouse and keyboard) returns focus to the exact same trigger element,
// in both Light and Dark themes.
for (const theme of ["light", "dark"] as const) {
  test.describe(`POM modal — Close button returns focus (${theme})`, () => {
    test.beforeEach(async ({ page }) => {
      await setTheme(page, theme);
      await gotoPortfolio(page);
    });

    test(`mouse-click Close returns focus to exact trigger (${theme})`, async ({
      page,
    }) => {
      const trigger = page.getByRole("button", {
        name: /Expand Page Object Model structure snippet/i,
      });
      await trigger.focus();
      const triggerHandle = await trigger.elementHandle();
      await page.keyboard.press("Enter");

      const dialog = page.getByRole("dialog");
      await expect(dialog).toBeVisible();

      await dialog.getByRole("button", { name: /close/i }).click();
      await expect(dialog).toBeHidden();
      await expect(trigger).toBeFocused();

      const isExactTrigger = await page.evaluate(
        (el) => el === document.activeElement,
        triggerHandle
      );
      expect(isExactTrigger).toBe(true);
    });

    test(`keyboard-activated Close returns focus to exact trigger (${theme})`, async ({
      page,
    }) => {
      const trigger = page.getByRole("button", {
        name: /Expand Page Object Model structure snippet/i,
      });
      await trigger.focus();
      const triggerHandle = await trigger.elementHandle();
      await page.keyboard.press("Enter");

      const dialog = page.getByRole("dialog");
      await expect(dialog).toBeVisible();

      const closeBtn = dialog.getByRole("button", { name: /close/i });
      await closeBtn.focus();
      await page.keyboard.press("Enter");

      await expect(dialog).toBeHidden();
      await expect(trigger).toBeFocused();

      const isExactTrigger = await page.evaluate(
        (el) => el === document.activeElement,
        triggerHandle
      );
      expect(isExactTrigger).toBe(true);
    });
  });
}