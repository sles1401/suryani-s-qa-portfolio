import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { setTheme } from "./helpers";

const PAGES = [
  { path: "/", name: "Home" },
  { path: "/about", name: "About" },
  { path: "/experience", name: "Experience" },
  { path: "/portfolio", name: "Portfolio" },
  { path: "/contact", name: "Contact" },
];

for (const theme of ["light", "dark"] as const) {
  for (const p of PAGES) {
    test(`axe: ${p.name} has no serious/critical WCAG issues (${theme})`, async ({
      page,
    }) => {
      await setTheme(page, theme);
      await page.goto(p.path);
      await page.waitForLoadState("networkidle");

      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
        .analyze();

      const blocking = results.violations.filter((v) =>
        ["serious", "critical"].includes(v.impact ?? "")
      );
      if (blocking.length) {
        console.log(
          `axe blocking violations on ${p.name} (${theme}):`,
          JSON.stringify(
            blocking.map((v) => ({
              id: v.id,
              impact: v.impact,
              nodes: v.nodes.length,
              help: v.help,
            })),
            null,
            2
          )
        );
      }
      expect(blocking).toEqual([]);
    });
  }
}