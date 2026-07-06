import { test, expect } from "@playwright/test";
import { gotoPortfolio, setTheme } from "./helpers";

// Same keyboard-a11y contract as pom-modal.themes.spec.ts, but with
// prefers-reduced-motion forced on. Radix animates the dialog on mount;
// with reduced motion the mount is near-instant, so focus landing and
// Escape-to-close must still work without racing an animation frame.
for (const theme of ["light", "dark"] as const) {
  test.describe(`POM modal — reduced motion (${theme})`, () => {
    test.use({ reducedMotion: "reduce" });

    test.beforeEach(async ({ page }) => {
      await setTheme(page, theme);
      await gotoPortfolio(page);
    });

    test(`Tab order, focus lands in dialog, Escape closes (${theme}, reduced motion)`, async ({
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

      // Focus lands inside the dialog even with animations suppressed.
      const landedInside = await dialog.evaluate((d) =>
        d.contains(document.activeElement)
      );
      expect(landedInside).toBe(true);

      const repoLink = dialog.getByRole("link", {
        name: /Open Java Playwright repository on GitHub/i,
      });
      const closeBtn = dialog.getByRole("button", { name: /close/i });

      // Tab cycle reaches both interactive controls, focus stays trapped.
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

      // Escape closes and restores focus to the trigger.
      await page.keyboard.press("Escape");
      await expect(dialog).toBeHidden();
      await expect(trigger).toBeFocused();
    });
  });
}