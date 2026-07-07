import { test, expect } from "@playwright/test";
import { gotoPortfolio, setTheme } from "./helpers";

// Snapshot the QA Portfolio POM modal in its open state at tablet (768)
// and desktop (1024) breakpoints, in both themes, with reduced motion
// enabled. Guards against animation-driven mount shifts and dialog
// clipping at mid-size and desktop widths.
const BREAKPOINTS = [
  { name: "tablet-768", width: 768, height: 1180 },
  { name: "desktop-1024", width: 1024, height: 1400 },
] as const;

for (const bp of BREAKPOINTS) {
  for (const theme of ["light", "dark"] as const) {
    test.describe(`POM modal · ${bp.name} · reduced motion (${theme})`, () => {
      test.use({
        viewport: { width: bp.width, height: bp.height },
        reducedMotion: "reduce",
      });

      test(`open modal snapshot (${bp.name}/${theme})`, async ({ page }) => {
        await setTheme(page, theme);
        await gotoPortfolio(page);

        await page
          .getByRole("button", {
            name: /Expand Page Object Model structure snippet/i,
          })
          .click();

        const dialog = page.getByRole("dialog");
        await expect(dialog).toBeVisible();
        await page.waitForTimeout(200);

        const overflow = await page.evaluate(
          () => document.documentElement.scrollWidth - window.innerWidth
        );
        expect(overflow).toBeLessThanOrEqual(1);

        await expect(dialog).toHaveScreenshot(
          `pom-modal-open-${bp.name}-${theme}-reduced-motion.png`,
          { animations: "disabled" }
        );
      });
    });
  }
}