import { test, expect } from "@playwright/test";
import { gotoPortfolio, setTheme } from "./helpers";

test.describe("POM modal — focus trap & return", () => {
  test.beforeEach(async ({ page }) => {
    await setTheme(page, "light");
    await gotoPortfolio(page);
  });

  test("Escape closes modal and returns focus to trigger", async ({ page }) => {
    const trigger = page.getByRole("button", {
      name: /Expand Page Object Model structure snippet/i,
    });
    await trigger.focus();
    await trigger.press("Enter");

    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();

    // Focus is inside the dialog
    const focusedInDialog = await dialog.evaluate((d) =>
      d.contains(document.activeElement)
    );
    expect(focusedInDialog).toBe(true);

    // Tab several times — focus must remain trapped inside dialog
    for (let i = 0; i < 6; i++) {
      await page.keyboard.press("Tab");
      const stillInside = await dialog.evaluate((d) =>
        d.contains(document.activeElement)
      );
      expect(stillInside).toBe(true);
    }

    // Escape closes and returns focus to trigger
    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    await expect(trigger).toBeFocused();
  });

  test("Close button (mouse + keyboard) closes and returns focus", async ({
    page,
  }) => {
    const trigger = page.getByRole("button", {
      name: /Expand Page Object Model structure snippet/i,
    });
    await trigger.focus();
    await trigger.press("Enter");

    const dialog = page.getByRole("dialog");
    const closeBtn = dialog.getByRole("button", { name: /close/i });
    await expect(closeBtn).toBeVisible();

    // Keyboard-activate the Close button
    await closeBtn.focus();
    await expect(closeBtn).toBeFocused();
    await page.keyboard.press("Enter");

    await expect(dialog).toBeHidden();
    await expect(trigger).toBeFocused();
  });
});