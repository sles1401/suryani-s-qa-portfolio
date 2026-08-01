import { test, expect } from "@playwright/test";
import { gotoPortfolio, setTheme } from "./helpers";

// Open the POM modal purely from the keyboard — once with Enter, once with
// Space — on the exact trigger element, then verify the focus order and the
// focus trap, and that focus returns to that exact trigger. Both themes.
const KEYS = ["Enter", "Space"] as const;

for (const theme of ["light", "dark"] as const) {
  for (const key of KEYS) {
    test.describe(`POM modal — keyboard open with ${key} (${theme})`, () => {
      test.beforeEach(async ({ page }) => {
        await setTheme(page, theme);
        await gotoPortfolio(page);
      });

      test(`${key} opens, focus order + trap hold, focus restored (${theme})`, async ({
        page,
      }) => {
        const trigger = page.getByRole("button", {
          name: /Expand Page Object Model structure snippet/i,
        });
        await trigger.focus();
        await expect(trigger).toBeFocused();
        const triggerHandle = await trigger.elementHandle();

        // Keyboard-only activation — no click anywhere in this test.
        await page.keyboard.press(key);

        const dialog = page.getByRole("dialog");
        await expect(dialog).toBeVisible();

        // Initial focus must be inside the dialog.
        expect(
          await dialog.evaluate((d) => d.contains(document.activeElement))
        ).toBe(true);

        const repoLink = dialog.getByRole("link", {
          name: /Open Java Playwright repository on GitHub/i,
        });
        const closeBtn = dialog.getByRole("button", { name: /close/i });

        const focused = async () => {
          if (await repoLink.evaluate((el) => el === document.activeElement))
            return "repo";
          if (await closeBtn.evaluate((el) => el === document.activeElement))
            return "close";
          return "container";
        };

        // Forward order: two laps of the same cycle, focus never escapes.
        const forward: string[] = [];
        for (let i = 0; i < 8 && forward.length < 4; i++) {
          await page.keyboard.press("Tab");
          expect(
            await dialog.evaluate((d) => d.contains(document.activeElement)),
            "Tab escaped the dialog"
          ).toBe(true);
          const name = await focused();
          if (name !== "container") forward.push(name);
        }
        expect(forward.length).toBeGreaterThanOrEqual(4);
        expect(new Set(forward)).toEqual(new Set(["repo", "close"]));
        // Order is a stable 2-step cycle: lap 2 repeats lap 1.
        expect(forward.slice(2, 4)).toEqual(forward.slice(0, 2));

        // Backward order is the reverse of the forward cycle.
        const backward: string[] = [];
        for (let i = 0; i < 8 && backward.length < 2; i++) {
          await page.keyboard.press("Shift+Tab");
          expect(
            await dialog.evaluate((d) => d.contains(document.activeElement)),
            "Shift+Tab escaped the dialog"
          ).toBe(true);
          const name = await focused();
          if (name !== "container") backward.push(name);
        }
        expect(backward.length).toBe(2);
        expect(backward[0]).not.toBe(backward[1]);

        // Escape closes; the exact trigger element regains focus.
        await page.keyboard.press("Escape");
        await expect(page.getByRole("dialog")).toHaveCount(0);
        await expect(trigger).toBeFocused();
        expect(
          await page.evaluate(
            (el) => el === document.activeElement,
            triggerHandle
          )
        ).toBe(true);
      });
    });
  }
}
