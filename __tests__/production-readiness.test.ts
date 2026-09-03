import { describe, expect, it } from "vitest";
import { getSitemapPaths } from "@/app/sitemap";
import robots from "@/app/robots";
import { absoluteUrl, publicRoutes } from "@/lib/routes";
import { siteConfig } from "@/lib/site-config";
import { getMadSoftwareApplicationSchema } from "@/lib/calculators/mean-absolute-deviation-schema";
import { madCalculatorConfig } from "@/lib/calculators/mean-absolute-deviation-config";
import { getOutlierIqrSoftwareApplicationSchema } from "@/lib/calculators/outlier-iqr-structured-data";
import { outlierIqrCalculatorConfig } from "@/lib/calculators/outlier-iqr-config";
import { getBreadcrumbSchema } from "@/lib/structured-data";
import { createPageMetadata } from "@/lib/metadata";
import { launchCandidates } from "@/lib/calculator-portfolio";
import { isCalculatorPublished } from "@/lib/published-calculators";

describe("production sitemap integrity", () => {
  it("includes each public route and the MAD route exactly once", () => {
    const paths = getSitemapPaths();
    const mad = "/calculators/statistics/mean-absolute-deviation/";

    expect(paths.filter((path) => path === mad)).toHaveLength(1);
    expect(paths).toHaveLength(12);
    expect(paths).toContain("/calculators/statistics/");

    for (const route of publicRoutes) {
      expect(paths).toContain(route.path);
    }
  });

  it("excludes unpublished calculator routes and 404", () => {
    const paths = getSitemapPaths();

    expect(paths).not.toContain("/404/");
    expect(paths).not.toContain("/_not-found/");

    for (const calculator of launchCandidates) {
      if (isCalculatorPublished(calculator.slug)) {
        continue;
      }
      expect(paths).not.toContain(`/calculators/statistics/${calculator.slug}/`);
    }
  });

  it("builds HTTPS production URLs with trailing slashes", () => {
    for (const path of getSitemapPaths()) {
      const url = absoluteUrl(path);
      expect(url.startsWith("https://calclume.com")).toBe(true);
      expect(url).not.toMatch(/localhost/i);
      if (path !== "/") {
        expect(url.endsWith("/")).toBe(true);
      }
    }
  });
});

describe("production robots", () => {
  it("allows crawling and references the production sitemap", () => {
    const result = robots();
    expect(result.sitemap).toBe("https://calclume.com/sitemap.xml");
    expect(result.rules).toMatchObject({
      userAgent: "*",
      allow: "/",
    });
  });
});

describe("production privacy configuration", () => {
  it("reflects no analytics, ads, accounts, or transmitted calculator data", () => {
    expect(siteConfig.privacy).toEqual({
      analyticsEnabled: false,
      advertisingEnabled: false,
      affiliateLinksEnabled: false,
      accountsEnabled: false,
      calculatorInputsTransmitted: false,
      calculatorInputsStored: false,
      functionalCookiesSetByApp: false,
    });
  });

  it("documents that the OG image is not yet configured", () => {
    expect(siteConfig.openGraphImage).toBeNull();
  });
});

describe("MAD production structured data", () => {
  it("produces parseable JSON-LD without ratings, reviews, FAQ, or HowTo", () => {
    const schema = getMadSoftwareApplicationSchema();
    const serialized = JSON.stringify(schema);
    const parsed = JSON.parse(serialized);

    expect(parsed["@type"]).toBe("SoftwareApplication");
    expect(parsed.url).toBe(
      "https://calclume.com/calculators/statistics/mean-absolute-deviation/",
    );
    expect(parsed.name).toBe(madCalculatorConfig.name);
    expect(parsed.applicationCategory).toBe("EducationalApplication");
    expect(parsed.operatingSystem).toBe("Web browser");
    expect(parsed.offers).toEqual({
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    });
    expect(serialized).not.toMatch(
      /FAQPage|HowTo|AggregateRating|Review|author|downloadUrl|installUrl/i,
    );
  });

  it("builds BreadcrumbList for the real MAD route", () => {
    const schema = getBreadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Calculators", path: "/calculators/" },
      { name: "Statistics", path: "/calculators/statistics/" },
      {
        name: "Mean Absolute Deviation",
        path: madCalculatorConfig.path,
      },
    ]);

    expect(schema?.["@type"]).toBe("BreadcrumbList");
    expect(schema?.itemListElement).toHaveLength(4);
    expect(schema?.itemListElement.at(-1)?.item).toBe(
      "https://calclume.com/calculators/statistics/mean-absolute-deviation/",
    );
  });
});

describe("Outlier/IQR production structured data", () => {
  it("produces parseable JSON-LD without ratings, reviews, FAQ, or HowTo", () => {
    const schema = getOutlierIqrSoftwareApplicationSchema();
    const serialized = JSON.stringify(schema);
    const parsed = JSON.parse(serialized);

    expect(parsed["@type"]).toBe("SoftwareApplication");
    expect(parsed.url).toBe(
      "https://calclume.com/calculators/statistics/outlier-iqr/",
    );
    expect(parsed.name).toBe(outlierIqrCalculatorConfig.name);
    expect(serialized).not.toMatch(
      /FAQPage|HowTo|AggregateRating|Review|author|downloadUrl|installUrl/i,
    );
  });

  it("builds BreadcrumbList for the Outlier/IQR route", () => {
    const schema = getBreadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Calculators", path: "/calculators/" },
      { name: "Statistics", path: "/calculators/statistics/" },
      {
        name: "Outlier and IQR",
        path: outlierIqrCalculatorConfig.path,
      },
    ]);

    expect(schema?.["@type"]).toBe("BreadcrumbList");
    expect(schema?.itemListElement.at(-1)?.item).toBe(
      "https://calclume.com/calculators/statistics/outlier-iqr/",
    );
  });
});

describe("public route metadata contract", () => {
  it("assigns unique production titles and descriptions for core pages", () => {
    const pages = [
      {
        title: "Home",
        description:
          "CalcLume provides clear, transparent calculators that show your answer, the formula, each step, and a plain-language interpretation.",
        path: "/",
      },
      {
        title: "Mean Absolute Deviation Calculator",
        description: madCalculatorConfig.description,
        path: madCalculatorConfig.path,
      },
      {
        title: "Privacy Policy",
        description:
          "How CalcLume handles your data today: no accounts, no analytics or ads, and calculator inputs that stay in your browser.",
        path: "/privacy/",
      },
    ] as const;

    const titles = new Set<string>();
    const descriptions = new Set<string>();

    for (const page of pages) {
      const metadata = createPageMetadata(page);
      titles.add(String(metadata.title));
      descriptions.add(String(metadata.description));
      expect(JSON.stringify(metadata)).not.toMatch(/localhost/i);
      expect(String(metadata.alternates?.canonical)).toMatch(/^https:\/\/calclume\.com/);
    }

    expect(titles.size).toBe(pages.length);
    expect(descriptions.size).toBe(pages.length);
  });
});
