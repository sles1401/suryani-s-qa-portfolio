import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { gotoPortfolio, setTheme } from "./helpers";

// After the POM dialog closes (Escape), no aria-hidden/inert/focus-trap
// artifacts should linger on the page. Verify the exact trigger regains
// focus and axe reports no serious/critical issues, in both themes.
const A11Y_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"];

for (const theme of ["light", "dark"] as const) {
  test.describe(`POM modal — post-close a11y (${theme})`, () => {
    test.beforeEach(async ({ page }) => {
      await setTheme(page, theme);
      await gotoPortfolio(page);
    });

    test(`no lingering aria-hidden/focus-trap after close (${theme})`, async ({
      page,
    }) => {
      const trigger = page.getByRole("button", {
        name: /Expand Page Object Model structure snippet/i,
      });
      await trigger.focus();
      const triggerHandle = await trigger.elementHandle();
      await page.keyboard.press("Enter");

      const dialog = page.getByRole("dialog");
      await expect(dialog).toBeVisible();

      await page.keyboard.press("Escape");
      await expect(page.getByRole("dialog")).toHaveCount(0);

      // Trigger regains focus — exact element, not just a name match.
      await expect(trigger).toBeFocused();
      const isExactTrigger = await page.evaluate(
        (el) => el === document.activeElement,
        triggerHandle
      );
      expect(isExactTrigger).toBe(true);

      // No stray dialog/modal/inert artifacts on main content.
      const strayModal = await page.locator('[aria-modal="true"]').count();
      expect(strayModal).toBe(0);

      const hiddenMain = await page
        .locator('main[aria-hidden="true"], main[inert]')
        .count();
      expect(hiddenMain).toBe(0);

      // Full-page axe scan post-close.
      const results = await new AxeBuilder({ page })
        .withTags(A11Y_TAGS)
        .analyze();

      const blocking = results.violations.filter((v) =>
        ["serious", "critical"].includes(v.impact ?? "")
      );
      if (blocking.length) console.log(JSON.stringify(blocking, null, 2));
      expect(blocking).toEqual([]);
    });
  });
}