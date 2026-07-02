import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AllProviders } from "@/test/utils";
import Portfolio from "@/pages/Portfolio";

const EXPECTED = {
  sheet:
    "https://docs.google.com/spreadsheets/d/1WQq0nQmS3f7-Live-Test-Case-Dummy/edit?usp=sharing",
  docsRepo: "https://github.com/sles1401/qa-test-documentation",
  playwright: "https://github.com/sles1401/java-playwright-automation",
};

const getLink = (name: RegExp) =>
  screen.getByRole("link", { name }) as HTMLAnchorElement;

describe("Portfolio · Evidence Hub CTAs", () => {
  beforeEach(() => localStorage.clear());

  it("Card 1 opens Google Sheets dummy in a new tab", () => {
    render(
      <AllProviders>
        <Portfolio />
      </AllProviders>
    );
    const link = getLink(/Live Test Case Dummy/i);
    expect(link.href).toBe(EXPECTED.sheet);
    expect(link.target).toBe("_blank");
    expect(link.rel).toMatch(/noopener/);
    expect(link.rel).toMatch(/noreferrer/);
  });

  it("Card 1 opens the GitHub docs repository in a new tab", () => {
    render(
      <AllProviders>
        <Portfolio />
      </AllProviders>
    );
    const link = getLink(/Docs Repository|Repositori Dokumen/i);
    expect(link.href).toBe(EXPECTED.docsRepo);
    expect(link.target).toBe("_blank");
    expect(link.rel).toMatch(/noopener/);
  });

  it("Card 2 opens the Java Playwright repo in a new tab", () => {
    render(
      <AllProviders>
        <Portfolio />
      </AllProviders>
    );
    const link = getLink(/Explore Playwright Codebase/i);
    expect(link.href).toBe(EXPECTED.playwright);
    expect(link.target).toBe("_blank");
    expect(link.rel).toMatch(/noopener/);
  });

  it("POM snippet trigger has an accessible label and opens a focus-trapped modal", async () => {
    const user = userEvent.setup();
    render(
      <AllProviders>
        <Portfolio />
      </AllProviders>
    );

    const trigger = screen.getByRole("button", {
      name: /Expand Page Object Model structure snippet/i,
    });
    expect(trigger).toBeInTheDocument();

    await user.click(trigger);

    const dialog = await screen.findByRole("dialog");
    expect(dialog).toBeInTheDocument();
    expect(
      within(dialog).getByText(/Page Object Model Structure/i)
    ).toBeInTheDocument();

    // Radix Dialog renders an accessible Close button — keyboard-usable.
    const closeBtn = within(dialog).getByRole("button", { name: /close/i });
    expect(closeBtn).toBeInTheDocument();

    // Modal contains a GitHub CTA that opens in a new tab.
    const repoLink = within(dialog).getByRole("link", {
      name: /Open Java Playwright repository on GitHub/i,
    }) as HTMLAnchorElement;
    expect(repoLink.href).toBe(EXPECTED.playwright);
    expect(repoLink.target).toBe("_blank");

    // Close via keyboard (Escape) and confirm focus returns to trigger.
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(document.activeElement).toBe(trigger);
  });
});