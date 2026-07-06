import { defineConfig, devices } from "@playwright/test";

const PORT = Number(process.env.PORT ?? 8080);
const baseURL = `http://localhost:${PORT}`;

// Visual-snapshot specs are authored against Chromium baselines and would
// produce false positives across engines with different font/AA rendering.
// Firefox/WebKit still run every functional, axe, and DOM check.
const VISUAL_ONLY_CHROMIUM = [
  /pages\.visual\.spec\.ts/,
  /pages\.visual-desktop\.spec\.ts/,
  /pages\.visual-320\.spec\.ts/,
  /pages\.visual\.reduced-motion\.spec\.ts/,
  /pages\.visual\.mobile-reduced-motion\.spec\.ts/,
  /evidence-hub\.visual\.spec\.ts/,
  /evidence-hub\.responsive\.spec\.ts/,
  /evidence-hub\.states\.visual\.spec\.ts/,
];

export default defineConfig({
  testDir: "./e2e",
  timeout: 30_000,
  expect: { timeout: 5_000, toHaveScreenshot: { maxDiffPixelRatio: 0.02 } },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [["list"], ["html", { open: "never" }]] : "list",
  use: {
    baseURL,
    viewport: { width: 1280, height: 1800 },
    trace: "retain-on-failure",
    video: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        launchOptions: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE
          ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE }
          : undefined,
      },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
      testIgnore: VISUAL_ONLY_CHROMIUM,
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
      testIgnore: VISUAL_ONLY_CHROMIUM,
    },
  ],
  webServer: process.env.PLAYWRIGHT_SKIP_WEBSERVER
    ? undefined
    : {
        command: `bun run dev --port ${PORT} --strictPort`,
        url: baseURL,
        reuseExistingServer: !process.env.CI,
        timeout: 120_000,
      },
});