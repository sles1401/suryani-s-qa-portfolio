import { test, expect, Page } from "@playwright/test";
import { gotoPortfolio, setTheme } from "./helpers";

type CtaSpec = {
  key: string;
  role: "link" | "button";
  name: RegExp;
};

const CTAS: CtaSpec[] = [
  {
    key: "sheets",
    role: "link",
    name: /Open Live Test Case Dummy on Google Sheets/i,
  },
  {
    key: "docs-repo",
    role: "link",
    name: /Open test case docs repository on GitHub/i,
  },
  {
    key: "pom-trigger",
    role: "button",
    name: /Expand Page Object Model structure snippet/i,
  },
  {
    key: "playwright-repo",
    role: "link",
    name: /Open Java Playwright repository on GitHub$/i,
  },
  {
    key: "tech-hub",
    role: "link",
    name: /Open Suryani's Tech Hub/i,
  },
];

const locate = (page: Page, cta: CtaSpec) =>
  page.getByRole(cta.role, { name: cta.name });

for (const theme of ["light", "dark"] as const) {
  test.describe(`Evidence Hub CTA interactive states — ${theme}`, () => {
    test.beforeEach(async ({ page }) => {
      await setTheme(page, theme);
      await gotoPortfolio(page);
    });

    for (const cta of CTAS) {
      test(`focus-visible: ${cta.key} (${theme})`, async ({ page }) => {
        // Keyboard focus produces the :focus-visible ring — clicking would not.
        await locate(page, cta).focus();
        const el = locate(page, cta);
        await expect(el).toHaveScreenshot(
          `cta-${cta.key}-focus-${theme}.png`,
          { animations: "disabled" }
        );
      });

      test(`hover: ${cta.key} (${theme})`, async ({ page }) => {
        const el = locate(page, cta);
        await el.scrollIntoViewIfNeeded();
        await el.hover();
        // Blur any residual focus so only :hover styles apply.
        await page.evaluate(() => (document.activeElement as HTMLElement)?.blur?.());
        await expect(el).toHaveScreenshot(
          `cta-${cta.key}-hover-${theme}.png`,
          { animations: "disabled" }
        );
      });
    }

    // The Evidence Hub has no disabled CTAs by design — verify that
    // contract so a future disabled state doesn't slip in unreviewed.
    test(`no disabled CTAs are shipped (${theme})`, async ({ page }) => {
      const disabled = await page
        .locator("#qa-deliverables")
        .locator("button[disabled], a[aria-disabled='true']")
        .count();
      expect(disabled).toBe(0);
    });
  });
}