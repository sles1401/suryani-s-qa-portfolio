import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { AllProviders } from "@/test/utils";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Experience from "@/pages/Experience";
import Portfolio from "@/pages/Portfolio";
import Contact from "@/pages/Contact";

type Page = {
  name: string;
  Component: React.ComponentType;
  id: string;
  en: string;
};

const pages: Page[] = [
  {
    name: "Home",
    Component: Home,
    id: "Memastikan Kualitas, Satu Tes Pada Satu Waktu",
    en: "Ensuring Quality, One Test at a Time",
  },
  {
    name: "About",
    Component: About,
    id: "Membangun Karir di Quality Assurance",
    en: "Building a Career in Quality Assurance",
  },
  {
    name: "Experience",
    Component: Experience,
    id: "Pengalaman Quality Assurance",
    en: "Quality Assurance Experience",
  },
  {
    name: "Portfolio",
    Component: Portfolio,
    id: "Lihat Resume & CV",
    en: "View Resume & CV",

  },
  {
    name: "Contact",
    Component: Contact,
    id: "Hubungi Saya",
    en: "Get in Touch",
  },
];

describe("Bilingual toggle across pages", () => {
  beforeEach(() => localStorage.clear());

  for (const { name, Component, id, en } of pages) {
    it(`${name} renders English strings when language=en`, () => {
      localStorage.setItem("language", "en");
      render(
        <AllProviders>
          <Component />
        </AllProviders>
      );
      expect(screen.getAllByText(en).length).toBeGreaterThan(0);
      expect(screen.queryByText(id)).toBeNull();
    });

    it(`${name} renders Indonesian strings when language=id (persisted)`, () => {
      localStorage.setItem("language", "id");
      render(
        <AllProviders>
          <Component />
        </AllProviders>
      );
      expect(screen.getAllByText(id).length).toBeGreaterThan(0);
      expect(screen.queryByText(en)).toBeNull();
    });
  }
});