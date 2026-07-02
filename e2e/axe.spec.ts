import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { gotoPortfolio, setTheme } from "./helpers";

for (const theme of ["light", "dark"] as const) {
  test(`axe: Evidence Hub has no serious/critical a11y issues (${theme})`, async ({
    page,
  }) => {
    await setTheme(page, theme);
    await gotoPortfolio(page);

    const results = await new AxeBuilder({ page })
      .include("#qa-deliverables")
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();

    const blocking = results.violations.filter((v) =>
      ["serious", "critical"].includes(v.impact ?? "")
    );
    if (blocking.length) {
      console.log(JSON.stringify(blocking, null, 2));
    }
    expect(blocking).toEqual([]);
  });

  test(`axe: POM modal has no serious/critical a11y issues (${theme})`, async ({
    page,
  }) => {
    await setTheme(page, theme);
    await gotoPortfolio(page);

    await page
      .getByRole("button", {
        name: /Expand Page Object Model structure snippet/i,
      })
      .click();
    await expect(page.getByRole("dialog")).toBeVisible();

    const results = await new AxeBuilder({ page })
      .include('[role="dialog"]')
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();

    const blocking = results.violations.filter((v) =>
      ["serious", "critical"].includes(v.impact ?? "")
    );
    if (blocking.length) {
      console.log(JSON.stringify(blocking, null, 2));
    }
    expect(blocking).toEqual([]);
  });
}