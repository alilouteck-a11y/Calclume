/**
 * Unified calculator catalog — sole manually maintained source of calculator metadata.
 * Server-safe and build-time safe. No React, browser APIs, or client directives.
 */

export type CategoryId =
  | "math"
  | "statistics"
  | "finance"
  | "business"
  | "everyday-life"
  | "date-time"
  | "conversions"
  | "construction"
  | "health"
  | "science";

export type CategoryRecord = {
  readonly id: CategoryId;
  readonly name: string;
  readonly description: string;
  /** Minimum published calculators before indexable category page */
  readonly minPublishedForIndex: number;
  readonly editorialRiskLevel: EditorialRiskLevel;
};

export type CalculatorStatus =
  | "published"
  | "launch-candidate"
  | "expansion-candidate"
  | "deferred"
  | "cancelled";

export type SearchIntent =
  | "calculate"
  | "explain"
  | "compare"
  | "convert";

export type EditorialRiskLevel = "low" | "medium" | "high";

export type CalculatorRecord = {
  readonly id: string;
  readonly name: string;
  readonly shortName: string;
  readonly slug: string;
  readonly categoryId: CategoryId;
  readonly route: `/calculators/${CategoryId}/${string}/`;
  readonly description: string;
  readonly status: CalculatorStatus;
  readonly primarySearchIntent: SearchIntent;
  /** Search-only synonyms — never create alias URLs. Stored normalized (lowercase, trimmed). */
  readonly searchAliases: readonly string[];
  readonly relatedCalculatorIds: readonly string[];
  /** ISO 8601 date (YYYY-MM-DD) when published; null otherwise */
  readonly publishedAt: string | null;
  /** ISO 8601 date (YYYY-MM-DD) when last reviewed; null when unpublished */
  readonly lastReviewedAt: string | null;
  readonly sitemapEligible: boolean;
  readonly featured: boolean;
  readonly recentlyAddedEligible: boolean;
  readonly editorialRiskLevel: EditorialRiskLevel;
};

export const categories = [
  {
    id: "math",
    name: "Math",
    description:
      "Arithmetic, algebra, and general mathematical tools with transparent steps.",
    minPublishedForIndex: 3,
    editorialRiskLevel: "low",
  },
  {
    id: "statistics",
    name: "Statistics",
    description:
      "Descriptive and exploratory statistics tools with formulas and interpretation.",
    minPublishedForIndex: 2,
    editorialRiskLevel: "medium",
  },
  {
    id: "finance",
    name: "Finance",
    description:
      "Personal and small-business financial calculations with documented assumptions.",
    minPublishedForIndex: 3,
    editorialRiskLevel: "high",
  },
  {
    id: "business",
    name: "Business",
    description:
      "Operational metrics such as margins and break-even with clear definitions.",
    minPublishedForIndex: 3,
    editorialRiskLevel: "medium",
  },
  {
    id: "everyday-life",
    name: "Everyday Life",
    description: "Practical daily calculators for tips, splits, and simple estimates.",
    minPublishedForIndex: 3,
    editorialRiskLevel: "low",
  },
  {
    id: "date-time",
    name: "Date & Time",
    description: "Calendar duration and date arithmetic with documented assumptions.",
    minPublishedForIndex: 3,
    editorialRiskLevel: "medium",
  },
  {
    id: "conversions",
    name: "Conversions",
    description: "Unit conversions with cited factors and transparent formulas.",
    minPublishedForIndex: 3,
    editorialRiskLevel: "medium",
  },
  {
    id: "construction",
    name: "Construction",
    description: "Material and geometry estimates — deferred pending editorial capacity.",
    minPublishedForIndex: 3,
    editorialRiskLevel: "high",
  },
  {
    id: "health",
    name: "Health",
    description: "Health-related calculators — deferred until YMYL review process matures.",
    minPublishedForIndex: 3,
    editorialRiskLevel: "high",
  },
  {
    id: "science",
    name: "Science",
    description: "Physics and chemistry calculations with documented constants and units.",
    minPublishedForIndex: 3,
    editorialRiskLevel: "medium",
  },
] as const satisfies readonly CategoryRecord[];

export type CatalogCategory = (typeof categories)[number];

/**
 * Sole manually maintained calculator metadata.
 * Order of published entries defines derived sitemap / published route order.
 */
export const calculatorCatalog = [
  {
    id: "statistics-mad",
    name: "Mean Absolute Deviation Calculator",
    shortName: "MAD Calculator",
    slug: "mean-absolute-deviation",
    categoryId: "statistics",
    route: "/calculators/statistics/mean-absolute-deviation/",
    description:
      "Measure average distance from the mean with formula and step-by-step working.",
    status: "published",
    primarySearchIntent: "calculate",
    searchAliases: [
      "mean absolute deviation",
      "mad calculator",
      "average absolute deviation",
    ],
    relatedCalculatorIds: [
      "statistics-outlier-iqr",
      "statistics-cv",
      "statistics-sem",
      "statistics-critical-value",
    ],
    publishedAt: "2026-08-31",
    lastReviewedAt: "2026-08-31",
    sitemapEligible: true,
    featured: true,
    recentlyAddedEligible: false,
    editorialRiskLevel: "low",
  },
  {
    id: "statistics-outlier-iqr",
    name: "Outlier and IQR Calculator",
    shortName: "Outlier & IQR",
    slug: "outlier-iqr",
    categoryId: "statistics",
    route: "/calculators/statistics/outlier-iqr/",
    description:
      "Identify outliers using the interquartile range method with transparent steps.",
    status: "published",
    primarySearchIntent: "calculate",
    searchAliases: [
      "outlier calculator",
      "iqr calculator",
      "interquartile range calculator",
      "box plot calculator",
    ],
    relatedCalculatorIds: [
      "statistics-mad",
      "statistics-cv",
      "statistics-sem",
      "statistics-critical-value",
    ],
    publishedAt: "2026-09-02",
    lastReviewedAt: "2026-09-02",
    sitemapEligible: true,
    featured: true,
    recentlyAddedEligible: true,
    editorialRiskLevel: "low",
  },
  {
    id: "statistics-cv",
    name: "Coefficient of Variation Calculator",
    shortName: "CV Calculator",
    slug: "coefficient-of-variation",
    categoryId: "statistics",
    route: "/calculators/statistics/coefficient-of-variation/",
    description:
      "Compare relative variability across datasets using CV with clear interpretation.",
    status: "launch-candidate",
    primarySearchIntent: "calculate",
    searchAliases: ["coefficient of variation", "cv calculator"],
    relatedCalculatorIds: ["statistics-mad", "statistics-sem"],
    publishedAt: null,
    lastReviewedAt: null,
    sitemapEligible: false,
    featured: false,
    recentlyAddedEligible: false,
    editorialRiskLevel: "low",
  },
  {
    id: "statistics-sem",
    name: "Standard Error Calculator",
    shortName: "SEM Calculator",
    slug: "standard-error",
    categoryId: "statistics",
    route: "/calculators/statistics/standard-error/",
    description:
      "Calculate standard error of the mean with formula breakdown and context.",
    status: "launch-candidate",
    primarySearchIntent: "calculate",
    searchAliases: ["standard error", "sem calculator", "standard error of the mean"],
    relatedCalculatorIds: ["statistics-cv", "statistics-ci"],
    publishedAt: null,
    lastReviewedAt: null,
    sitemapEligible: false,
    featured: false,
    recentlyAddedEligible: false,
    editorialRiskLevel: "low",
  },
  {
    id: "statistics-critical-value",
    name: "Critical Value Calculator",
    shortName: "Critical Value",
    slug: "critical-value",
    categoryId: "statistics",
    route: "/calculators/statistics/critical-value/",
    description:
      "Find critical values for common distributions with documented methodology.",
    status: "launch-candidate",
    primarySearchIntent: "calculate",
    searchAliases: ["critical value calculator"],
    relatedCalculatorIds: ["statistics-ci", "statistics-sem"],
    publishedAt: null,
    lastReviewedAt: null,
    sitemapEligible: false,
    featured: false,
    recentlyAddedEligible: false,
    editorialRiskLevel: "medium",
  },
  {
    id: "statistics-ci",
    name: "Confidence Interval Calculator",
    shortName: "Confidence Interval",
    slug: "confidence-interval",
    categoryId: "statistics",
    route: "/calculators/statistics/confidence-interval/",
    description:
      "Build confidence intervals around sample statistics with full working shown.",
    status: "expansion-candidate",
    primarySearchIntent: "calculate",
    searchAliases: ["confidence interval calculator"],
    relatedCalculatorIds: ["statistics-sem", "statistics-critical-value"],
    publishedAt: null,
    lastReviewedAt: null,
    sitemapEligible: false,
    featured: false,
    recentlyAddedEligible: false,
    editorialRiskLevel: "medium",
  },
  {
    id: "statistics-p-value",
    name: "P-Value Calculator",
    shortName: "P-Value",
    slug: "p-value",
    categoryId: "statistics",
    route: "/calculators/statistics/p-value/",
    description:
      "Compute p-values for common test scenarios with step-by-step explanation.",
    status: "expansion-candidate",
    primarySearchIntent: "calculate",
    searchAliases: ["p value calculator", "pvalue calculator"],
    relatedCalculatorIds: ["statistics-critical-value", "statistics-ci"],
    publishedAt: null,
    lastReviewedAt: null,
    sitemapEligible: false,
    featured: false,
    recentlyAddedEligible: false,
    editorialRiskLevel: "medium",
  },
  {
    id: "statistics-sample-size",
    name: "Sample Size Calculator",
    shortName: "Sample Size",
    slug: "sample-size",
    categoryId: "statistics",
    route: "/calculators/statistics/sample-size/",
    description: "Estimate required sample sizes for common study designs.",
    status: "expansion-candidate",
    primarySearchIntent: "calculate",
    searchAliases: ["sample size calculator"],
    relatedCalculatorIds: ["statistics-ci", "statistics-sem"],
    publishedAt: null,
    lastReviewedAt: null,
    sitemapEligible: false,
    featured: false,
    recentlyAddedEligible: false,
    editorialRiskLevel: "medium",
  },
  {
    id: "statistics-linear-regression",
    name: "Linear Regression Calculator",
    shortName: "Linear Regression",
    slug: "linear-regression",
    categoryId: "statistics",
    route: "/calculators/statistics/linear-regression/",
    description:
      "Fit a simple linear model with slope, intercept, and diagnostic steps.",
    status: "expansion-candidate",
    primarySearchIntent: "calculate",
    searchAliases: ["linear regression calculator"],
    relatedCalculatorIds: ["statistics-mad", "statistics-cv"],
    publishedAt: null,
    lastReviewedAt: null,
    sitemapEligible: false,
    featured: false,
    recentlyAddedEligible: false,
    editorialRiskLevel: "medium",
  },
] as const satisfies readonly CalculatorRecord[];

export type CatalogCalculator = (typeof calculatorCatalog)[number];

/** Catalog publication predicate (fail-closed). Does not verify filesystem pages. */
export function isPublished(record: CalculatorRecord): boolean {
  return (
    record.status === "published" &&
    record.sitemapEligible &&
    record.publishedAt !== null
  );
}

export function getAllCalculators(): readonly CalculatorRecord[] {
  return calculatorCatalog;
}

export function getPublishedCalculators(): readonly CalculatorRecord[] {
  return calculatorCatalog.filter(isPublished);
}

export function getCalculatorsByCategory(
  categoryId: CategoryId,
): readonly CalculatorRecord[] {
  return calculatorCatalog.filter((entry) => entry.categoryId === categoryId);
}

export function getPublishedCalculatorsByCategory(
  categoryId: CategoryId,
): readonly CalculatorRecord[] {
  return calculatorCatalog.filter(
    (entry) => entry.categoryId === categoryId && isPublished(entry),
  );
}

export function findCalculatorById(id: string): CalculatorRecord | undefined {
  return calculatorCatalog.find((entry) => entry.id === id);
}

export function findCalculatorByRoute(route: string): CalculatorRecord | undefined {
  return calculatorCatalog.find((entry) => entry.route === route);
}

export function findCalculatorBySlug(slug: string): CalculatorRecord | undefined {
  return calculatorCatalog.find((entry) => entry.slug === slug);
}

export function findCategoryById(id: CategoryId): CategoryRecord | undefined {
  return categories.find((entry) => entry.id === id);
}

export function isCategoryIndexable(categoryId: CategoryId): boolean {
  const category = findCategoryById(categoryId);
  if (!category) {
    return false;
  }
  const publishedCount = getPublishedCalculatorsByCategory(categoryId).length;
  return publishedCount >= category.minPublishedForIndex;
}

/**
 * Resolve related calculators from catalog IDs.
 * Omits missing IDs (fail-closed). Does not change publication status.
 */
export function resolveRelatedCalculators(
  record: CalculatorRecord,
): readonly CalculatorRecord[] {
  const seen = new Set<string>();
  const related: CalculatorRecord[] = [];

  for (const relatedId of record.relatedCalculatorIds) {
    if (relatedId === record.id || seen.has(relatedId)) {
      continue;
    }
    seen.add(relatedId);
    const match = findCalculatorById(relatedId);
    if (match) {
      related.push(match);
    }
  }

  return related;
}

/** Sitemap-eligible calculator routes — published + sitemapEligible. */
export function getSitemapEligibleCalculatorRoutes(): readonly string[] {
  return calculatorCatalog.filter(isPublished).map((entry) => entry.route);
}

export function isRoutePublished(route: string): boolean {
  const record = findCalculatorByRoute(route);
  return record !== undefined && isPublished(record);
}
