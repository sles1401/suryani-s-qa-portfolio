import { test, expect } from "@playwright/test";
import { gotoPortfolio, setTheme, hideVolatileUI } from "./helpers";

// Visual regression for the POM trigger at tablet + desktop widths, in both
// themes, with and without reduced motion. The post-close snapshot must match
// the pre-open one (same baseline file) so any layout shift fails the test.
const BREAKPOINTS = [
  { name: "tablet-768", width: 768, height: 1180 },
  { name: "desktop-1280", width: 1280, height: 900 },
] as const;

const MOTION = [
  { name: "reduced-motion", reduce: true },
  { name: "full-motion", reduce: false },
] as const;

for (const bp of BREAKPOINTS) {
  for (const theme of ["light", "dark"] as const) {
    for (const motion of MOTION) {
      test.describe(`POM trigger + post-close · ${bp.name} · ${theme} · ${motion.name}`, () => {
        test.use({ viewport: { width: bp.width, height: bp.height } });

        test(`trigger is pixel-identical before open and after close (${bp.name}/${theme}/${motion.name})`, async ({
          page,
        }) => {
          await page.emulateMedia({
            reducedMotion: motion.reduce ? "reduce" : "no-preference",
          });
          await setTheme(page, theme);
          await gotoPortfolio(page);
          await hideVolatileUI(page);

          const trigger = page.getByRole("button", {
            name: /Expand Page Object Model structure snippet/i,
          });
          await trigger.scrollIntoViewIfNeeded();
          await page.waitForTimeout(300);

          const baseline = `pom-trigger-${bp.name}-${theme}-${motion.name}.png`;
          await expect(trigger).toHaveScreenshot(baseline, {
            animations: "disabled",
          });

          await trigger.click();
          const dialog = page.getByRole("dialog");
          await expect(dialog).toBeVisible();
          await page.waitForTimeout(250);
          await expect(dialog).toHaveScreenshot(
            `pom-modal-${bp.name}-${theme}-${motion.name}.png`,
            { animations: "disabled" }
          );

          await page.keyboard.press("Escape");
          await expect(page.getByRole("dialog")).toHaveCount(0);
          await page.waitForTimeout(350);

          const overflow = await page.evaluate(
            () => document.documentElement.scrollWidth - window.innerWidth
          );
          expect(overflow).toBeLessThanOrEqual(1);

          // Same baseline as pre-open: proves a clean, shift-free post-close state.
          await expect(trigger).toHaveScreenshot(baseline, {
            animations: "disabled",
          });
        });
      });
    }
  }
}