import { test, expect } from "@playwright/test";

const PAGES = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Experience", path: "/experience" },
  { name: "Portfolio", path: "/portfolio" },
  { name: "Contact", path: "/contact" },
] as const;

// Seed a theme in localStorage before the app boots so ThemeProvider hydrates
// from it on first paint (this mirrors how a returning visitor lands on the
// site). `theme-manual` prevents prefers-color-scheme from overriding.
const seedTheme = async (
  page: import("@playwright/test").Page,
  theme: "light" | "dark"
) => {
  await page.addInitScript((t) => {
    localStorage.setItem("theme", t);
    localStorage.setItem("theme-manual", "1");
  }, theme);
};

for (const theme of ["light", "dark"] as const) {
  test.describe(`Theme persistence across all pages — ${theme}`, () => {
    for (const p of PAGES) {
      test(`${p.name} keeps ${theme} theme in localStorage and after refresh`, async ({
        page,
      }) => {
        await seedTheme(page, theme);
        await page.goto(p.path);
        await page.waitForLoadState("networkidle");

        const before = await page.evaluate(() => ({
          theme: localStorage.getItem("theme"),
          hasDark: document.documentElement.classList.contains("dark"),
        }));
        expect(before.theme).toBe(theme);
        expect(before.hasDark).toBe(theme === "dark");

        // Full page reload — value must still hydrate from storage.
        await page.reload();
        await page.waitForLoadState("networkidle");

        const after = await page.evaluate(() => ({
          theme: localStorage.getItem("theme"),
          hasDark: document.documentElement.classList.contains("dark"),
        }));
        expect(after.theme).toBe(theme);
        expect(after.hasDark).toBe(theme === "dark");
      });
    }
  });
}