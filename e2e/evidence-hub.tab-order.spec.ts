import { test, expect } from "@playwright/test";
import { gotoPortfolio, setTheme } from "./helpers";

// Expected keyboard tab order through Evidence Hub, starting from the first CTA.
const EXPECTED_ORDER = [
  /Open Live Test Case Dummy on Google Sheets/i,
  /Open test case docs repository on GitHub/i,
  /Expand Page Object Model structure snippet/i,
  /Open Java Playwright repository on GitHub$/i,
  /Open Suryani's Tech Hub/i,
];

test.describe("Evidence Hub — keyboard-only tab order", () => {
  test.beforeEach(async ({ page }) => {
    await setTheme(page, "light");
    await gotoPortfolio(page);
  });

  test("Tab reaches every Evidence Hub CTA in DOM order", async ({ page }) => {
    // Seed focus on the first CTA, then walk forward with Tab.
    const first = page.getByRole("link", { name: EXPECTED_ORDER[0] });
    await first.focus();
    await expect(first).toBeFocused();

    for (let i = 1; i < EXPECTED_ORDER.length; i++) {
      await page.keyboard.press("Tab");
      const target = EXPECTED_ORDER[i].source.endsWith("$")
        ? page.getByRole("link", { name: EXPECTED_ORDER[i] })
        : page.getByRole(
            EXPECTED_ORDER[i].source.includes("Expand") ? "button" : "link",
            { name: EXPECTED_ORDER[i] }
          );
      await expect(target).toBeFocused();
    }
  });

  test("POM modal: Tab cycles through controls, Close returns focus to trigger", async ({
    page,
  }) => {
    const trigger = page.getByRole("button", {
      name: /Expand Page Object Model structure snippet/i,
    });
    await trigger.focus();
    await page.keyboard.press("Enter");

    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();

    // The dialog exposes two reachable controls: GitHub CTA + Close.
    const repoLink = dialog.getByRole("link", {
      name: /Open Java Playwright repository on GitHub \(new tab\)/i,
    });
    const closeBtn = dialog.getByRole("button", { name: /close/i });

    // Walk Tab forward and record which control receives focus.
    const seen = new Set<string>();
    for (let i = 0; i < 8; i++) {
      await page.keyboard.press("Tab");
      if (await repoLink.evaluate((el) => el === document.activeElement))
        seen.add("repo");
      if (await closeBtn.evaluate((el) => el === document.activeElement))
        seen.add("close");
      // Focus must never escape the dialog.
      const inside = await dialog.evaluate((d) =>
        d.contains(document.activeElement)
      );
      expect(inside).toBe(true);
    }
    expect(seen.has("repo")).toBe(true);
    expect(seen.has("close")).toBe(true);

    // Activate Close via keyboard; focus must return to the trigger.
    await closeBtn.focus();
    await page.keyboard.press("Enter");
    await expect(dialog).toBeHidden();
    await expect(trigger).toBeFocused();
  });
});