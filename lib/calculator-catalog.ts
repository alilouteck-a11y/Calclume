/**
 * Unified calculator catalog — sole manually maintained source of calculator metadata.
 * Server-safe and build-time safe. No React, browser APIs, or client directives.
 *
 * Category metadata lives in `lib/calculator-categories.ts`.
 * Category publication/indexation helpers live in `lib/calculator-category-publication.ts`.
 */

import {
  calculatorCategories,
  getCategoryById,
  type CategoryDefinition,
  type CategoryId,
} from "@/lib/calculator-categories";

export type { CategoryId, CategoryDefinition };
export type CategoryRecord = CategoryDefinition;

/** @deprecated Prefer importing from `lib/calculator-categories`. Kept for compatibility. */
export const categories = calculatorCategories;

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

export type CatalogCategory = (typeof calculatorCategories)[number];

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
  return getCategoryById(id);
}

export function isCategoryIndexable(categoryId: CategoryId): boolean {
  const category = findCategoryById(categoryId);
  if (!category) {
    return false;
  }
  const publishedCount = getPublishedCalculatorsByCategory(categoryId).length;
  return publishedCount >= category.minimumPublishedCalculators;
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

export type CategoryWithPublishedCalculators = {
  readonly category: CategoryRecord;
  readonly calculators: readonly CalculatorRecord[];
};

export type CategoryCollectionSummary = {
  readonly category: CategoryRecord;
  readonly publishedCount: number;
  readonly totalCount: number;
  readonly preparationCount: number;
  readonly collectionRoute: `/calculators/${CategoryId}/`;
};

export function getCategoryCollectionRoute(
  categoryId: CategoryId,
): `/calculators/${CategoryId}/` {
  return `/calculators/${categoryId}/`;
}

/** Derived counts for a category collection — no hard-coded numbers. */
export function getCategoryCollectionSummary(
  categoryId: CategoryId,
): CategoryCollectionSummary | undefined {
  const category = findCategoryById(categoryId);
  if (!category) {
    return undefined;
  }

  const totalCount = getCalculatorsByCategory(categoryId).length;
  if (totalCount === 0) {
    return undefined;
  }

  const publishedCount = getPublishedCalculatorsByCategory(categoryId).length;

  return {
    category,
    publishedCount,
    totalCount,
    preparationCount: totalCount - publishedCount,
    collectionRoute: getCategoryCollectionRoute(categoryId),
  };
}

/** Categories with at least one published calculator — homepage browse summaries. */
export function getCategorySummariesWithPublishedTools(): readonly CategoryCollectionSummary[] {
  return categories
    .map((category) => getCategoryCollectionSummary(category.id))
    .filter(
      (summary): summary is CategoryCollectionSummary =>
        summary !== undefined && summary.publishedCount > 0,
    );
}

/** Categories with catalog inventory that are public hubs — directory collections. */
export function getCategorySummariesWithCatalogTools(): readonly CategoryCollectionSummary[] {
  return categories
    .filter((category) => isCategoryIndexable(category.id))
    .map((category) => getCategoryCollectionSummary(category.id))
    .filter((summary): summary is CategoryCollectionSummary => summary !== undefined);
}

/** Categories that have at least one published calculator, stable catalog order. */
export function getCategoriesWithPublishedCalculators(): readonly CategoryWithPublishedCalculators[] {
  const groups: CategoryWithPublishedCalculators[] = [];

  for (const category of categories) {
    const publishedInCategory = getPublishedCalculatorsByCategory(category.id);
    if (publishedInCategory.length > 0) {
      groups.push({ category, calculators: publishedInCategory });
    }
  }

  return groups;
}

/** Editorial featured published tools; falls back to all published (max 4). */
export function getFeaturedPublishedCalculators(): readonly CalculatorRecord[] {
  const published = getPublishedCalculators();
  const featured = published.filter((entry) => entry.featured);
  const list = featured.length > 0 ? featured : published;

  return [...list]
    .sort((left, right) => {
      if (left.publishedAt && right.publishedAt) {
        const byDate = right.publishedAt.localeCompare(left.publishedAt);
        if (byDate !== 0) {
          return byDate;
        }
      }
      return left.name.localeCompare(right.name);
    })
    .slice(0, 4);
}

/** Recently added published tools sorted by publishedAt desc (max 4). */
export function getRecentlyAddedPublishedCalculators(): readonly CalculatorRecord[] {
  return getPublishedCalculators()
    .filter((entry) => entry.recentlyAddedEligible)
    .sort((left, right) => {
      if (!left.publishedAt || !right.publishedAt) {
        return 0;
      }
      return right.publishedAt.localeCompare(left.publishedAt);
    })
    .slice(0, 4);
}

/** True when Browse/Categories nav item should appear (≥2 categories with published tools). */
export function shouldShowBrowseNavigation(): boolean {
  const categoryIds = new Set(
    getPublishedCalculators().map((entry) => entry.categoryId),
  );
  return categoryIds.size >= 2;
}

/** Browse nav target per Navigation V2 contract. */
export function getBrowseNavigationLink(): { label: string; href: string } | null {
  if (!shouldShowBrowseNavigation()) {
    return null;
  }

  const indexableCount = categories.filter((category) =>
    isCategoryIndexable(category.id),
  ).length;

  return {
    label: indexableCount >= 2 ? "Categories" : "Browse",
    href: "/calculators/#categories",
  };
}
