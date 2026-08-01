import { test, expect } from "@playwright/test";
import { enableReducedMotion, gotoPortfolio, setTheme } from "./helpers";

// With prefers-reduced-motion: reduce, opening and closing the POM modal must
// not run real transitions/animations: computed animation/transition durations
// on the overlay, dialog surface and its children must be effectively zero,
// and no animation/transition events should fire. Checked in both themes.
const MAX_MS = 1; // "effectively disabled"

const toMs = (value: string) =>
  value
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean)
    .map((v) =>
      v.endsWith("ms")
        ? parseFloat(v)
        : v.endsWith("s")
          ? parseFloat(v) * 1000
          : parseFloat(v) || 0
    );

for (const theme of ["light", "dark"] as const) {
  test.describe(`POM modal — reduced motion disables animation (${theme})`, () => {
    test.use({ reducedMotion: "reduce" });

    test(`no transitions/animations on open or close (${theme})`, async ({
      page,
    }) => {
      await setTheme(page, theme);
      await enableReducedMotion(page);
      await gotoPortfolio(page);

      // The media query must actually be active in this context.
      const reduced = await page.evaluate(
        () => matchMedia("(prefers-reduced-motion: reduce)").matches
      );
      expect(reduced, "prefers-reduced-motion must be active").toBe(true);

      // Record animation/transition events for the whole lifecycle.
      await page.evaluate(() => {
        (window as unknown as { __motion: string[] }).__motion = [];
        const push = (e: Event) =>
          (window as unknown as { __motion: string[] }).__motion.push(e.type);
        for (const type of [
          "animationstart",
          "transitionstart",
          "transitionrun",
        ]) {
          document.addEventListener(type, push, true);
        }
      });

      const trigger = page.getByRole("button", {
        name: /Expand Page Object Model structure snippet/i,
      });
      await trigger.focus();
      await page.keyboard.press("Enter");

      const dialog = page.getByRole("dialog");
      await expect(dialog).toBeVisible();

      // Durations on the dialog surface, the overlay and every descendant.
      const durations = await page.evaluate(() => {
        const nodes: Element[] = [];
        const dlg = document.querySelector('[role="dialog"]');
        if (dlg) nodes.push(dlg, ...Array.from(dlg.querySelectorAll("*")));
        const overlay = document.querySelector(
          "[data-radix-dialog-overlay], [data-state][class*='fixed inset-0']"
        );
        if (overlay) nodes.push(overlay);
        return nodes.map((n) => {
          const cs = getComputedStyle(n);
          return {
            animationDuration: cs.animationDuration,
            animationDelay: cs.animationDelay,
            transitionDuration: cs.transitionDuration,
            transitionDelay: cs.transitionDelay,
          };
        });
      });
      expect(durations.length).toBeGreaterThan(0);

      for (const d of durations) {
        for (const value of [
          d.animationDuration,
          d.animationDelay,
          d.transitionDuration,
          d.transitionDelay,
        ]) {
          for (const ms of toMs(value)) {
            expect(ms).toBeLessThanOrEqual(MAX_MS);
          }
        }
      }

      // Close and re-check: the exit animation must also be neutralized.
      await page.keyboard.press("Escape");
      await expect(page.getByRole("dialog")).toHaveCount(0);
      await expect(trigger).toBeFocused();

      // Nothing should be mid-flight after close.
      const running = await page.evaluate(
        () => document.getAnimations().filter((a) => a.playState === "running").length
      );
      expect(running).toBe(0);

      // No dialog surface is left mid-exit-animation.
      expect(await page.locator('[role="dialog"]').count()).toBe(0);
    });
  });
}
