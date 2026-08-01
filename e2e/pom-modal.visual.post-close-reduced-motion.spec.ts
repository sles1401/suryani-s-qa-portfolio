import { test, expect } from "@playwright/test";
import { gotoPortfolio, setTheme } from "./helpers";

// Snapshot the Portfolio POM trigger and its surrounding Evidence Hub section
// immediately after the modal closes, at key widths in both themes with
// reduced motion enabled. Catches leftover overlay tint, shifted layout, or
// focus-ring regressions in the restored post-close state.
const BREAKPOINTS = [
  { name: "mobile-375", width: 375, height: 812 },
  { name: "tablet-768", width: 768, height: 1180 },
  { name: "desktop-1024", width: 1024, height: 1400 },
] as const;

for (const bp of BREAKPOINTS) {
  for (const theme of ["light", "dark"] as const) {
    test.describe(`POM post-close · ${bp.name} · reduced motion (${theme})`, () => {
      test.use({
        viewport: { width: bp.width, height: bp.height },
        reducedMotion: "reduce",
      });

      test(`trigger + section snapshot after close (${bp.name}/${theme})`, async ({
        page,
      }) => {
        await setTheme(page, theme);
        await gotoPortfolio(page);

        const trigger = page.getByRole("button", {
          name: /Expand Page Object Model structure snippet/i,
        });
        await trigger.click();

        const dialog = page.getByRole("dialog");
        await expect(dialog).toBeVisible();
        await page.keyboard.press("Escape");
        await expect(page.getByRole("dialog")).toHaveCount(0);
        await page.waitForTimeout(250); // settle unmount + scroll-lock unwind

        // Focus is back on the trigger, so the snapshot also covers the ring.
        await expect(trigger).toBeFocused();

        // No horizontal overflow left behind.
        const overflow = await page.evaluate(
          () => document.documentElement.scrollWidth - window.innerWidth
        );
        expect(overflow).toBeLessThanOrEqual(1);

        await expect(trigger).toHaveScreenshot(
          `pom-post-close-trigger-${bp.name}-${theme}-reduced-motion.png`,
          { animations: "disabled" }
        );

        await page.locator("#qa-deliverables").scrollIntoViewIfNeeded();
        await expect(page.locator("#qa-deliverables")).toHaveScreenshot(
          `pom-post-close-section-${bp.name}-${theme}-reduced-motion.png`,
          { animations: "disabled" }
        );
      });
    });
  }
}
