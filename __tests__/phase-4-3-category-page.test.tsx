import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { CategoryCollectionPage } from "@/components/category/CategoryCollectionPage";
import CalculatorsPage from "@/app/calculators/page";
import HomePage from "@/app/page";
import { createCategoryPageMetadata } from "@/components/category/CategoryCollectionPage";
import { getPublishedCalculators } from "@/lib/calculator-catalog";

afterEach(() => {
  cleanup();
});

describe("Phase 4.3 Statistics category page", () => {
  it("renders through shared architecture with two published links", () => {
    render(<CategoryCollectionPage categoryId="statistics" />);

    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(
      screen.getByRole("heading", { name: /Statistics & Data Calculators/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Mean Absolute Deviation Calculator" }),
    ).toHaveAttribute("href", expect.stringMatching(/mean-absolute-deviation/));
    expect(
      screen.getByRole("link", { name: "Outlier and IQR Calculator" }),
    ).toHaveAttribute("href", expect.stringMatching(/outlier-iqr/));
    expect(screen.getAllByRole("link", { name: /open calculator/i })).toHaveLength(2);
    expect(screen.getAllByText(/In preparation/i).length).toBeGreaterThan(0);
    const breadcrumb = screen.getByRole("navigation", { name: "Breadcrumb" });
    expect(within(breadcrumb).getByText("Statistics")).toBeInTheDocument();
    expect(within(breadcrumb).getByRole("link", { name: "Calculators" })).toBeInTheDocument();
  });

  it("preserves metadata and canonical intent", () => {
    const metadata = createCategoryPageMetadata("statistics");
    expect(metadata.title).toBe("Statistics & Data Calculators | CalcLume");
    expect(metadata.alternates?.canonical).toBe(
      "https://calclume.com/calculators/statistics/",
    );
    expect(metadata.robots).toEqual({ index: true, follow: true });
  });
});

describe("Phase 4.3 public surfaces", () => {
  it("exposes only Statistics as a public category on homepage and directory", () => {
    render(<HomePage />);
    expect(screen.getByRole("link", { name: /^Statistics$/i })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /^Math$/i })).not.toBeInTheDocument();

    cleanup();
    render(<CalculatorsPage />);
    expect(screen.getAllByRole("heading", { name: /^Statistics$/i }).length).toBeGreaterThan(
      0,
    );
    expect(screen.queryByRole("link", { name: /^Math$/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /percentage/i })).not.toBeInTheDocument();
    expect(getPublishedCalculators()).toHaveLength(2);
  });
});
