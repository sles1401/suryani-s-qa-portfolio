import { test, expect } from "@playwright/test";
import { gotoPortfolio, setTheme } from "./helpers";

const EXPECTED = [
  {
    name: /Open Live Test Case Dummy on Google Sheets/i,
    href: "https://docs.google.com/spreadsheets/d/1WQq0nQmS3f7-Live-Test-Case-Dummy/edit?usp=sharing",
  },
  {
    name: /Open test case docs repository on GitHub/i,
    href: "https://github.com/sles1401/qa-test-documentation",
  },
  {
    name: /Open Java Playwright repository on GitHub$/i,
    href: "https://github.com/sles1401/java-playwright-automation",
  },
];

test.describe("Evidence Hub CTAs open in new tab with safe rel", () => {
  test.beforeEach(async ({ page }) => {
    await setTheme(page, "light");
    await gotoPortfolio(page);
  });

  for (const cta of EXPECTED) {
    test(`CTA ${cta.href}`, async ({ page }) => {
      const link = page.getByRole("link", { name: cta.name });
      await expect(link).toHaveAttribute("href", cta.href);
      await expect(link).toHaveAttribute("target", "_blank");
      const rel = (await link.getAttribute("rel")) ?? "";
      expect(rel).toMatch(/noopener/);
      expect(rel).toMatch(/noreferrer/);
    });
  }
});