import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import CalculatorsPage from "@/app/calculators/page";
import HomePage from "@/app/page";
import { Header } from "@/components/layout/Header";
import { buildSearchIndex } from "@/lib/calculator-search-index";
import { getPublishedCalculators } from "@/lib/calculator-catalog";
import { getSitemapPaths } from "@/app/sitemap";
import { publishedCalculatorRoutes } from "@/lib/published-calculators";

const searchIndex = buildSearchIndex();

afterEach(() => {
  cleanup();
});

describe("Phase 4.2 homepage reconciliation", () => {
  it("renders exactly one H1 and approved section headings", () => {
    render(<HomePage />);

    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(
      screen.getByRole("heading", { name: /clear calculators that show the work/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /featured calculators/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /browse by category/i })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /how calclume shows the work/i }),
    ).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: /recently added/i })).not.toBeInTheDocument();
  });

  it("links both published calculators in server-rendered featured section only", () => {
    render(<HomePage />);

    expect(getPublishedCalculators()).toHaveLength(2);
    expect(
      screen.getAllByRole("link", { name: /Mean Absolute Deviation Calculator/i }).length,
    ).toBeGreaterThanOrEqual(1);
    expect(
      screen.getAllByRole("link", { name: /Outlier and IQR Calculator/i }).length,
    ).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByRole("link", { name: /open calculator/i })).toHaveLength(2);
    expect(screen.queryByText(/In preparation/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/popular/i)).not.toBeInTheDocument();
  });
});

describe("Phase 4.2 directory reconciliation", () => {
  it("has one H1 and two live calculator links without fake routes", () => {
    render(<CalculatorsPage />);

    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("heading", { name: /^Calculators$/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /available calculators/i })).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Mean Absolute Deviation Calculator" }),
    ).toHaveAttribute("href", expect.stringMatching(/mean-absolute-deviation/));
    expect(
      screen.getByRole("link", { name: "Outlier and IQR Calculator" }),
    ).toHaveAttribute("href", expect.stringMatching(/outlier-iqr/));
    expect(screen.queryByRole("link", { name: /percentage/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /five number summary/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /^Math$/i })).not.toBeInTheDocument();
  });

  it("includes methodology trust path and one Statistics collection summary", () => {
    render(<CalculatorsPage />);

    expect(screen.getByRole("link", { name: /read our methodology/i })).toHaveAttribute(
      "href",
      "/methodology",
    );
    expect(screen.getByRole("heading", { name: /browse collections/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Statistics" })).toHaveAttribute(
      "href",
      "/calculators/statistics",
    );
    expect(screen.getAllByRole("heading", { name: /^Statistics$/i })).toHaveLength(1);
  });
});

describe("Phase 4.2 navigation reconciliation", () => {
  it("marks primary nav without Statistics and exposes search separately", () => {
    render(<Header searchIndex={searchIndex} />);

    expect(screen.getByRole("navigation", { name: "Primary" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Calculators" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Methodology" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "About" })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Statistics" })).not.toBeInTheDocument();
    expect(screen.getAllByRole("button", { name: /search calculators/i }).length).toBeGreaterThan(
      0,
    );
  });

  it("closes mobile drawer on Escape and returns focus to menu trigger", async () => {
    const user = userEvent.setup();
    render(<Header searchIndex={searchIndex} />);

    const menuButton = screen.getByRole("button", { name: /^menu$/i });
    await user.click(menuButton);
    expect(screen.getByRole("dialog", { name: /site navigation/i })).toBeInTheDocument();

    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog", { name: /site navigation/i })).not.toBeInTheDocument();
    expect(menuButton).toHaveFocus();
  });
});

describe("Phase 4.2 SEO safeguards", () => {
  it("keeps sitemap at twelve URLs with two published calculators", () => {
    const paths = getSitemapPaths();
    expect(paths).toHaveLength(12);
    expect(publishedCalculatorRoutes).toHaveLength(2);
    expect(JSON.stringify(paths)).not.toMatch(/localhost/i);
  });
});
