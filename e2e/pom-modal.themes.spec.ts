import { test, expect } from "@playwright/test";
import { gotoPortfolio, setTheme } from "./helpers";

// Keyboard-accessibility of the QA Portfolio POM modal across themes:
// - Tab order lands inside the dialog and stays trapped
// - Escape closes and returns focus to the trigger
for (const theme of ["light", "dark"] as const) {
  test.describe(`POM modal — keyboard a11y (${theme})`, () => {
    test.beforeEach(async ({ page }) => {
      await setTheme(page, theme);
      await gotoPortfolio(page);
    });

    test(`Tab order + focus trap + Escape returns focus (${theme})`, async ({
      page,
    }) => {
      const trigger = page.getByRole("button", {
        name: /Expand Page Object Model structure snippet/i,
      });
      await trigger.focus();
      await expect(trigger).toBeFocused();
      await page.keyboard.press("Enter");

      const dialog = page.getByRole("dialog");
      await expect(dialog).toBeVisible();

      // Focus lands inside the dialog
      const landedInside = await dialog.evaluate((d) =>
        d.contains(document.activeElement)
      );
      expect(landedInside).toBe(true);

      const repoLink = dialog.getByRole("link", {
        name: /Open Java Playwright repository on GitHub/i,
      });
      const closeBtn = dialog.getByRole("button", { name: /close/i });

      // Walk Tab several times; focus must reach both controls and stay trapped
      const seen = new Set<string>();
      for (let i = 0; i < 8; i++) {
        await page.keyboard.press("Tab");
        if (await repoLink.evaluate((el) => el === document.activeElement))
          seen.add("repo");
        if (await closeBtn.evaluate((el) => el === document.activeElement))
          seen.add("close");
        const inside = await dialog.evaluate((d) =>
          d.contains(document.activeElement)
        );
        expect(inside).toBe(true);
      }
      expect(seen.has("repo")).toBe(true);
      expect(seen.has("close")).toBe(true);

      // Escape closes and returns focus to the trigger
      await page.keyboard.press("Escape");
      await expect(dialog).toBeHidden();
      await expect(trigger).toBeFocused();
    });
  });
}