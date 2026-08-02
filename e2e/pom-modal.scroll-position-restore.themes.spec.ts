import { test, expect } from "@playwright/test";
import { gotoPortfolio, setTheme } from "./helpers";

// Opening the POM modal from a scrolled page must not lose the scroll
// position: after closing (Escape, Close button, backdrop), the original
// scrollTop must be restored exactly, in both Light and Dark themes.
const CLOSERS = ["escape", "close-button", "backdrop"] as const;

type LayoutMetrics = {
  scrollY: number;
  scrollTop: number;
  bodyPaddingRight: string;
  bodyMarginRight: string;
  bodyOverflow: string;
  bodyPosition: string;
  bodyWidth: number;
  documentScrollWidth: number;
  clientWidth: number;
  scrollbarWidth: number;
};

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
        // The site intentionally uses smooth scrolling. Disable it only for
        // fixture positioning so an in-flight smooth scroll cannot be mistaken
        // for a modal-induced offset (the original 33px false signal).
        await page.evaluate(() => {
          const root = document.documentElement;
          const previous = root.style.scrollBehavior;
          root.style.scrollBehavior = "auto";
          window.scrollTo(0, Math.min(window.scrollY + 120, root.scrollHeight - innerHeight - 150));
          root.style.scrollBehavior = previous;
        });

        // Keyboard focus itself may scroll a partly visible trigger. Establish
        // the contract at the exact offset from which activation occurs.
        await trigger.focus();
        const metrics = () =>
          page.evaluate((): LayoutMetrics => {
            const root = document.documentElement;
            const body = getComputedStyle(document.body);
            return {
              scrollY: Math.round(window.scrollY),
              scrollTop: Math.round(root.scrollTop),
              bodyPaddingRight: body.paddingRight,
              bodyMarginRight: body.marginRight,
              bodyOverflow: body.overflow,
              bodyPosition: body.position,
              bodyWidth: Math.round(document.body.getBoundingClientRect().width),
              documentScrollWidth: root.scrollWidth,
              clientWidth: root.clientWidth,
              scrollbarWidth: window.innerWidth - root.clientWidth,
            };
          });

        const before = await metrics();
        expect(before.scrollY, "page must be scrolled before opening").toBeGreaterThan(0);

        await page.keyboard.press("Enter");
        const dialog = page.getByRole("dialog");
        await expect(dialog).toBeVisible();

        const whileOpen = await metrics();
        // Scroll lock must not move the viewport or alter page geometry. Radix
        // may use overflow:hidden and scrollbar compensation while open.
        expect(whileOpen.scrollY).toBe(before.scrollY);
        expect(whileOpen.scrollTop).toBe(before.scrollTop);
        expect(whileOpen.bodyOverflow).toBe("hidden");
        expect(whileOpen.bodyMarginRight).toBe(before.bodyMarginRight);
        expect(whileOpen.bodyWidth).toBe(before.bodyWidth);
        expect(whileOpen.documentScrollWidth).toBe(before.documentScrollWidth);
        expect(whileOpen.clientWidth).toBe(before.clientWidth);
        const compensation =
          Number.parseFloat(whileOpen.bodyPaddingRight) -
          Number.parseFloat(before.bodyPaddingRight);
        expect(Math.abs(compensation - before.scrollbarWidth)).toBeLessThanOrEqual(1);

        if (closer === "escape") {
          await page.keyboard.press("Escape");
        } else if (closer === "close-button") {
          await dialog.getByRole("button", { name: /close/i }).click();
        } else {
          await page.mouse.click(5, 5);
        }
        await expect(page.getByRole("dialog")).toHaveCount(0);
        await page.waitForTimeout(250); // scroll-lock unwind

        const after = await metrics();

        // Every close path must restore the exact activation offset and remove
        // every computed scroll-lock/layout mutation.
        expect(after.scrollY).toBe(before.scrollY);
        expect(after.scrollTop).toBe(before.scrollTop);
        expect(after.bodyPaddingRight).toBe(before.bodyPaddingRight);
        expect(after.bodyMarginRight).toBe(before.bodyMarginRight);
        expect(after.bodyOverflow).toBe(before.bodyOverflow);
        expect(after.bodyPosition).toBe(before.bodyPosition);
        expect(after.bodyWidth).toBe(before.bodyWidth);
        expect(after.documentScrollWidth).toBe(before.documentScrollWidth);
        expect(after.clientWidth).toBe(before.clientWidth);
        expect(after.scrollbarWidth).toBe(before.scrollbarWidth);

        // The trigger is still in the viewport (no jump to top/bottom).
        expect(await trigger.isVisible()).toBe(true);
        const box = await trigger.boundingBox();
        expect(box).not.toBeNull();
        const vh = page.viewportSize()!.height;
        expect(box!.y).toBeGreaterThan(-1);
        expect(box!.y).toBeLessThan(vh);

        // Scrolling still works afterwards. Move upward because this fixture is
        // intentionally close to the document's maximum scroll position.
        await page.evaluate(() => {
          const root = document.documentElement;
          const previous = root.style.scrollBehavior;
          root.style.scrollBehavior = "auto";
          window.scrollTo(0, window.scrollY - 100);
          root.style.scrollBehavior = previous;
        });
        expect(await page.evaluate(() => Math.round(window.scrollY))).toBeLessThan(
          after.scrollY
        );
      });
    }
  });
}
