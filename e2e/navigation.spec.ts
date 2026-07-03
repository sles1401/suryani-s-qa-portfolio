import { test, expect } from "@playwright/test";

const PAGES = [
  { name: /^Home$/i, path: "/", heading: /Suryani Lestari/i },
  {
    name: /^About$/i,
    path: "/about",
    heading: /Building a Career in Quality Assurance/i,
  },
  {
    name: /^Experience$/i,
    path: "/experience",
    heading: /Quality Assurance Experience/i,
  },
  { name: /^Portfolio$/i, path: "/portfolio", heading: /Suryani Lestari/i },
  { name: /^Contact$/i, path: "/contact", heading: /Get in Touch/i },
];

test.describe("Top navigation — routing + persisted preferences", () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem("language", "en");
      localStorage.setItem("theme", "light");
      localStorage.setItem("theme-manual", "1");
    });
  });

  test("each nav link routes to its page and shows the correct H1", async ({
    page,
  }) => {
    await page.goto("/");
    for (const p of PAGES) {
      await page
        .getByRole("navigation")
        .getByRole("link", { name: p.name })
        .first()
        .click();
      await expect(page).toHaveURL(new RegExp(`${p.path}$`));
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(
        p.heading
      );
    }
  });

  test("language toggle to ID and dark theme persist across navigation and refresh", async ({
    page,
  }) => {
    await page.goto("/");

    // Flip theme first — its aria-label is localised, so we click while
    // the UI is still in English.
    await page
      .getByRole("button", { name: /Switch to dark mode/i })
      .click();
    // Then flip language EN → ID via the visible toggle.
    await page.getByRole("button", { name: "Bahasa Indonesia" }).click();

    // ID header labels appear (Beranda/Tentang/Kontak).
    await expect(
      page.getByRole("navigation").getByRole("link", { name: /^Beranda$/ })
    ).toBeVisible();

    // Navigate through several pages; state must survive.
    for (const path of ["/about", "/experience", "/portfolio", "/contact"]) {
      await page.goto(path);
      const state = await page.evaluate(() => ({
        theme: localStorage.getItem("theme"),
        language: localStorage.getItem("language"),
        hasDark: document.documentElement.classList.contains("dark"),
        htmlLang: document.documentElement.lang,
      }));
      expect(state.theme).toBe("dark");
      expect(state.language).toBe("id");
      expect(state.hasDark).toBe(true);
      expect(state.htmlLang).toBe("id");
    }

    // Full reload — preferences still hydrate from localStorage.
    await page.reload();
    const post = await page.evaluate(() => ({
      theme: localStorage.getItem("theme"),
      language: localStorage.getItem("language"),
      hasDark: document.documentElement.classList.contains("dark"),
    }));
    expect(post.theme).toBe("dark");
    expect(post.language).toBe("id");
    expect(post.hasDark).toBe(true);
  });
});