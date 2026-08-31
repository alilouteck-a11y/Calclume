import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { MadEducationalContent } from "@/components/calculators/mean-absolute-deviation/MadEducationalContent";
import { createPageMetadata } from "@/lib/metadata";
import { madCalculatorConfig } from "@/lib/calculators/mean-absolute-deviation-config";
import { getMadSoftwareApplicationSchema } from "@/lib/calculators/mean-absolute-deviation-schema";
import { ExamplePanel } from "@/components/home/ExamplePanel";

afterEach(() => {
  cleanup();
});

const requiredHeadings = [
  "What is mean absolute deviation?",
  "Mean absolute deviation formula",
  "How to calculate MAD",
  "Complete worked example",
  "Mean absolute deviation versus standard deviation",
  "When MAD is useful",
  "Limitations and interpretation",
] as const;

describe("mean absolute deviation page metadata", () => {
  it("sets unique title, description, and canonical URL", () => {
    const metadata = createPageMetadata({
      title: "Mean Absolute Deviation Calculator",
      description:
        "Calculate mean absolute deviation (MAD) about the arithmetic mean. Enter a dataset to see the formula, step-by-step working, deviation table, and a clear interpretation—all computed locally in your browser.",
      path: madCalculatorConfig.path,
    });

    expect(metadata.title).toBe(
      "Mean Absolute Deviation Calculator | CalcLume",
    );
    expect(metadata.description).toMatch(/mean absolute deviation/i);
    expect(metadata.alternates?.canonical).toBe(
      "https://calclume.com/calculators/statistics/mean-absolute-deviation/",
    );
    expect(metadata.robots).toEqual({ index: true, follow: true });
  });
});

describe("MadEducationalContent", () => {
  it("renders the required educational headings in order", () => {
    render(<MadEducationalContent />);

    const headings = screen
      .getAllByRole("heading", { level: 2 })
      .map((heading) => heading.textContent);

    expect(headings).toEqual([...requiredHeadings]);
  });

  it("includes the reference worked example values", () => {
    render(<MadEducationalContent />);

    expect(screen.getByText(/12, 15, 14, 10, 19/)).toBeInTheDocument();
    expect(screen.getByText("2.4")).toBeInTheDocument();
    expect(
      screen.getByText(
        /values in this dataset are, on average, 2.4 units away from the arithmetic mean of 14/i,
      ),
    ).toBeInTheDocument();
  });

  it("distinguishes MAD from median absolute deviation and MAPE", () => {
    render(<MadEducationalContent />);
    const content = document.body.textContent ?? "";

    expect(content).toMatch(/not median absolute deviation/i);
    expect(content).toMatch(/not mean absolute percentage error/i);
    expect(content).toMatch(/average absolute deviation/i);
    expect(content).toMatch(/“MAD” means median absolute deviation/i);
    expect(content).not.toMatch(/suggests moderate spread/i);
  });

  it("shows the formula with denominator n", () => {
    render(<MadEducationalContent />);
    expect(screen.getByText(/MAD = Σ\|xᵢ − x̄\| \/ n/)).toBeInTheDocument();
    expect(screen.getByText(/x̄ = Σxᵢ \/ n/)).toBeInTheDocument();
  });

  it("links to methodology and sources", () => {
    render(<MadEducationalContent />);

    expect(
      screen.getByRole("link", { name: "methodology" }).getAttribute("href"),
    ).toMatch(/\/methodology\/?$/);
    expect(
      screen.getByRole("link", { name: "sources" }).getAttribute("href"),
    ).toMatch(/\/sources\/?$/);
  });
});

describe("MAD sources and structured data policy", () => {
  it("lists verified source URLs", () => {
    expect(madCalculatorConfig.sources).toHaveLength(2);

    for (const source of madCalculatorConfig.sources) {
      expect(source.url).toMatch(/^https:\/\//);
      expect(source.title.length).toBeGreaterThan(0);
      expect(source.note?.length).toBeGreaterThan(0);
    }

    expect(madCalculatorConfig.sources[0].url).toContain(
      "itl.nist.gov/div898/handbook/eda/section3/eda356.htm",
    );
    expect(madCalculatorConfig.sources[1].url).toContain(
      "openstax.org/books/introductory-statistics",
    );
  });

  it("exposes SoftwareApplication and BreadcrumbList shapes without FAQ or HowTo", () => {
    const softwareSchema = getMadSoftwareApplicationSchema();
    expect(softwareSchema["@type"]).toBe("SoftwareApplication");
    expect(JSON.stringify(softwareSchema)).not.toMatch(/FAQPage|HowTo|AggregateRating|Review/);
  });
});

describe("homepage illustrative MAD example", () => {
  it("links to the published MAD calculator and avoids unlabeled spread ratings", () => {
    render(<ExamplePanel />);

    expect(
      screen
        .getByRole("link", {
          name: "Open the Mean Absolute Deviation Calculator",
        })
        .getAttribute("href"),
    ).toMatch(/\/calculators\/statistics\/mean-absolute-deviation\/?$/);

    const body = document.body.textContent ?? "";
    expect(body).not.toMatch(/moderate spread/i);
    expect(body).toMatch(
      /Values in this dataset are, on average, 2\.4 units away from the arithmetic mean of 14/,
    );
  });
});
