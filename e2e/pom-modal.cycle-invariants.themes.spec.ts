import { test, expect } from "@playwright/test";
import { gotoPortfolio, setTheme } from "./helpers";

// open → close → open, repeated: scrollTop, focus return and the full ARIA
// relationship set (aria-expanded / aria-controls / aria-modal / role=dialog)
// must be byte-identical on every cycle, in both themes.
const CYCLES = 3;

for (const theme of ["light", "dark"] as const) {
  test.describe(`POM modal — cycle invariants (${theme})`, () => {
    test.beforeEach(async ({ page }) => {
      await setTheme(page, theme);
      await gotoPortfolio(page);
    });

    test(`scroll/focus/ARIA identical across ${CYCLES} cycles (${theme})`, async ({
      page,
    }) => {
      const trigger = page.getByRole("button", {
        name: /Expand Page Object Model structure snippet/i,
      });
      // While the dialog is open Radix hides the rest of the page from the
      // a11y tree, so role queries can't reach the trigger. Use a DOM
      // locator for attribute assertions made during the open state.
      const triggerDom = page.locator(
        'button[aria-label="Expand Page Object Model structure snippet"]'
      );
      await trigger.scrollIntoViewIfNeeded();
      await page.evaluate(() => {
        const root = document.documentElement;
        const prev = root.style.scrollBehavior;
        root.style.scrollBehavior = "auto";
        window.scrollTo(0, window.scrollY + 80);
        root.style.scrollBehavior = prev;
      });
      await trigger.focus();

      const scrollTop = () =>
        page.evaluate(() => Math.round(document.documentElement.scrollTop));
      const baselineScroll = await scrollTop();
      const controls = await trigger.getAttribute("aria-controls");
      expect(await trigger.getAttribute("aria-expanded")).toBe("false");

      for (let i = 0; i < CYCLES; i++) {
        await page.keyboard.press("Enter");

        const dialog = page.getByRole("dialog");
        await expect(dialog).toBeVisible();
        await expect(dialog).toHaveAttribute("role", "dialog");
        await expect(dialog).toHaveAttribute("aria-modal", "true");
        expect(await dialog.getAttribute("aria-labelledby")).toBeTruthy();

        // Trigger relationship attributes stay stable cycle after cycle.
        expect(
          await triggerDom.getAttribute("aria-expanded"),
          `aria-expanded wrong on cycle ${i}`
        ).toBe("true");
        expect(
          await triggerDom.getAttribute("aria-controls"),
          `aria-controls changed on cycle ${i}`
        ).toBe(controls);
        if (controls) {
          await expect(page.locator(`[id="${controls}"]`)).toHaveCount(1);
        }

        // Opening must not move the page.
        expect(await scrollTop(), `scrollTop moved on open ${i}`).toBe(
          baselineScroll
        );

        await page.keyboard.press("Escape");
        await expect(page.getByRole("dialog")).toHaveCount(0);
        await page.waitForTimeout(200);

        // Focus returns to the exact trigger, scroll is restored exactly,
        // and aria-expanded collapses back.
        await expect(trigger).toBeFocused();
        expect(await scrollTop(), `scrollTop moved on close ${i}`).toBe(
          baselineScroll
        );
        expect(await trigger.getAttribute("aria-expanded")).toBe("false");
        await expect(page.locator('[aria-modal="true"]')).toHaveCount(0);
      }
    });
  });
}