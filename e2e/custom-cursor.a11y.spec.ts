import { test, expect } from "@playwright/test";
import { setTheme } from "./helpers";

// The animated custom cursor is a fixed overlay. It must never intercept
// pointer events, never take focus, and never obscure focus-visible rings.
for (const theme of ["light", "dark"] as const) {
  test.describe(`Custom cursor a11y (${theme})`, () => {
    test.beforeEach(async ({ page }) => {
      await setTheme(page, theme);
    });

    test(`cursor overlay is inert for pointer + keyboard (${theme})`, async ({
      page,
    }) => {
      await page.goto("/");
      await page.waitForLoadState("networkidle");
      // Move the pointer so the cursor component enables itself.
      await page.mouse.move(400, 400);
      await page.waitForTimeout(200);

      const cursor = page.locator('[data-testid="custom-cursor"]');
      const mounted = (await cursor.count()) > 0;

      if (mounted) {
        await expect(cursor).toHaveAttribute("aria-hidden", "true");
        // Not focusable and not hit-testable.
        expect(await cursor.locator("[tabindex], a, button").count()).toBe(0);
        const pointerEvents = await cursor.evaluate(
          (el) => getComputedStyle(el).pointerEvents
        );
        expect(pointerEvents).toBe("none");
        for (const child of await cursor.locator("div").all()) {
          expect(
            await child.evaluate((el) => getComputedStyle(el).pointerEvents)
          ).toBe("none");
        }
      }

      // Keyboard focus still lands on real interactive elements.
      await page.keyboard.press("Tab");
      const firstFocused = await page.evaluate(() => {
        const el = document.activeElement as HTMLElement | null;
        return {
          tag: el?.tagName ?? null,
          inCursor: Boolean(el?.closest('[data-testid="custom-cursor"]')),
          outline: el ? getComputedStyle(el).outlineStyle : null,
          ring: el ? getComputedStyle(el).boxShadow : null,
        };
      });
      expect(firstFocused.inCursor).toBe(false);
      expect(["A", "BUTTON", "INPUT"]).toContain(firstFocused.tag);
      // A visible focus indicator exists (outline or ring shadow).
      expect(
        firstFocused.outline !== "none" || firstFocused.ring !== "none"
      ).toBe(true);

      // The focused element is the top-most element at its own centre point,
      // i.e. the cursor overlay does not cover it.
      const onTop = await page.evaluate(() => {
        const el = document.activeElement as HTMLElement | null;
        if (!el) return false;
        const r = el.getBoundingClientRect();
        const hit = document.elementFromPoint(
          r.left + r.width / 2,
          r.top + r.height / 2
        );
        return Boolean(
          hit && !hit.closest('[data-testid="custom-cursor"]')
        );
      });
      expect(onTop).toBe(true);

      // Clicks still reach real controls: activating the theme toggle works.
      const themeToggle = page.getByRole("button", { name: /theme/i }).first();
      await themeToggle.click();
      await expect
        .poll(() =>
          page.evaluate(() =>
            document.documentElement.classList.contains("dark")
          )
        )
        .toBe(theme === "light");
    });

    test(`cursor is not rendered under prefers-reduced-motion (${theme})`, async ({
      page,
    }) => {
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto("/");
      await page.waitForLoadState("networkidle");
      await page.mouse.move(300, 300);
      await page.waitForTimeout(200);
      await expect(page.locator('[data-testid="custom-cursor"]')).toHaveCount(0);
    });
  });
}