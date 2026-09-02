import { test, expect } from "@playwright/test";
import { gotoPortfolio, setTheme } from "./helpers";
import {
  LIVE_TEST_CASE_SHEET_URL,
  TEST_CASE_DOCS_REPO_URL,
} from "../src/lib/links";

const EXPECTED = [
  {
    name: /Open Live Test Case Dummy on Google Sheets/i,
    href: LIVE_TEST_CASE_SHEET_URL,
  },
  {
    name: /Open test case docs repository on GitHub/i,
    href: TEST_CASE_DOCS_REPO_URL,
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

  test("Playwright codebase is marked NDA with no public repo link", async ({
    page,
  }) => {
    await expect(page.getByText(/Codebase — NDA/i)).toBeVisible();
    await expect(
      page.locator('a[href*="java-playwright-automation"]')
    ).toHaveCount(0);
  });
});
