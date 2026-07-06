import { test, expect } from "@playwright/test";
import { setTheme } from "./helpers";

// Mobile (375px, iPhone-class width) full-page snapshots with
// prefers-reduced-motion enabled, in both themes. Guards against
// animation-driven layout shifts and off-screen clipping at the
// smallest common iOS width above 320px.
const PAGES = [
  { path: "/", name: "home" },
  { path: "/about", name: "about" },
  { path: "/experience", name: "experience" },
  { path: "/portfolio", name: "portfolio" },
  { path: "/contact", name: "contact" },
] as const;

const WIDTH = 375;
const HEIGHT = 812;

for (const theme of ["light", "dark"] as const) {
  test.describe(`Mobile reduced-motion snapshots (375px · ${theme})`, () => {
    test.use({
      viewport: { width: WIDTH, height: HEIGHT },
      reducedMotion: "reduce",
    });

    for (const p of PAGES) {
      test(`${p.name} mobile-375 reduced-motion snapshot (${theme})`, async ({
        page,
      }) => {
        await setTheme(page, theme);
        await page.goto(p.path);
        await page.waitForLoadState("networkidle");
        await page.waitForTimeout(200);

        const overflow = await page.evaluate(
          () => document.documentElement.scrollWidth - window.innerWidth
        );
        expect(overflow).toBeLessThanOrEqual(1);

        await expect(page).toHaveScreenshot(
          `${p.name}-mobile-375-${theme}-reduced-motion.png`,
          { animations: "disabled", fullPage: true }
        );
      });
    }
  });
}