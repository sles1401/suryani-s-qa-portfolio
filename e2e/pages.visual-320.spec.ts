import { test, expect } from "@playwright/test";
import { setTheme } from "./helpers";

const PAGES = [
  { path: "/", name: "home" },
  { path: "/about", name: "about" },
  { path: "/experience", name: "experience" },
  { path: "/portfolio", name: "portfolio" },
  { path: "/contact", name: "contact" },
] as const;

// 320px is the smallest widely-supported mobile width (iPhone SE 1st gen).
// Anything clipped here indicates a hard layout bug that will bite users on
// narrow devices.
const WIDTH = 320;
const HEIGHT = 720;

for (const theme of ["light", "dark"] as const) {
  test.describe(`320px overflow + snapshots — ${theme}`, () => {
    test.use({ viewport: { width: WIDTH, height: HEIGHT } });

    for (const p of PAGES) {
      test(`${p.name} has no horizontal overflow and matches snapshot (320/${theme})`, async ({
        page,
      }) => {
        await setTheme(page, theme);
        await page.goto(p.path);
        await page.waitForLoadState("networkidle");
        await page.waitForTimeout(400);

        // Page-level guard: viewport must not scroll horizontally.
        const overflow = await page.evaluate(
          () => document.documentElement.scrollWidth - window.innerWidth
        );
        expect(overflow, "document horizontal overflow").toBeLessThanOrEqual(1);

        // Element-level guard: no visible element wider than the viewport.
        const widest = await page.evaluate((vw) => {
          let max = 0;
          for (const el of Array.from(document.body.querySelectorAll<HTMLElement>("*"))) {
            const r = el.getBoundingClientRect();
            if (r.width > max && r.height > 0) max = r.width;
          }
          return { max, vw };
        }, WIDTH);
        expect(widest.max, "widest rendered element").toBeLessThanOrEqual(WIDTH + 1);

        await expect(page).toHaveScreenshot(
          `${p.name}-320-${theme}.png`,
          { animations: "disabled", fullPage: true }
        );
      });
    }
  });
}