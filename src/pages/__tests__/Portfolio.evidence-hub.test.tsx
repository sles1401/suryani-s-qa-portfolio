import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AllProviders } from "@/test/utils";
import Portfolio from "@/pages/Portfolio";
import {
  LIVE_TEST_CASE_SHEET_URL,
  TEST_CASE_DOCS_REPO_URL,
} from "@/lib/links";

const EXPECTED = {
  sheet: LIVE_TEST_CASE_SHEET_URL,
  docsRepo: TEST_CASE_DOCS_REPO_URL,
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

  it("Card 2 marks the Playwright codebase as NDA without a public repo link", () => {
    render(
      <AllProviders>
        <Portfolio />
      </AllProviders>
    );
    expect(screen.getByText(/Codebase — NDA/i)).toBeInTheDocument();
    expect(
      document.querySelector('a[href*="java-playwright-automation"]')
    ).toBeNull();
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

    // The modal states the NDA constraint instead of linking a private repo.
    expect(within(dialog).getByText(/under NDA|bersifat NDA/i)).toBeInTheDocument();

    // Close via keyboard (Escape) and confirm focus returns to trigger.
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(document.activeElement).toBe(trigger);
  });
});
