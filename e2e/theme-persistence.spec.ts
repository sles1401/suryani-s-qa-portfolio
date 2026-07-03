import { test, expect } from "@playwright/test";

// Note: this suite intentionally does NOT use the shared setTheme helper,
// because we want to observe the app's own persistence behavior end-to-end.

const readTheme = (page: import("@playwright/test").Page) =>
  page.evaluate(() => ({
    stored: localStorage.getItem("theme"),
    manual: localStorage.getItem("theme-manual"),
    hasDarkClass: document.documentElement.classList.contains("dark"),
  }));

const gotoEvidenceHub = async (page: import("@playwright/test").Page) => {
  await page.goto("/portfolio");
  await page.waitForLoadState("networkidle");
  await page.locator("#qa-deliverables").scrollIntoViewIfNeeded();
};

test.describe("Theme persistence on the Evidence Hub page", () => {
  test("dark selection is written to localStorage and survives refresh", async ({
    page,
  }) => {
    // Force a predictable starting state without pre-marking a manual choice,
    // so the toggle itself is what promotes theme-manual.
    await page.addInitScript(() => {
      localStorage.setItem("theme", "light");
      localStorage.removeItem("theme-manual");
      localStorage.setItem("language", "en");
    });
    await gotoEvidenceHub(page);

    await expect
      .poll(async () => (await readTheme(page)).hasDarkClass)
      .toBe(false);

    // Switch to dark via the header toggle (accessible name comes from ThemeToggle).
    await page
      .getByRole("button", { name: /Switch to dark mode/i })
      .click();

    await expect
      .poll(async () => (await readTheme(page)).hasDarkClass)
      .toBe(true);

    const afterToggle = await readTheme(page);
    expect(afterToggle.stored).toBe("dark");
    expect(afterToggle.manual).toBe("1");

    // Refresh and confirm the dark theme is restored from localStorage.
    await page.reload();
    await page.waitForLoadState("networkidle");
    await page.locator("#qa-deliverables").scrollIntoViewIfNeeded();

    const afterReload = await readTheme(page);
    expect(afterReload.stored).toBe("dark");
    expect(afterReload.hasDarkClass).toBe(true);

    // The toggle now offers the reverse action, proving state hydrated.
    await expect(
      page.getByRole("button", { name: /Switch to light mode/i })
    ).toBeVisible();
  });

  test("light selection is persisted and restored after refresh", async ({
    page,
  }) => {
    await page.addInitScript(() => {
      localStorage.setItem("theme", "dark");
      localStorage.setItem("theme-manual", "1");
      localStorage.setItem("language", "en");
    });
    await gotoEvidenceHub(page);

    await expect
      .poll(async () => (await readTheme(page)).hasDarkClass)
      .toBe(true);

    await page
      .getByRole("button", { name: /Switch to light mode/i })
      .click();

    await expect
      .poll(async () => (await readTheme(page)).hasDarkClass)
      .toBe(false);

    expect((await readTheme(page)).stored).toBe("light");

    await page.reload();
    await page.waitForLoadState("networkidle");

    const afterReload = await readTheme(page);
    expect(afterReload.stored).toBe("light");
    expect(afterReload.hasDarkClass).toBe(false);
  });
});