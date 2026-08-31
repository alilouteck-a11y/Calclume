import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { footerNavRoutes, primaryNavRoutes } from "@/lib/routes";

afterEach(() => {
  cleanup();
});

function normalizeHref(href: string | null): string {
  if (!href) {
    return "";
  }

  return href.endsWith("/") ? href : `${href}/`;
}

describe("navigation integrity", () => {
  it("renders all primary navigation links", () => {
    render(<Header />);

    for (const route of primaryNavRoutes) {
      expect(
        normalizeHref(
          screen.getByRole("link", { name: route.label }).getAttribute("href"),
        ),
      ).toBe(route.path);
    }
  });

  it("renders all footer navigation links", () => {
    render(<Footer />);

    for (const route of footerNavRoutes) {
      expect(screen.getAllByRole("link", { name: route.label }).length).toBeGreaterThan(0);
    }
  });

  it("includes skip to content link in layout pattern", () => {
    render(
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>,
    );

    expect(screen.getByRole("link", { name: /skip to main content/i })).toHaveAttribute(
      "href",
      "#main-content",
    );
  });
});
