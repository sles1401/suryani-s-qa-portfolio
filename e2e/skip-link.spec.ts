import { test, expect } from "@playwright/test";
import { setTheme } from "./helpers";

const PAGES = ["/", "/about", "/experience", "/portfolio", "/contact"] as const;

for (const theme of ["light", "dark"] as const) {
  test.describe(`Skip to main content — ${theme}`, () => {
    test(`is the first tab stop, visible on focus, and moves focus to <main> (${theme})`, async ({
      page,
    }) => {
      await setTheme(page, theme);
      await page.goto("/");
      await page.waitForLoadState("networkidle");

      const skip = page.getByTestId("skip-link");

      // Visually hidden until focused.
      await expect(skip).not.toBeVisible();

      await page.keyboard.press("Tab");
      await expect(skip).toBeFocused();
      await expect(skip).toBeVisible();

      // Has a real focus indicator (outline or ring box-shadow) in this theme.
      const indicator = await skip.evaluate((el) => {
        const s = getComputedStyle(el);
        return {
          outlineWidth: s.outlineWidth,
          boxShadow: s.boxShadow,
          background: s.backgroundColor,
        };
      });
      const hasRing =
        parseFloat(indicator.outlineWidth) > 0 ||
        (indicator.boxShadow !== "none" && indicator.boxShadow !== "");
      expect(hasRing).toBe(true);
      expect(indicator.background).not.toBe("rgba(0, 0, 0, 0)");

      await page.keyboard.press("Enter");

      await expect(page).toHaveURL(/#main-content$/);
      const focusedId = await page.evaluate(
        () => document.activeElement?.id ?? ""
      );
      // Either the browser moved focus to the target, or it is focusable next.
      if (focusedId !== "main-content") {
        await page.keyboard.press("Tab");
      }
      const insideMain = await page.evaluate(() => {
        const main = document.getElementById("main-content");
        const active = document.activeElement;
        return !!main && !!active && (main === active || main.contains(active));
      });
      expect(insideMain).toBe(true);
    });

    for (const path of PAGES) {
      test(`renders on ${path} (${theme})`, async ({ page }) => {
        await setTheme(page, theme);
        await page.goto(path);
        await page.waitForLoadState("networkidle");
        await expect(page.getByTestId("skip-link")).toHaveAttribute(
          "href",
          "#main-content"
        );
      });
    }
  });
}
