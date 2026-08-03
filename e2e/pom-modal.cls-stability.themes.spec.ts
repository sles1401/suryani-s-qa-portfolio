import { test, expect } from "@playwright/test";
import { gotoPortfolio, setTheme } from "./helpers";

// Measure cumulative layout shift (via PerformanceObserver) plus scroll and
// viewport metrics across a full Portfolio modal open/close cycle. Any subtle
// reflow from the scroll-lock would surface as a non-zero CLS or a metric delta.
const TRIGGER = /Expand Page Object Model structure snippet/i;

type Metrics = {
  scrollY: number;
  innerWidth: number;
  innerHeight: number;
  clientWidth: number;
  scrollWidth: number;
  bodyWidth: number;
};

for (const theme of ["light", "dark"] as const) {
  test.describe(`POM modal layout-shift stability (${theme})`, () => {
    test(`CLS stays ~0 and viewport/scroll metrics are stable (${theme})`, async ({
      page,
    }) => {
      await setTheme(page, theme);
      await page.addInitScript(() => {
        (window as unknown as { __cls: number }).__cls = 0;
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries() as unknown as Array<{
            value: number;
            hadRecentInput: boolean;
          }>) {
            if (!entry.hadRecentInput) {
              (window as unknown as { __cls: number }).__cls += entry.value;
            }
          }
        }).observe({ type: "layout-shift", buffered: true });
      });

      await gotoPortfolio(page);
      // Keep measurements deterministic: no smooth scrolling.
      await page.addStyleTag({
        content: `html, body { scroll-behavior: auto !important; }`,
      });
      // Bring the trigger into view first so the later click cannot itself
      // scroll the page (which would pollute the scroll-stability assertions).
      const trigger = page.getByRole("button", { name: TRIGGER });
      await trigger.scrollIntoViewIfNeeded();
      await page.waitForTimeout(300);

      const read = () =>
        page.evaluate<Metrics>(() => ({
          scrollY: Math.round(window.scrollY),
          innerWidth: window.innerWidth,
          innerHeight: window.innerHeight,
          clientWidth: document.documentElement.clientWidth,
          scrollWidth: document.documentElement.scrollWidth,
          bodyWidth: Math.round(document.body.getBoundingClientRect().width),
        }));

      // Reset the CLS accumulator after initial paint/scroll settle.
      await page.evaluate(() => {
        (window as unknown as { __cls: number }).__cls = 0;
      });
      const before = await read();

      await trigger.click();
      await expect(page.getByRole("dialog")).toBeVisible();
      await page.waitForTimeout(400);
      const during = await read();

      await page.keyboard.press("Escape");
      await expect(page.getByRole("dialog")).toHaveCount(0);
      await page.waitForTimeout(400);
      const after = await read();

      const cls = await page.evaluate(
        () => (window as unknown as { __cls: number }).__cls
      );

      // Open state must not resize the layout viewport or the document box.
      expect(during.innerWidth).toBe(before.innerWidth);
      expect(during.innerHeight).toBe(before.innerHeight);
      expect(during.clientWidth).toBe(before.clientWidth);
      expect(during.bodyWidth).toBe(before.bodyWidth);
      expect(Math.abs(during.scrollY - before.scrollY)).toBeLessThanOrEqual(1);

      // Post-close state must match the pre-open state exactly.
      expect(after).toEqual(before);

      // CLS budget: well under the 0.1 "good" threshold.
      expect(cls).toBeLessThan(0.01);
    });
  });
}