import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { getSitemapPaths } from "@/app/sitemap";
import robots from "@/app/robots";
import CalculatorsPage from "@/app/calculators/page";
import { CategoryCollectionPage } from "@/components/category/CategoryCollectionPage";
import HomePage from "@/app/page";
import { OutlierIqrEducationalContent } from "@/components/calculators/outlier-iqr/OutlierIqrEducationalContent";
import { createPageMetadata } from "@/lib/metadata";
import { launchCandidates } from "@/lib/calculator-portfolio";
import { madCalculatorConfig } from "@/lib/calculators/mean-absolute-deviation-config";
import { outlierIqrCalculatorConfig } from "@/lib/calculators/outlier-iqr-config";
import { outlierIqrEducationalExample } from "@/lib/calculators/outlier-iqr-educational-example";
import { getOutlierIqrSoftwareApplicationSchema } from "@/lib/calculators/outlier-iqr-structured-data";
import {
  isCalculatorPublished,
  publishedCalculatorRoutes,
} from "@/lib/published-calculators";
import { getBreadcrumbSchema } from "@/lib/structured-data";

afterEach(() => {
  cleanup();
});

describe("Outlier/IQR publication registry", () => {
  it("publishes MAD and Outlier/IQR exactly once in the registry", () => {
    expect(publishedCalculatorRoutes).toEqual([
      madCalculatorConfig.path,
      outlierIqrCalculatorConfig.path,
    ]);
    expect(new Set(publishedCalculatorRoutes).size).toBe(2);
  });

  it("does not publish a separate five-number-summary route", () => {
    for (const route of publishedCalculatorRoutes) {
      expect(route).not.toMatch(/five-number-summary/);
    }
    expect(
      launchCandidates.some((calculator) =>
        calculator.slug.includes("five-number-summary"),
      ),
    ).toBe(false);
  });
});

describe("Outlier/IQR sitemap contract", () => {
  it("contains exactly twelve approved HTTPS URLs", () => {
    const paths = getSitemapPaths();
    expect(paths).toHaveLength(12);
    expect(paths).toContain("/calculators/statistics/");
    expect(paths.filter((path) => path === outlierIqrCalculatorConfig.path)).toHaveLength(
      1,
    );
    expect(paths.filter((path) => path === madCalculatorConfig.path)).toHaveLength(1);
  });

  it("excludes unpublished calculator detail routes", () => {
    const paths = getSitemapPaths();

    for (const calculator of launchCandidates) {
      if (isCalculatorPublished(calculator.slug)) {
        continue;
      }
      expect(paths).not.toContain(`/calculators/statistics/${calculator.slug}/`);
    }
  });
});

describe("directory and homepage publication surfaces", () => {
  it("lists both published calculators with working links on /calculators/", () => {
    render(<CalculatorsPage />);

    expect(screen.getByRole("heading", { name: /available calculators/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /browse collections/i })).toBeInTheDocument();

    expect(
      screen.getByRole("link", { name: "Mean Absolute Deviation Calculator" }),
    ).toHaveAttribute("href", expect.stringMatching(/\/mean-absolute-deviation\/?$/));
    expect(
      screen.getByRole("link", { name: "Outlier and IQR Calculator" }),
    ).toHaveAttribute("href", expect.stringMatching(/\/outlier-iqr\/?$/));

    expect(screen.getAllByText("Available")).toHaveLength(2);
    expect(screen.getAllByRole("link", { name: "Open calculator" })).toHaveLength(2);
  });

  it("lists both published calculators on /calculators/statistics/ without a separate five-number card", () => {
    render(<CategoryCollectionPage categoryId="statistics" />);

    expect(
      screen.getByRole("link", {
        name: /Mean Absolute Deviation Calculator/i,
      }),
    ).toHaveAttribute("href", expect.stringMatching(/\/mean-absolute-deviation\/?$/));
    expect(
      screen.getByRole("link", {
        name: /Outlier and IQR Calculator/i,
      }),
    ).toHaveAttribute("href", expect.stringMatching(/\/outlier-iqr\/?$/));
    expect(screen.queryByText(/Five Number Summary and Box Plot/i)).not.toBeInTheDocument();
  });

  it("reflects two published calculators on the homepage without exaggeration", () => {
    render(<HomePage />);

    expect(
      screen.getByRole("heading", { name: /featured calculators/i }),
    ).toBeInTheDocument();
    expect(
      screen.getAllByRole("link", { name: /open calculator/i }).length,
    ).toBeGreaterThanOrEqual(2);
    expect(screen.queryByText(/Five Number Summary/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/popular calculators/i)).not.toBeInTheDocument();
  });
});

describe("Outlier/IQR metadata and structured data", () => {
  it("uses production metadata without keywords or fake OG images", () => {
    const metadata = createPageMetadata({
      title: "Outlier & IQR Calculator with Box Plot",
      description: outlierIqrCalculatorConfig.description,
      path: outlierIqrCalculatorConfig.path,
    });

    expect(metadata.title).toBe("Outlier & IQR Calculator with Box Plot | CalcLume");
    expect(metadata.robots).toEqual({ index: true, follow: true });
    expect(metadata.alternates?.canonical).toBe(
      "https://calclume.com/calculators/statistics/outlier-iqr/",
    );
    expect(String(metadata.openGraph?.title)).toContain("Outlier & IQR Calculator");
    expect(String(metadata.twitter?.title)).toContain("Outlier & IQR Calculator");
    expect(JSON.stringify(metadata)).not.toMatch(/localhost/i);
    expect(metadata).not.toHaveProperty("keywords");
    expect(metadata.openGraph?.images).toBeUndefined();
  });

  it("includes BreadcrumbList and factual SoftwareApplication only", () => {
    const breadcrumbs = getBreadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Calculators", path: "/calculators/" },
      { name: "Statistics", path: "/calculators/statistics/" },
      { name: "Outlier and IQR", path: outlierIqrCalculatorConfig.path },
    ]);
    const software = getOutlierIqrSoftwareApplicationSchema();
    const serialized = JSON.stringify({ breadcrumbs, software });

    expect(breadcrumbs?.["@type"]).toBe("BreadcrumbList");
    expect(software["@type"]).toBe("SoftwareApplication");
    expect(software.offers).toEqual({
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    });
    expect(serialized).not.toMatch(
      /FAQPage|HowTo|AggregateRating|Review|downloadUrl|installUrl|award/i,
    );
  });
});

describe("Outlier/IQR educational worked example (F02)", () => {
  it("displays engine-verified F02 values in the worked example", () => {
    render(<OutlierIqrEducationalContent />);
    const content = document.body.textContent ?? "";

    expect(content).toContain(outlierIqrEducationalExample.input);
    expect(content).toContain(`Q1 = ${outlierIqrEducationalExample.q1}`);
    expect(content).toContain(`Median = ${outlierIqrEducationalExample.median}`);
    expect(content).toContain(`Q3 = ${outlierIqrEducationalExample.q3}`);
    expect(content).toContain(`= ${outlierIqrEducationalExample.iqr}`);
    expect(content).toContain(outlierIqrEducationalExample.lowerFence);
    expect(content).toContain(outlierIqrEducationalExample.upperFence);
    expect(content).toContain(outlierIqrEducationalExample.lowerWhisker);
    expect(content).toContain(outlierIqrEducationalExample.upperWhisker);
    expect(content).toContain("#10: 100");
    expect(content).toMatch(/exclusive-halves/i);
    expect(content).toMatch(/1\.5/);
  });
});

describe("Outlier/IQR static export artifacts", () => {
  it("exports production HTML without localhost or staging references", () => {
    const htmlPath = join(
      process.cwd(),
      "out/calculators/statistics/outlier-iqr/index.html",
    );
    const madHtmlPath = join(
      process.cwd(),
      "out/calculators/statistics/mean-absolute-deviation/index.html",
    );
    const html = readFileSync(htmlPath, "utf8");
    const madHtml = readFileSync(madHtmlPath, "utf8");

    expect(html).toContain("Outlier and IQR Calculator");
    expect(html).toContain("https://calclume.com/calculators/statistics/outlier-iqr/");
    expect(html).not.toMatch(/localhost|127\.0\.0\.1|staging/i);
    expect(madHtml).toContain("Mean Absolute Deviation Calculator");
    expect(robots().sitemap).toBe("https://calclume.com/sitemap.xml");
  });
});
