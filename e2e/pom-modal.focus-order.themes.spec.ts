import { test, expect } from "@playwright/test";
import { gotoPortfolio, setTheme } from "./helpers";

// Record the exact Tab / Shift+Tab focus order inside the POM dialog and
// assert it matches the expected control sequence (repo CTA -> Close) as a
// stable cycle, in both Light and Dark themes.
const EXPECTED_CYCLE = ["repo", "close"] as const;

const rotate = <T,>(arr: readonly T[], start: T) => {
  const i = arr.indexOf(start);
  return [...arr.slice(i), ...arr.slice(0, i)];
};

for (const theme of ["light", "dark"] as const) {
  test.describe(`POM modal — recorded focus order (${theme})`, () => {
    test.beforeEach(async ({ page }) => {
      await setTheme(page, theme);
      await gotoPortfolio(page);
    });

    test(`Tab and Shift+Tab follow the expected sequence (${theme})`, async ({
      page,
    }) => {
      const trigger = page.getByRole("button", {
        name: /Expand Page Object Model structure snippet/i,
      });
      await trigger.focus();
      await page.keyboard.press("Enter");

      const dialog = page.getByRole("dialog");
      await expect(dialog).toBeVisible();

      const repoLink = dialog.getByRole("link", {
        name: /Open Java Playwright repository on GitHub/i,
      });
      const closeBtn = dialog.getByRole("button", { name: /close/i });

      const whichFocused = async (): Promise<string> => {
        if (await repoLink.evaluate((el) => el === document.activeElement))
          return "repo";
        if (await closeBtn.evaluate((el) => el === document.activeElement))
          return "close";
        const inside = await dialog.evaluate((d) =>
          d.contains(document.activeElement)
        );
        expect(inside, "focus escaped the dialog").toBe(true);
        return "container";
      };

      // Forward: collect two full cycles of named controls.
      const forward: string[] = [];
      for (let i = 0; i < 8 && forward.length < 4; i++) {
        await page.keyboard.press("Tab");
        const name = await whichFocused();
        if (name !== "container") forward.push(name);
      }
      expect(forward.length).toBeGreaterThanOrEqual(4);

      const expectedForward = rotate(EXPECTED_CYCLE, forward[0] as "repo" | "close");
      expect(forward.slice(0, 2)).toEqual(expectedForward);
      // Second lap repeats the same cycle — order is stable.
      expect(forward.slice(2, 4)).toEqual(expectedForward);

      // Backward: Shift+Tab must walk the reverse of the same cycle.
      const backward: string[] = [];
      for (let i = 0; i < 8 && backward.length < 3; i++) {
        await page.keyboard.press("Shift+Tab");
        const name = await whichFocused();
        if (name !== "container") backward.push(name);
      }
      expect(backward.length).toBeGreaterThanOrEqual(3);
      const reverseCycle = rotate(
        [...EXPECTED_CYCLE].reverse(),
        backward[0] as "repo" | "close"
      );
      expect(backward.slice(0, 2)).toEqual(reverseCycle);
      expect(backward[2]).toEqual(reverseCycle[0]);

      // Order contract holds until the dialog is closed.
      await page.keyboard.press("Escape");
      await expect(page.getByRole("dialog")).toHaveCount(0);
      await expect(trigger).toBeFocused();
    });
  });
}
