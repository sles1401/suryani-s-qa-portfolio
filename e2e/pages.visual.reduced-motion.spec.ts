import { test, expect } from "@playwright/test";
import { setTheme } from "./helpers";

// Snapshot every page at tablet + desktop breakpoints with prefers-reduced-motion
// forced on. Catches animation-driven layout shifts (framer-motion fade/slide
// initial offsets, transition-height jumps, etc.) that only surface once the
// motion path is disabled.
const PAGES = [
  { path: "/", name: "home" },
  { path: "/about", name: "about" },
  { path: "/experience", name: "experience" },
  { path: "/portfolio", name: "portfolio" },
  { path: "/contact", name: "contact" },
] as const;

const BREAKPOINTS = [
  { name: "tablet", width: 768, height: 1180 },
  { name: "desktop", width: 1024, height: 1400 },
] as const;

for (const bp of BREAKPOINTS) {
  for (const theme of ["light", "dark"] as const) {
    test.describe(`Reduced-motion snapshots — ${bp.name} · ${theme}`, () => {
      test.use({
        viewport: { width: bp.width, height: bp.height },
        reducedMotion: "reduce",
      });

      for (const p of PAGES) {
        test(`${p.name} reduced-motion snapshot (${bp.name}/${theme})`, async ({
          page,
        }) => {
          await setTheme(page, theme);
          await page.goto(p.path);
          await page.waitForLoadState("networkidle");
          // With reduced motion, animations should be near-instant; small
          // settle window guards against layout-affecting mounts.
          await page.waitForTimeout(200);

          const overflow = await page.evaluate(
            () => document.documentElement.scrollWidth - window.innerWidth
          );
          expect(overflow).toBeLessThanOrEqual(1);

          await expect(page).toHaveScreenshot(
            `${p.name}-${bp.name}-${theme}-reduced-motion.png`,
            { animations: "disabled", fullPage: true }
          );
        });
      }
    });
  }
}