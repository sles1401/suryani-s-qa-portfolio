import { test, expect } from "@playwright/test";
import { gotoPortfolio, setTheme } from "./helpers";

// Radix compensates for the scrollbar while the dialog is open (padding-right
// + overflow hidden). After close, scrollbar presence, body padding, and page
// layout width must return to their pre-open values, in both themes.
for (const theme of ["light", "dark"] as const) {
  test.describe(`POM modal — scrollbar & layout restore (${theme})`, () => {
    test.beforeEach(async ({ page }) => {
      await setTheme(page, theme);
      await gotoPortfolio(page);
    });

    test(`scrollbar presence and layout restored after close (${theme})`, async ({
      page,
    }) => {
      const metrics = () =>
        page.evaluate(() => {
          const el = document.documentElement;
          const cs = getComputedStyle(document.body);
          return {
            hasScrollbar: el.scrollHeight > window.innerHeight,
            scrollbarWidth: window.innerWidth - el.clientWidth,
            bodyPaddingRight: cs.paddingRight,
            bodyWidth: Math.round(document.body.getBoundingClientRect().width),
            docScrollWidth: el.scrollWidth,
            overflow: cs.overflow,
          };
        });

      const before = await metrics();
      expect(before.hasScrollbar, "page should be scrollable pre-open").toBe(true);

      const trigger = page.getByRole("button", {
        name: /Expand Page Object Model structure snippet/i,
      });
      await trigger.click();
      const dialog = page.getByRole("dialog");
      await expect(dialog).toBeVisible();

      await page.keyboard.press("Escape");
      await expect(dialog).toBeHidden();
      await page.waitForTimeout(200); // let Radix unwind scroll-lock

      const after = await metrics();
      expect(after.overflow).not.toBe("hidden");
      expect(after.hasScrollbar).toBe(before.hasScrollbar);
      expect(after.scrollbarWidth).toBe(before.scrollbarWidth);
      expect(after.bodyPaddingRight).toBe(before.bodyPaddingRight);
      expect(Math.abs(after.bodyWidth - before.bodyWidth)).toBeLessThanOrEqual(1);
      expect(Math.abs(after.docScrollWidth - before.docScrollWidth)).toBeLessThanOrEqual(1);

      // No horizontal overflow introduced by the lock/unlock cycle.
      const overflowX = await page.evaluate(
        () => document.documentElement.scrollWidth - window.innerWidth
      );
      expect(overflowX).toBeLessThanOrEqual(1);

      // Scrolling actually works again.
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.evaluate(() => window.scrollBy(0, 300));
      expect(await page.evaluate(() => window.scrollY)).toBeGreaterThan(0);
    });
  });
}
