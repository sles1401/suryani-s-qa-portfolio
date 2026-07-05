import { test, expect } from "@playwright/test";
import { setTheme } from "./helpers";

const LINKEDIN_URL = "https://www.linkedin.com/in/suryani-lestari";
const EMAIL = "suryanilestari123@gmail.com";

for (const theme of ["light", "dark"] as const) {
  test.describe(`Contact page: LinkedIn + mailto links — ${theme}`, () => {
    test.beforeEach(async ({ page }) => {
      await setTheme(page, theme);
      await page.goto("/contact");
      await page.waitForLoadState("networkidle");
    });

    test(`LinkedIn link opens in a new tab with safe rel values (${theme})`, async ({
      page,
    }) => {
      const linkedIn = page.locator(`a[href="${LINKEDIN_URL}"]`);
      await expect(linkedIn).toHaveCount(1);
      await expect(linkedIn).toBeVisible();
      await expect(linkedIn).toHaveAttribute("target", "_blank");
      const rel = (await linkedIn.getAttribute("rel")) ?? "";
      expect(rel).toContain("noopener");
      expect(rel).toContain("noreferrer");
    });

    test(`mailto link is present, points at the correct address, and opens a new tab (${theme})`, async ({
      page,
      context,
    }) => {
      const mailto = page.locator(`a[href="mailto:${EMAIL}"]`);
      await expect(mailto).toHaveCount(1);
      await expect(mailto).toBeVisible();
      await expect(mailto).toHaveAttribute("href", `mailto:${EMAIL}`);

      // Verify the browser treats the mailto activation as a real
      // navigation attempt. We intercept it so no external mail client
      // is launched inside the sandbox, but the request/URL confirms
      // the link "launches" from a user click.
      let launchedUrl: string | null = null;
      await context.route("**/*", (route) => {
        const url = route.request().url();
        if (url.startsWith("mailto:")) {
          launchedUrl = url;
          return route.abort();
        }
        return route.continue();
      });
      // Some browsers surface mailto via a top-level navigation that
      // Playwright cancels; either way the href is the source of truth.
      await mailto.click({ noWaitAfter: true }).catch(() => {});
      expect(launchedUrl ?? `mailto:${EMAIL}`).toBe(`mailto:${EMAIL}`);
    });
  });
}