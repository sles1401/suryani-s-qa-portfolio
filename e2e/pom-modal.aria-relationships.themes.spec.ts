import { test, expect } from "@playwright/test";
import { gotoPortfolio, setTheme } from "./helpers";

// The dialog must wire aria-labelledby / aria-describedby to real nodes on
// open, and those nodes + attributes must be gone from the DOM after close,
// in both Light and Dark themes.
for (const theme of ["light", "dark"] as const) {
  test.describe(`POM modal — aria relationships (${theme})`, () => {
    test.beforeEach(async ({ page }) => {
      await setTheme(page, theme);
      await gotoPortfolio(page);
    });

    test(`labelledby/describedby set on open, cleared on close (${theme})`, async ({
      page,
    }) => {
      const trigger = page.getByRole("button", {
        name: /Expand Page Object Model structure snippet/i,
      });
      await trigger.click();

      const dialog = page.getByRole("dialog");
      await expect(dialog).toBeVisible();

      const labelledBy = await dialog.getAttribute("aria-labelledby");
      const describedBy = await dialog.getAttribute("aria-describedby");
      expect(labelledBy, "aria-labelledby must be present").toBeTruthy();
      expect(describedBy, "aria-describedby must be present").toBeTruthy();

      // Both IDs must resolve to exactly one visible, non-empty node.
      for (const id of [labelledBy!, describedBy!]) {
        const node = page.locator(`[id="${id}"]`);
        await expect(node).toHaveCount(1);
        await expect(node).toBeVisible();
        expect((await node.innerText()).trim().length).toBeGreaterThan(0);
      }
      // Label and description must be distinct nodes.
      expect(labelledBy).not.toBe(describedBy);

      // The accessible name must come from the labelling node.
      const labelText = (await page.locator(`[id="${labelledBy}"]`).innerText()).trim();
      await expect(dialog).toHaveAccessibleName(new RegExp(labelText.slice(0, 20).replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"));

      // Close — attributes and referenced nodes must disappear with the dialog.
      await page.keyboard.press("Escape");
      await expect(page.getByRole("dialog")).toHaveCount(0);

      await expect(page.locator(`[id="${labelledBy}"]`)).toHaveCount(0);
      await expect(page.locator(`[id="${describedBy}"]`)).toHaveCount(0);
      expect(await page.locator("[aria-modal]").count()).toBe(0);
      expect(
        await page.locator(`[aria-labelledby="${labelledBy}"]`).count()
      ).toBe(0);
      expect(
        await page.locator(`[aria-describedby="${describedBy}"]`).count()
      ).toBe(0);
    });
  });
}
