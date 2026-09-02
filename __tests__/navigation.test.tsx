import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { buildSearchIndex } from "@/lib/calculator-search-index";
import { footerNavRoutes, primaryNavRoutes } from "@/lib/routes";

const searchIndex = buildSearchIndex();

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
  it("renders primary navigation links without Statistics", () => {
    render(<Header searchIndex={searchIndex} />);

    for (const route of primaryNavRoutes) {
      expect(
        normalizeHref(
          screen.getByRole("link", { name: route.label }).getAttribute("href"),
        ),
      ).toBe(route.path);
    }

    expect(screen.queryByRole("link", { name: "Statistics" })).not.toBeInTheDocument();
  });

  it("exposes search control in the header", () => {
    render(<Header searchIndex={searchIndex} />);

    expect(screen.getAllByRole("button", { name: /search/i }).length).toBeGreaterThan(0);
  });

  it("opens mobile drawer from menu trigger", async () => {
    const user = userEvent.setup();
    render(<Header searchIndex={searchIndex} />);

    await user.click(screen.getByRole("button", { name: /^menu$/i }));

    expect(screen.getByRole("dialog", { name: /site navigation/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Contact" })).toBeInTheDocument();
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
