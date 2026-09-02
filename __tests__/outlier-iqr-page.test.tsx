import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { OutlierIqrEducationalContent } from "@/components/calculators/outlier-iqr/OutlierIqrEducationalContent";
import { createPageMetadata } from "@/lib/metadata";
import { outlierIqrCalculatorConfig } from "@/lib/calculators/outlier-iqr-config";
import { outlierIqrEducationalExample } from "@/lib/calculators/outlier-iqr-educational-example";
import { getOutlierIqrSoftwareApplicationSchema } from "@/lib/calculators/outlier-iqr-structured-data";

afterEach(() => {
  cleanup();
});

const requiredHeadings = [
  "What is the interquartile range?",
  "What is an outlier?",
  "IQR formula",
  "How IQR fences work",
  "How to calculate IQR and outliers",
  "Worked example",
  "Five-number summary explained",
  "How to read the box plot",
  "Why quartile methods can disagree",
  "IQR versus mean absolute deviation",
  "IQR versus standard deviation",
  "When IQR is useful",
  "Limitations",
] as const;

describe("outlier and IQR page metadata", () => {
  it("sets unique title, description, and canonical URL", () => {
    const metadata = createPageMetadata({
      title: "Outlier & IQR Calculator with Box Plot",
      description: outlierIqrCalculatorConfig.description,
      path: outlierIqrCalculatorConfig.path,
    });

    expect(metadata.title).toBe(
      "Outlier & IQR Calculator with Box Plot | CalcLume",
    );
    expect(metadata.description).toMatch(/Q1, median, Q3, and IQR/i);
    expect(metadata.description).toMatch(/quartile method/i);
    expect(metadata.alternates?.canonical).toBe(
      "https://calclume.com/calculators/statistics/outlier-iqr/",
    );
    expect(metadata.robots).toEqual({ index: true, follow: true });
  });
});

describe("OutlierIqrEducationalContent", () => {
  it("renders the required educational headings in order", () => {
    render(<OutlierIqrEducationalContent />);

    const headings = screen
      .getAllByRole("heading", { level: 2 })
      .map((heading) => heading.textContent);

    expect(headings).toEqual([...requiredHeadings]);
  });

  it("includes the F02 worked example values from the engine", () => {
    render(<OutlierIqrEducationalContent />);

    const content = document.body.textContent ?? "";
    expect(content).toContain(outlierIqrEducationalExample.input);
    expect(content).toContain(outlierIqrEducationalExample.q1);
    expect(content).toContain(outlierIqrEducationalExample.median);
    expect(content).toContain(outlierIqrEducationalExample.q3);
    expect(content).toContain(outlierIqrEducationalExample.iqr);
    expect(content).toContain(outlierIqrEducationalExample.lowerFence);
    expect(content).toContain(outlierIqrEducationalExample.upperFence);
    expect(content).toContain(outlierIqrEducationalExample.lowerWhisker);
    expect(content).toContain(outlierIqrEducationalExample.upperWhisker);
    expect(content).toContain("#10: 100");
  });

  it("shows the engine fence formulas", () => {
    render(<OutlierIqrEducationalContent />);

    expect(
      screen.getByText(/Lower fence = Q1 − k × IQR/),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Upper fence = Q3 \+ k × IQR/),
    ).toBeInTheDocument();
  });

  it("links to the published MAD calculator and methodology pages", () => {
    render(<OutlierIqrEducationalContent />);

    expect(
      screen
        .getByRole("link", { name: /Mean absolute deviation \(MAD\)/i })
        .getAttribute("href"),
    ).toMatch(/\/calculators\/statistics\/mean-absolute-deviation\/?$/);
    expect(
      screen.getByRole("link", { name: "methodology" }).getAttribute("href"),
    ).toMatch(/\/methodology\/?$/);
    expect(
      screen.getByRole("link", { name: "sources" }).getAttribute("href"),
    ).toMatch(/\/sources\/?$/);
  });

  it("does not promise automatic outlier removal", () => {
    render(<OutlierIqrEducationalContent />);
    const content = document.body.textContent ?? "";

    expect(content).toMatch(/not.*remove/i);
    expect(content).not.toMatch(/delete these points/i);
  });
});

describe("Outlier/IQR sources and structured data policy", () => {
  it("lists verified source URLs", () => {
    expect(outlierIqrCalculatorConfig.sources).toHaveLength(3);

    for (const source of outlierIqrCalculatorConfig.sources) {
      expect(source.url).toMatch(/^https:\/\//);
      expect(source.title.length).toBeGreaterThan(0);
      expect(source.note?.length).toBeGreaterThan(0);
    }

    expect(outlierIqrCalculatorConfig.sources[0].url).toContain(
      "itl.nist.gov/div898/handbook/prc/section1/prc16.htm",
    );
  });

  it("exposes SoftwareApplication without FAQ, HowTo, or ratings", () => {
    const softwareSchema = getOutlierIqrSoftwareApplicationSchema();
    expect(softwareSchema["@type"]).toBe("SoftwareApplication");
    expect(JSON.stringify(softwareSchema)).not.toMatch(
      /FAQPage|HowTo|AggregateRating|Review/,
    );
    expect(softwareSchema.url).toBe(
      "https://calclume.com/calculators/statistics/outlier-iqr/",
    );
  });
});
