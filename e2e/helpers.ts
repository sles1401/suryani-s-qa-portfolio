import { Page } from "@playwright/test";

export const setTheme = async (page: Page, theme: "light" | "dark") => {
  await page.addInitScript((t) => {
    localStorage.setItem("theme", t);
    localStorage.setItem("theme-manual", "1");
    localStorage.setItem("language", "en");
  }, theme);
};

export const gotoPortfolio = async (page: Page) => {
  await page.goto("/portfolio");
  await page.waitForLoadState("networkidle");
  // Ensure the Evidence Hub section is in view + stable
  await page.locator("#qa-deliverables").scrollIntoViewIfNeeded();
  await page.waitForTimeout(300); // settle animations
};