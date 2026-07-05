import { test, expect } from "@playwright/test";
import { setTheme } from "./helpers";

for (const theme of ["light", "dark"] as const) {
  test.describe(`Contact form validation — ${theme}`, () => {
    test.beforeEach(async ({ page }) => {
      await setTheme(page, theme);
      await page.goto("/contact");
      await page.waitForLoadState("networkidle");
    });

    test(`empty submit shows required-field errors, invalid email shows format error, and errors clear per field (${theme})`, async ({
      page,
    }) => {
      const submit = page.getByRole("button", { name: /^Send Message$/i });
      const name = page.getByLabel(/Full Name/i);
      const email = page.getByLabel(/Email Address/i);
      const message = page.getByLabel(/^Message/i);

      // 1) Empty submit → required errors on name + email + message.
      await submit.click();
      const nameErr = page.getByText(/^Name is required$/i);
      const emailErr = page.getByText(/^Invalid email address$/i);
      const messageErr = page.getByText(/^Message is required$/i);
      await expect(nameErr).toBeVisible();
      await expect(emailErr).toBeVisible();
      await expect(messageErr).toBeVisible();

      // 2) Invalid email keeps the email error after re-submit.
      await email.fill("not-an-email");
      // Fixing email input should clear its inline error immediately
      // (handleChange resets errors[name] on edit).
      await expect(emailErr).toHaveCount(0);
      await submit.click();
      await expect(page.getByText(/^Invalid email address$/i)).toBeVisible();

      // 3) Fix each field and confirm its specific error disappears
      // without touching the others.
      await name.fill("Jane QA");
      await expect(page.getByText(/^Name is required$/i)).toHaveCount(0);
      await expect(page.getByText(/^Invalid email address$/i)).toBeVisible();
      await expect(page.getByText(/^Message is required$/i)).toBeVisible();

      await email.fill("jane.qa@example.com");
      await expect(page.getByText(/^Invalid email address$/i)).toHaveCount(0);
      await expect(page.getByText(/^Message is required$/i)).toBeVisible();

      await message.fill("All fields corrected — submitting cleanly.");
      await expect(page.getByText(/^Message is required$/i)).toHaveCount(0);

      // 4) Valid submission now succeeds.
      await submit.click();
      await expect(
        page.getByRole("heading", { name: /Message Sent!/i })
      ).toBeVisible({ timeout: 5000 });
    });
  });
}