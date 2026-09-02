import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import CalculatorsPage from "@/app/calculators/page";
import HomePage from "@/app/page";
import {
  getCategoryCollectionSummary,
  getPublishedCalculators,
} from "@/lib/calculator-catalog";
import { getSitemapPaths } from "@/app/sitemap";
import { publishedCalculatorRoutes } from "@/lib/published-calculators";

afterEach(() => {
  cleanup();
});

describe("Phase 4.2 visual deduplication — homepage", () => {
  it("does not duplicate calculator cards between Featured and Browse by category", () => {
    render(<HomePage />);

    const featuredSection = screen.getByRole("heading", { name: /featured calculators/i })
      .closest("section")!;
    const browseSection = screen.getByRole("heading", { name: /browse by category/i })
      .closest("section")!;

    expect(within(featuredSection).getAllByRole("link", { name: /open calculator/i })).toHaveLength(
      2,
    );
    expect(
      within(browseSection).queryByRole("link", { name: /open calculator/i }),
    ).not.toBeInTheDocument();
    expect(within(browseSection).queryByText(/^Available$/i)).not.toBeInTheDocument();
  });

  it("shows catalog-derived published count in Statistics category summary", () => {
    render(<HomePage />);

    const summary = getCategoryCollectionSummary("statistics");
    expect(summary?.publishedCount).toBe(2);

    const browseSection = screen.getByRole("heading", { name: /browse by category/i })
      .closest("section")!;
    expect(within(browseSection).getByText(`${summary!.publishedCount} available`)).toBeInTheDocument();
    expect(
      within(browseSection).getByRole("link", { name: /view statistics collection/i }),
    ).toHaveAttribute("href", expect.stringMatching(/\/calculators\/statistics\/?$/));
  });

  it("uses compact illustrative preview without detailed step cards or pillar grid", () => {
    render(<HomePage />);

    const section = screen.getByRole("heading", { name: /how calclume shows the work/i })
      .closest("section")!;

    expect(within(section).getByText(/MAD = 2\.4/)).toBeInTheDocument();
    expect(within(section).getByText(/MAD = \(Σ\|xᵢ − x̄\|\) \/ n/)).toBeInTheDocument();
    expect(within(section).getByText(/Mean: x̄ = \(12 \+ 15 \+ 14 \+ 10 \+ 19\) \/ 5 = 14/)).toBeInTheDocument();
    expect(
      within(section).getByRole("link", { name: /see the full worked calculation/i }),
    ).toHaveAttribute("href", expect.stringMatching(/mean-absolute-deviation/));
    expect(within(section).queryByText(/Transparent formulas/i)).not.toBeInTheDocument();
    expect(within(section).queryByText(/Compute the mean/i)).not.toBeInTheDocument();
  });
});

describe("Phase 4.2 visual deduplication — directory", () => {
  it("lists exactly two published calculator cards in Available calculators", () => {
    render(<CalculatorsPage />);

    const availableSection = screen
      .getByRole("heading", { name: /available calculators/i })
      .closest("div")!;

    expect(getPublishedCalculators()).toHaveLength(2);
    expect(within(availableSection).getAllByRole("link", { name: /open calculator/i })).toHaveLength(
      2,
    );
  });

  it("has one compact Statistics collection summary without repeated calculator cards", () => {
    render(<CalculatorsPage />);

    const collectionsSection = screen
      .getByRole("heading", { name: /browse collections/i })
      .closest("div")!;

    expect(screen.getAllByRole("heading", { name: /^Statistics$/i })).toHaveLength(1);
    expect(
      within(collectionsSection).queryByRole("link", { name: /open calculator/i }),
    ).not.toBeInTheDocument();

    const summary = getCategoryCollectionSummary("statistics");
    expect(within(collectionsSection).getByText(`${summary!.publishedCount} available`)).toBeInTheDocument();
    expect(
      within(collectionsSection).getByText(
        `${summary!.totalCount} in this collection · ${summary!.preparationCount} in preparation`,
      ),
    ).toBeInTheDocument();
  });

  it("does not expose Math or Percentage routes", () => {
    render(<CalculatorsPage />);

    expect(screen.queryByRole("link", { name: /^Math$/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /percentage/i })).not.toBeInTheDocument();
  });
});

describe("Phase 4.2 publication safeguards", () => {
  it("keeps sitemap at twelve URLs with two published calculators", () => {
    expect(getSitemapPaths()).toHaveLength(12);
    expect(publishedCalculatorRoutes).toHaveLength(2);
  });
});
