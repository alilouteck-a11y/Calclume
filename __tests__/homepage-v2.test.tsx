import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import HomePage from "@/app/page";
import { buildSearchIndex } from "@/lib/calculator-search-index";

afterEach(() => {
  cleanup();
});

describe("homepage V2", () => {
  it("renders library-first hero and search", () => {
    render(<HomePage />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /clear calculators that show the work/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByRole("combobox", { name: /search calculators/i })).toBeInTheDocument();
    expect(screen.queryByText(/popular calculators/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/initial collection/i)).not.toBeInTheDocument();
  });

  it("shows featured published calculators only", () => {
    render(<HomePage />);

    expect(screen.getByRole("heading", { name: /featured calculators/i })).toBeInTheDocument();
    expect(
      screen.getAllByRole("link", { name: /Mean Absolute Deviation Calculator/i }).length,
    ).toBeGreaterThan(0);
    expect(
      screen.getAllByRole("link", { name: /Outlier and IQR Calculator/i }).length,
    ).toBeGreaterThan(0);
    expect(screen.queryByText(/Five Number Summary/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/In preparation/i)).not.toBeInTheDocument();
  });

  it("shows Statistics category summary without calculator cards", () => {
    render(<HomePage />);

    const browseSection = screen.getByRole("heading", { name: /browse by category/i })
      .closest("section")!;

    expect(screen.getByRole("heading", { name: /browse by category/i })).toBeInTheDocument();
    expect(within(browseSection).getByRole("link", { name: /^Statistics$/i })).toBeInTheDocument();
    expect(
      within(browseSection).getByRole("link", { name: /view statistics collection/i }),
    ).toBeInTheDocument();
    expect(
      within(browseSection).queryByRole("link", { name: /open calculator/i }),
    ).not.toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: /open calculator/i })).toHaveLength(2);
  });

  it("hides recently added when fewer than two eligible tools", () => {
    render(<HomePage />);

    expect(screen.queryByRole("heading", { name: /recently added/i })).not.toBeInTheDocument();
  });

  it("includes how-it-works compact preview with live MAD link", () => {
    render(<HomePage />);

    expect(
      screen.getByRole("heading", { name: /how calclume shows the work/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /see the full worked calculation/i }),
    ).toHaveAttribute("href", expect.stringMatching(/mean-absolute-deviation/));
  });

  it("builds a search index with two published entries", () => {
    expect(buildSearchIndex()).toHaveLength(2);
  });
});
