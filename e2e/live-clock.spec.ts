import { test, expect } from "@playwright/test";
import { setTheme } from "./helpers";

// The header clock must show Asia/Jakarta (WIB) time and tick once a second.
const CLOCK = '[data-testid="live-clock"] time';

const wibNow = () =>
  new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: "Asia/Jakarta",
  }).format(new Date());

const toSeconds = (hhmmss: string) => {
  const [h, m, s] = hhmmss.split(":").map(Number);
  return h * 3600 + m * 60 + s;
};

test.describe("LiveClock", () => {
  test.use({ viewport: { width: 1280, height: 900 } });

  test.beforeEach(async ({ page }) => {
    await setTheme(page, "light");
    await page.goto("/");
    await page.waitForLoadState("networkidle");
  });

  test("renders WIB time matching the Asia/Jakarta clock", async ({ page }) => {
    const clock = page.locator(CLOCK);
    await expect(clock).toBeVisible();
    await expect(page.locator('[data-testid="live-clock"]')).toContainText("WIB");

    const text = (await clock.innerText()).trim();
    const shown = text.match(/(\d{2}):(\d{2}):(\d{2})/)?.[0];
    expect(shown, `unexpected clock text: ${text}`).toBeTruthy();

    // Within 5s of the real WIB time (tolerance for render + assertion latency).
    const delta = Math.abs(toSeconds(shown!) - toSeconds(wibNow()));
    expect(Math.min(delta, 86400 - delta)).toBeLessThanOrEqual(5);

    // Accessible name announces the time in WIB.
    await expect(clock).toHaveAttribute(
      "aria-label",
      /Current time \d{2}:\d{2}:\d{2} WIB/
    );
  });

  test("ticks forward roughly once per second", async ({ page }) => {
    const clock = page.locator(CLOCK);
    const read = async () => {
      const t = (await clock.innerText()).trim();
      return toSeconds(t.match(/(\d{2}):(\d{2}):(\d{2})/)![0]);
    };

    const start = await read();
    // It must advance within ~1.5s.
    await expect
      .poll(read, { timeout: 3000, intervals: [100] })
      .not.toBe(start);

    const t0 = await read();
    await page.waitForTimeout(3000);
    const t1 = await read();
    const elapsed = (t1 - t0 + 86400) % 86400;
    // 3s wall clock => 3 ticks, ±1s tolerance.
    expect(elapsed).toBeGreaterThanOrEqual(2);
    expect(elapsed).toBeLessThanOrEqual(4);
  });
});