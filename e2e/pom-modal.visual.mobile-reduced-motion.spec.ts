import { test, expect } from "@playwright/test";
import { gotoPortfolio, setTheme } from "./helpers";

// 375px mobile snapshots of the QA Portfolio POM modal in its open state,
// in both themes, with reduced motion enabled. Guards against
// animation-driven mount shifts, mobile clipping, and dialog overflow at
// the smallest common iOS width.
const WIDTH = 375;
const HEIGHT = 812;

for (const theme of ["light", "dark"] as const) {
  test.describe(`POM modal · mobile 375 · reduced motion (${theme})`, () => {
    test.use({
      viewport: { width: WIDTH, height: HEIGHT },
      reducedMotion: "reduce",
    });

    test(`open modal snapshot (${theme})`, async ({ page }) => {
      await setTheme(page, theme);
      await gotoPortfolio(page);

      await page
        .getByRole("button", {
          name: /Expand Page Object Model structure snippet/i,
        })
        .click();

      const dialog = page.getByRole("dialog");
      await expect(dialog).toBeVisible();
      // Small settle window for mount even with animations disabled.
      await page.waitForTimeout(200);

      // Dialog must not push horizontal overflow at 375px.
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - window.innerWidth
      );
      expect(overflow).toBeLessThanOrEqual(1);

      await expect(dialog).toHaveScreenshot(
        `pom-modal-open-mobile-375-${theme}-reduced-motion.png`,
        { animations: "disabled" }
      );
    });
  });
}