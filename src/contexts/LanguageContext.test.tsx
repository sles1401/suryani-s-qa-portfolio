import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, act } from "@testing-library/react";
import { LanguageProvider, useLanguage } from "./LanguageContext";

const Probe = () => {
  const { language, setLanguage, t } = useLanguage();
  return (
    <div>
      <span data-testid="lang">{language}</span>
      <span data-testid="text">{t("Halo", "Hello")}</span>
      <button onClick={() => setLanguage("id")}>ID</button>
      <button onClick={() => setLanguage("en")}>EN</button>
    </div>
  );
};

describe("LanguageContext", () => {
  beforeEach(() => localStorage.clear());

  it("defaults to English when nothing is stored", () => {
    render(
      <LanguageProvider>
        <Probe />
      </LanguageProvider>
    );
    expect(screen.getByTestId("lang").textContent).toBe("en");
    expect(screen.getByTestId("text").textContent).toBe("Hello");
  });

  it("persists the chosen language to localStorage", () => {
    render(
      <LanguageProvider>
        <Probe />
      </LanguageProvider>
    );
    act(() => {
      screen.getByText("ID").click();
    });
    expect(localStorage.getItem("language")).toBe("id");
    expect(screen.getByTestId("text").textContent).toBe("Halo");
  });

  it("restores the language from localStorage on mount (survives refresh)", () => {
    localStorage.setItem("language", "id");
    render(
      <LanguageProvider>
        <Probe />
      </LanguageProvider>
    );
    expect(screen.getByTestId("lang").textContent).toBe("id");
    expect(screen.getByTestId("text").textContent).toBe("Halo");
  });
});