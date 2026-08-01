import { test, expect } from "@playwright/test";
import { gotoPortfolio, setTheme } from "./helpers";

// Opening the POM modal from a scrolled page must not lose the scroll
// position: after closing (Escape, Close button, backdrop), the original
// scrollTop must be restored exactly, in both Light and Dark themes.
const CLOSERS = ["escape", "close-button", "backdrop"] as const;

for (const theme of ["light", "dark"] as const) {
  test.describe(`POM modal — scroll position restore (${theme})`, () => {
    test.beforeEach(async ({ page }) => {
      await setTheme(page, theme);
      await gotoPortfolio(page);
    });

    for (const closer of CLOSERS) {
      test(`scrollTop restored after ${closer} close (${theme})`, async ({
        page,
      }) => {
        // Scroll well down the page, but keep the trigger reachable.
        const trigger = page.getByRole("button", {
          name: /Expand Page Object Model structure snippet/i,
        });
        await trigger.scrollIntoViewIfNeeded();
        await page.evaluate(() => window.scrollBy(0, 120));
        await page.waitForTimeout(150);

        const before = await page.evaluate(() => ({
          y: Math.round(window.scrollY),
          top: Math.round(document.documentElement.scrollTop),
        }));
        expect(before.y, "page must be scrolled before opening").toBeGreaterThan(0);

        await trigger.focus();
        await page.keyboard.press("Enter");
        const dialog = page.getByRole("dialog");
        await expect(dialog).toBeVisible();

        if (closer === "escape") {
          await page.keyboard.press("Escape");
        } else if (closer === "close-button") {
          await dialog.getByRole("button", { name: /close/i }).click();
        } else {
          await page.mouse.click(5, 5);
        }
        await expect(page.getByRole("dialog")).toHaveCount(0);
        await page.waitForTimeout(250); // scroll-lock unwind

        const after = await page.evaluate(() => ({
          y: Math.round(window.scrollY),
          top: Math.round(document.documentElement.scrollTop),
        }));

        expect(Math.abs(after.y - before.y)).toBeLessThanOrEqual(2);
        expect(Math.abs(after.top - before.top)).toBeLessThanOrEqual(2);

        // The trigger is still in the viewport (no jump to top/bottom).
        expect(await trigger.isVisible()).toBe(true);
        const box = await trigger.boundingBox();
        expect(box).not.toBeNull();
        const vh = page.viewportSize()!.height;
        expect(box!.y).toBeGreaterThan(-1);
        expect(box!.y).toBeLessThan(vh);

        // Scrolling still works afterwards.
        await page.evaluate(() => window.scrollBy(0, 100));
        expect(await page.evaluate(() => Math.round(window.scrollY))).toBeGreaterThan(
          after.y
        );
      });
    }
  });
}
