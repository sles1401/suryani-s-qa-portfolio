import { test, expect } from "@playwright/test";
import { setTheme } from "./helpers";

const BREAKPOINTS = [
  { name: "mobile", width: 390, height: 844 },
  { name: "tablet", width: 768, height: 1180 },
] as const;

for (const bp of BREAKPOINTS) {
  for (const theme of ["light", "dark"] as const) {
    test.describe(`Evidence Hub responsive — ${bp.name} · ${theme}`, () => {
      test.use({ viewport: { width: bp.width, height: bp.height } });

      test.beforeEach(async ({ page }) => {
        await setTheme(page, theme);
        await page.goto("/portfolio");
        await page.waitForLoadState("networkidle");
        await page.locator("#qa-deliverables").scrollIntoViewIfNeeded();
      });

      test(`cards render in DOM order and stay usable (${bp.name}/${theme})`, async ({
        page,
      }) => {
        const cards = page.locator("#qa-deliverables article");
        await expect(cards).toHaveCount(3);

        // Titles must appear in the intended narrative order.
        const titles = await cards.locator("h3").allTextContents();
        expect(titles[0]).toMatch(/Manual Testing Suite/i);
        expect(titles[1]).toMatch(/Automation Transition/i);
        expect(titles[2]).toMatch(/Internal Engineering Tools/i);

        // No card should cause horizontal page overflow at this breakpoint.
        const overflow = await page.evaluate(
          () => document.documentElement.scrollWidth - window.innerWidth
        );
        expect(overflow).toBeLessThanOrEqual(1);

        for (let i = 0; i < 3; i++) {
          const card = cards.nth(i);
          await card.scrollIntoViewIfNeeded();
          const box = await card.boundingBox();
          expect(box, `card ${i} has a bounding box`).not.toBeNull();
          expect(box!.width).toBeGreaterThan(0);
        }
      });

      test(`POM modal opens and fits within the viewport (${bp.name}/${theme})`, async ({
        page,
      }) => {
        await page
          .getByRole("button", {
            name: /Expand Page Object Model structure snippet/i,
          })
          .click();
        const dialog = page.getByRole("dialog");
        await expect(dialog).toBeVisible();
        const box = await dialog.boundingBox();
        expect(box).not.toBeNull();
        expect(box!.width).toBeLessThanOrEqual(bp.width);
      });

      test(`mobile menu exposes every nav destination (${bp.name}/${theme})`, async ({
        page,
      }) => {
        // Header hides desktop links below lg (1024px); the burger menu is the fallback.
        await page.getByRole("button", { name: /toggle menu/i }).click();
        const nav = page.getByRole("navigation");
        for (const link of ["Home", "About", "Experience", "Portfolio", "Contact"]) {
          await expect(
            nav.getByRole("link", { name: new RegExp(`^${link}$`) }).first()
          ).toBeVisible();
        }
      });

      test(`snapshot: Evidence Hub (${bp.name}/${theme})`, async ({ page }) => {
        const section = page.locator("#qa-deliverables");
        await expect(section).toHaveScreenshot(
          `evidence-hub-${bp.name}-${theme}.png`,
          { animations: "disabled" }
        );
      });
    });
  }
}