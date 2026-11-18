import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import * as framerMotion from "framer-motion";
import ScrollProgress from "./ScrollProgress";
import { ScrollReveal, ScrollRevealGroup, ScrollRevealItem } from "./ScrollReveal";

vi.mock("framer-motion", async (importOriginal) => {
  const actual = await importOriginal<typeof import("framer-motion")>();
  return {
    ...actual,
    useReducedMotion: vi.fn(() => false),
  };
});

describe("ScrollProgress & ScrollReveal", () => {
  beforeEach(() => {
    vi.mocked(framerMotion.useReducedMotion).mockReturnValue(false);
  });

  it("renders ScrollProgress as decorative fixed bar at top of viewport", () => {
    const { container } = render(<ScrollProgress />);
    const bar = container.firstElementChild as HTMLElement;
    expect(bar).toBeInTheDocument();
    expect(bar).toHaveAttribute("aria-hidden", "true");
    expect(bar.className).toContain("fixed");
    expect(bar.className).toContain("top-0");
  });

  it("renders ScrollReveal with all direction variants", () => {
    const directions = ["up", "down", "left", "right", "none"] as const;
    render(
      <div>
        {directions.map((dir) => (
          <ScrollReveal key={dir} direction={dir}>
            <span>content-{dir}</span>
          </ScrollReveal>
        ))}
      </div>
    );

    for (const dir of directions) {
      expect(screen.getByText(`content-${dir}`)).toBeInTheDocument();
    }
  });

  it("renders ScrollRevealGroup and ScrollRevealItem as semantic list", () => {
    render(
      <ScrollRevealGroup as="ul" stagger={0.08}>
        <ScrollRevealItem as="li">Item 1</ScrollRevealItem>
        <ScrollRevealItem as="li">Item 2</ScrollRevealItem>
      </ScrollRevealGroup>
    );

    expect(screen.getByRole("list")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
  });

  it("disables initial hidden offset when prefers-reduced-motion is active", () => {
    vi.mocked(framerMotion.useReducedMotion).mockReturnValue(true);

    const { container } = render(
      <ScrollReveal direction="up">
        <span>Visible immediately</span>
      </ScrollReveal>
    );

    expect(screen.getByText("Visible immediately")).toBeInTheDocument();
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper.style.opacity).not.toBe("0");
  });
});
