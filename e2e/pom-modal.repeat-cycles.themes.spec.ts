import { test, expect } from "@playwright/test";
import { gotoPortfolio, setTheme } from "./helpers";

// Open/close the POM dialog repeatedly (alternating Escape, Close button and
// backdrop) and assert nothing leaks between cycles: no stray dialogs, no
// aria-modal/aria-hidden artifacts, focus trap works every time, focus returns
// to the exact trigger, and body scroll state is fully restored.
const CYCLES = 4;

for (const theme of ["light", "dark"] as const) {
  test.describe(`POM modal — repeated open/close (${theme})`, () => {
    test.beforeEach(async ({ page }) => {
      await setTheme(page, theme);
      await gotoPortfolio(page);
    });

    test(`no ARIA/focus/scroll leaks over ${CYCLES} cycles (${theme})`, async ({
      page,
    }) => {
      const trigger = page.getByRole("button", {
        name: /Expand Page Object Model structure snippet/i,
      });
      const triggerHandle = await trigger.elementHandle();

      const baseline = await page.evaluate(() => {
        const cs = getComputedStyle(document.body);
        return {
          overflow: document.body.style.overflow,
          paddingRight: cs.paddingRight,
          pointerEvents: cs.pointerEvents,
          bodyWidth: Math.round(document.body.getBoundingClientRect().width),
        };
      });

      for (let i = 0; i < CYCLES; i++) {
        await trigger.focus();
        await page.keyboard.press("Enter");

        const dialog = page.getByRole("dialog");
        await expect(dialog).toBeVisible();

        // Exactly one dialog, correct semantics, every cycle.
        await expect(page.getByRole("dialog")).toHaveCount(1);
        await expect(dialog).toHaveAttribute("aria-modal", "true");
        expect(await dialog.getAttribute("aria-labelledby")).toBeTruthy();

        // Focus trap still holds on cycle i.
        for (let t = 0; t < 4; t++) {
          await page.keyboard.press("Tab");
          const inside = await dialog.evaluate((d) =>
            d.contains(document.activeElement)
          );
          expect(inside, `focus escaped on cycle ${i}`).toBe(true);
        }

        // Rotate the close method across cycles.
        if (i % 3 === 0) {
          await page.keyboard.press("Escape");
        } else if (i % 3 === 1) {
          await dialog.getByRole("button", { name: /close/i }).click();
        } else {
          await page.mouse.click(5, 5); // backdrop
        }

        await expect(page.getByRole("dialog")).toHaveCount(0);
        await page.waitForTimeout(150);

        // Exact trigger regains focus every cycle.
        const isExact = await page.evaluate(
          (el) => el === document.activeElement,
          triggerHandle
        );
        expect(isExact, `focus not returned on cycle ${i}`).toBe(true);

        // No lingering ARIA or inert artifacts.
        await expect(page.locator('[aria-modal="true"]')).toHaveCount(0);
        expect(
          await page.locator('main[aria-hidden="true"], main[inert]').count()
        ).toBe(0);

        // Body scroll state matches the pre-open baseline.
        const after = await page.evaluate(() => {
          const cs = getComputedStyle(document.body);
          return {
            overflow: document.body.style.overflow,
            computedOverflow: cs.overflow,
            paddingRight: cs.paddingRight,
            pointerEvents: cs.pointerEvents,
            bodyWidth: Math.round(document.body.getBoundingClientRect().width),
          };
        });
        expect(after.overflow, `overflow leaked on cycle ${i}`).toBe(
          baseline.overflow
        );
        expect(after.computedOverflow).not.toBe("hidden");
        expect(after.paddingRight).toBe(baseline.paddingRight);
        expect(after.pointerEvents).toBe(baseline.pointerEvents);
        expect(Math.abs(after.bodyWidth - baseline.bodyWidth)).toBeLessThanOrEqual(1);
      }

      // Scrolling works after all cycles.
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.evaluate(() => window.scrollBy(0, 300));
      expect(await page.evaluate(() => window.scrollY)).toBeGreaterThan(0);
    });
  });
}
