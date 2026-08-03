import { test, expect } from "@playwright/test";
import { setTheme, hideVolatileUI } from "./helpers";

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
        await hideVolatileUI(page);
        await page.waitForTimeout(400);

        // Page-level guard: viewport must not scroll horizontally. Individual
        // elements (e.g. a wide data table) may exceed 320px as long as they
        // sit inside a scoped overflow-x scroller so the page itself stays put.
        const overflow = await page.evaluate(
          () => document.documentElement.scrollWidth - window.innerWidth
        );
        expect(overflow, "document horizontal overflow").toBeLessThanOrEqual(1);

        // DOM guard: nothing visible extends past the right edge of the
        // viewport (i.e. gets clipped off-screen).
        const clipped = await page.evaluate((vw) => {
          const list: Array<{ tag: string; right: number }> = [];
          for (const el of Array.from(document.body.querySelectorAll<HTMLElement>("*"))) {
            const r = el.getBoundingClientRect();
            if (r.right > vw + 1 && r.height > 0 && r.width > 0) {
              // Skip elements that are children of a horizontally scrollable
              // ancestor — they're intentionally scrollable, not clipped.
              let p: HTMLElement | null = el.parentElement;
              let inScroller = false;
              while (p) {
                const s = getComputedStyle(p);
                if (s.overflowX === "auto" || s.overflowX === "scroll") {
                  inScroller = true;
                  break;
                }
                p = p.parentElement;
              }
              if (!inScroller) list.push({ tag: el.tagName, right: Math.round(r.right) });
            }
          }
          return list;
        }, WIDTH);
        expect(clipped, "elements clipped past viewport right edge").toEqual([]);

        await expect(page).toHaveScreenshot(
          `${p.name}-320-${theme}.png`,
          { animations: "disabled", fullPage: true }
        );
      });
    }
  });
}