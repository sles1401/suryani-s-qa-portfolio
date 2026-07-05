import { test, expect } from "@playwright/test";
import { setTheme } from "./helpers";

const PAGES = [
  { path: "/", name: "home" },
  { path: "/about", name: "about" },
  { path: "/experience", name: "experience" },
  { path: "/portfolio", name: "portfolio" },
  { path: "/contact", name: "contact" },
] as const;

// 1024px is the Tailwind `lg` breakpoint — the boundary where the header
// switches from burger menu to full nav and multi-column layouts kick in.
const WIDTH = 1024;
const HEIGHT = 1400;

for (const theme of ["light", "dark"] as const) {
  test.describe(`Desktop (1024px) snapshots — ${theme}`, () => {
    test.use({ viewport: { width: WIDTH, height: HEIGHT } });

    for (const p of PAGES) {
      test(`${p.name} desktop snapshot has no overflow (desktop/${theme})`, async ({
        page,
      }) => {
        await setTheme(page, theme);
        await page.goto(p.path);
        await page.waitForLoadState("networkidle");
        await page.waitForTimeout(400);

        const overflow = await page.evaluate(
          () => document.documentElement.scrollWidth - window.innerWidth
        );
        expect(overflow).toBeLessThanOrEqual(1);

        await expect(page).toHaveScreenshot(
          `${p.name}-desktop-${theme}.png`,
          { animations: "disabled", fullPage: true }
        );
      });
    }
  });
}