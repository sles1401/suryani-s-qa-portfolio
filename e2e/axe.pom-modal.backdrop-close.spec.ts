import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { gotoPortfolio, setTheme } from "./helpers";

// After dismissing the QA Portfolio POM modal by clicking the backdrop
// (outside the dialog surface), run an axe scan of the restored page and
// confirm the exact trigger element regains focus in both themes.
const A11Y_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"];

for (const theme of ["light", "dark"] as const) {
  test.describe(`POM modal — backdrop close a11y (${theme})`, () => {
    test.beforeEach(async ({ page }) => {
      await setTheme(page, theme);
      await gotoPortfolio(page);
    });

    test(`backdrop click closes, focus returns exactly, axe clean (${theme})`, async ({
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

      // Radix renders the backdrop as [data-radix-dialog-overlay] or a sibling
      // overlay element. Click at a corner outside the dialog surface — the
      // top-left of the viewport is safely outside the centered dialog.
      await page.mouse.click(5, 5);
      await expect(dialog).toBeHidden();

      // Trigger must regain focus (exact element, not just a matching name).
      await expect(trigger).toBeFocused();
      const isExactTrigger = await page.evaluate(
        (el) => el === document.activeElement,
        triggerHandle
      );
      expect(isExactTrigger).toBe(true);

      // Scan the Evidence Hub region post-close.
      const results = await new AxeBuilder({ page })
        .include("#qa-deliverables")
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