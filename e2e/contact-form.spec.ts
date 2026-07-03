import { test, expect } from "@playwright/test";
import { setTheme } from "./helpers";

for (const theme of ["light", "dark"] as const) {
  test.describe(`Contact form — ${theme}`, () => {
    test.beforeEach(async ({ page }) => {
      await setTheme(page, theme);
      await page.goto("/contact");
      await page.waitForLoadState("networkidle");
    });

    test(`required-field validation surfaces friendly errors (${theme})`, async ({
      page,
    }) => {
      await page.getByRole("button", { name: /^Send Message$/i }).click();

      // Zod-driven inline errors under Name / Email / Message.
      await expect(page.getByText(/Name is required/i)).toBeVisible();
      await expect(page.getByText(/Invalid email address/i)).toBeVisible();
      await expect(page.getByText(/Message is required/i)).toBeVisible();

      // No success state yet.
      await expect(page.getByRole("heading", { name: /Message Sent!/i })).toHaveCount(0);
    });

    test(`valid submission shows success confirmation (${theme})`, async ({
      page,
    }) => {
      await page.getByLabel(/Full Name/i).fill("Jane QA");
      await page.getByLabel(/Email Address/i).fill("jane.qa@example.com");
      await page.getByLabel(/Subject/i).fill("Portfolio inquiry");
      await page
        .getByLabel(/^Message/i)
        .fill("Hi Suryani — I'd like to learn more about your QA work.");

      await page.getByRole("button", { name: /^Send Message$/i }).click();

      // Submission simulates a 1.5s network call; give it room.
      await expect(
        page.getByRole("heading", { name: /Message Sent!/i })
      ).toBeVisible({ timeout: 5000 });
      await expect(
        page.getByText(/Thank you for reaching out/i).first()
      ).toBeVisible();
    });
  });
}