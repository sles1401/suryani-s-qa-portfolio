import { test, expect } from "@playwright/test";
import { setTheme, hideVolatileUI } from "./helpers";

const PAGES = [
  { path: "/", name: "home" },
  { path: "/about", name: "about" },
  { path: "/experience", name: "experience" },
  { path: "/portfolio", name: "portfolio" },
  { path: "/contact", name: "contact" },
] as const;

const BREAKPOINTS = [
  { name: "mobile", width: 390, height: 844 },
  { name: "tablet", width: 768, height: 1180 },
] as const;

for (const bp of BREAKPOINTS) {
  for (const theme of ["light", "dark"] as const) {
    test.describe(`Page snapshots — ${bp.name} · ${theme}`, () => {
      test.use({ viewport: { width: bp.width, height: bp.height } });

      for (const p of PAGES) {
        test(`${p.name} has no overflow/truncation and matches snapshot (${bp.name}/${theme})`, async ({
          page,
        }) => {
          await setTheme(page, theme);
          await page.goto(p.path);
          await page.waitForLoadState("networkidle");
        await hideVolatileUI(page);
          // Let fade-in animations settle so snapshots are stable.
          await page.waitForTimeout(400);

          // Guard: no horizontal overflow at this breakpoint.
          const overflow = await page.evaluate(
            () => document.documentElement.scrollWidth - window.innerWidth
          );
          expect(overflow).toBeLessThanOrEqual(1);

          await expect(page).toHaveScreenshot(
            `${p.name}-${bp.name}-${theme}.png`,
            { animations: "disabled", fullPage: true }
          );
        });
      }
    });
  }
}