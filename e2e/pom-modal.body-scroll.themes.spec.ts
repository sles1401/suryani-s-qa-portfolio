import { test, expect } from "@playwright/test";
import { gotoPortfolio, setTheme } from "./helpers";

// Radix Dialog locks body scroll on open (by setting overflow/pointer-events
// styles on <body>). After close, the body must be scrollable again and no
// scroll-lock styles should persist, in both themes.
for (const theme of ["light", "dark"] as const) {
  test.describe(`POM modal — body scroll lifecycle (${theme})`, () => {
    test.beforeEach(async ({ page }) => {
      await setTheme(page, theme);
      await gotoPortfolio(page);
    });

    test(`body scroll is restored after close (${theme})`, async ({ page }) => {
      // Snapshot baseline body styles before opening.
      const baseline = await page.evaluate(() => ({
        overflow: document.body.style.overflow,
        paddingRight: document.body.style.paddingRight,
        pointerEvents: document.body.style.pointerEvents,
      }));

      const trigger = page.getByRole("button", {
        name: /Expand Page Object Model structure snippet/i,
      });
      await trigger.click();

      const dialog = page.getByRole("dialog");
      await expect(dialog).toBeVisible();

      // While open, body scroll should be locked (overflow hidden or
      // pointer-events none set by Radix's scroll-lock).
      const locked = await page.evaluate(() => {
        const bs = document.body.style;
        const cs = getComputedStyle(document.body);
        return {
          overflow: bs.overflow,
          computedOverflow: cs.overflow,
          pointerEvents: bs.pointerEvents,
        };
      });
      // Accept either overflow:hidden or pointer-events:none as the lock signal.
      const isLocked =
        locked.overflow === "hidden" ||
        locked.computedOverflow === "hidden" ||
        locked.pointerEvents === "none";
      expect(isLocked).toBe(true);

      // Close via Escape.
      await page.keyboard.press("Escape");
      await expect(dialog).toBeHidden();

      // Give Radix a tick to unwind the scroll-lock cleanup.
      await page.waitForTimeout(150);

      // Body must be scrollable again — no lingering overflow/pointer-events lock.
      const afterClose = await page.evaluate(() => {
        const bs = document.body.style;
        const cs = getComputedStyle(document.body);
        return {
          overflow: bs.overflow,
          computedOverflow: cs.overflow,
          pointerEvents: bs.pointerEvents,
          computedPointerEvents: cs.pointerEvents,
        };
      });
      expect(afterClose.overflow).toBe(baseline.overflow);
      expect(afterClose.computedOverflow).not.toBe("hidden");
      expect(afterClose.pointerEvents).toBe(baseline.pointerEvents);
      expect(afterClose.computedPointerEvents).not.toBe("none");

      // Prove scroll actually works: scroll the window and confirm scrollY moves.
      await page.evaluate(() => window.scrollTo(0, 0));
      const startY = await page.evaluate(() => window.scrollY);
      await page.evaluate(() => window.scrollBy(0, 400));
      const endY = await page.evaluate(() => window.scrollY);
      expect(endY).toBeGreaterThan(startY);
    });
  });
}