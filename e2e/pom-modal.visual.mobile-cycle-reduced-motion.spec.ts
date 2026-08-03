import { test, expect } from "@playwright/test";
import { gotoPortfolio, setTheme } from "./helpers";

// Mobile-width visual regression for the POM trigger across an
// open → close → open → close cycle with reduced motion enabled: the
// post-close state must be pixel-identical to the pre-open state (no
// layout shift, no leftover overlay tint) in both themes.
const WIDTH = 390;
const HEIGHT = 844;

for (const theme of ["light", "dark"] as const) {
  test.describe(`POM cycle · mobile ${WIDTH} · reduced motion (${theme})`, () => {
    test.use({
      viewport: { width: WIDTH, height: HEIGHT },
      reducedMotion: "reduce",
    });

    test(`trigger + modal snapshots stay stable (${theme})`, async ({ page }) => {
      await page.emulateMedia({ reducedMotion: "reduce" });
      await setTheme(page, theme);
      await gotoPortfolio(page);

      const trigger = page.getByRole("button", {
        name: /Expand Page Object Model structure snippet/i,
      });
      await trigger.scrollIntoViewIfNeeded();
      await page.waitForTimeout(200);

      const shot = (name: string) =>
        expect(trigger).toHaveScreenshot(
          `pom-cycle-trigger-${name}-mobile-${WIDTH}-${theme}-reduced-motion.png`,
          { animations: "disabled" }
        );

      await shot("pre-open");

      for (const pass of ["first", "second"] as const) {
        await trigger.click();
        const dialog = page.getByRole("dialog");
        await expect(dialog).toBeVisible();
        await page.waitForTimeout(150);

        const overflow = await page.evaluate(
          () => document.documentElement.scrollWidth - window.innerWidth
        );
        expect(overflow).toBeLessThanOrEqual(1);

        await expect(dialog).toHaveScreenshot(
          `pom-cycle-modal-${pass}-mobile-${WIDTH}-${theme}-reduced-motion.png`,
          { animations: "disabled" }
        );

        await page.keyboard.press("Escape");
        await expect(page.getByRole("dialog")).toHaveCount(0);
        await page.waitForTimeout(250);
        await expect(trigger).toBeFocused();
        await shot(`post-close-${pass}`);
      }
    });
  });
}