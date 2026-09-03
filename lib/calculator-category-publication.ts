/**
 * Derived category publication and indexation helpers.
 * Pure functions over the category registry + calculator catalog.
 */

import {
  DEFAULT_CATEGORY_INDEX_THRESHOLD,
  getAllCategories,
  getCategoryById,
  getCategoryBySlug,
  type CategoryDefinition,
  type CategoryId,
} from "@/lib/calculator-categories";
import {
  getCalculatorsByCategory,
  getPublishedCalculatorsByCategory,
  isPublished,
  type CalculatorRecord,
} from "@/lib/calculator-catalog";

export type CategorySummary = {
  readonly category: CategoryDefinition;
  readonly totalCount: number;
  readonly publishedCount: number;
  readonly preparationCount: number;
  readonly publishedCalculators: readonly CalculatorRecord[];
  readonly preparationCalculators: readonly CalculatorRecord[];
  readonly expansionCalculators: readonly CalculatorRecord[];
  readonly isVisible: boolean;
  readonly isPublic: boolean;
  readonly isIndexable: boolean;
  readonly isSitemapEligible: boolean;
};

export function getCalculatorsForCategory(
  categoryId: CategoryId,
): readonly CalculatorRecord[] {
  return getCalculatorsByCategory(categoryId);
}

export function getPublishedCalculatorsForCategory(
  categoryId: CategoryId,
): readonly CalculatorRecord[] {
  return getPublishedCalculatorsByCategory(categoryId);
}

/**
 * Indexability uses the category's configured minimum (3 by default;
 * Statistics grandfather uses 2 via registry `minimumPublishedCalculators`).
 */
export function isCategoryIndexable(
  categoryId: CategoryId,
  options?: { publishedCount?: number; minimumPublishedCalculators?: number },
): boolean {
  const category = getCategoryById(categoryId);
  if (!category) {
    return false;
  }

  const publishedCount =
    options?.publishedCount ?? getPublishedCalculatorsForCategory(categoryId).length;
  const threshold =
    options?.minimumPublishedCalculators ?? category.minimumPublishedCalculators;

  if (publishedCount <= 0) {
    return false;
  }

  return publishedCount >= threshold;
}

/** Visible in homepage browse when ≥1 published calculator exists. */
export function isCategoryVisible(categoryId: CategoryId): boolean {
  return getPublishedCalculatorsForCategory(categoryId).length > 0;
}

/**
 * Public/navigable category hubs — same gate as indexable.
 * Empty and planned-only categories never receive public routes.
 */
export function isCategoryPublic(categoryId: CategoryId): boolean {
  return isCategoryIndexable(categoryId);
}

export function isCategorySitemapEligible(categoryId: CategoryId): boolean {
  return isCategoryIndexable(categoryId);
}

export function getCategorySummary(categoryId: CategoryId): CategorySummary | undefined {
  const category = getCategoryById(categoryId);
  if (!category) {
    return undefined;
  }

  const all = getCalculatorsForCategory(categoryId);
  const publishedCalculators = all.filter(isPublished);
  const preparationCalculators = all.filter(
    (entry) => entry.status === "launch-candidate",
  );
  const expansionCalculators = all.filter(
    (entry) => entry.status === "expansion-candidate",
  );
  const publishedCount = publishedCalculators.length;
  const totalCount = all.length;
  const indexable = isCategoryIndexable(categoryId, { publishedCount });

  return {
    category,
    totalCount,
    publishedCount,
    preparationCount: totalCount - publishedCount,
    publishedCalculators,
    preparationCalculators,
    expansionCalculators,
    isVisible: publishedCount > 0,
    isPublic: indexable,
    isIndexable: indexable,
    isSitemapEligible: indexable,
  };
}

export function getVisibleCategories(): readonly CategoryDefinition[] {
  return getAllCategories().filter((category) => isCategoryVisible(category.id));
}

export function getPublicCategories(): readonly CategoryDefinition[] {
  return getAllCategories().filter((category) => isCategoryPublic(category.id));
}

export function getIndexableCategories(): readonly CategoryDefinition[] {
  return getAllCategories().filter((category) => isCategoryIndexable(category.id));
}

export function getSitemapEligibleCategoryRoutes(): readonly string[] {
  return getIndexableCategories().map((category) => category.route);
}

/**
 * Dynamic `[category]` static params — public categories only.
 * Dedicated filesystem routes (e.g. statistics/) should be excluded by the caller
 * when both a static folder and a dynamic segment exist.
 */
export function getPublicCategoryStaticParams(
  options?: { excludeIds?: readonly CategoryId[] },
): readonly { category: CategoryId }[] {
  const excluded = new Set(options?.excludeIds ?? []);
  return getPublicCategories()
    .filter((category) => !excluded.has(category.id))
    .map((category) => ({ category: category.slug }));
}

/** Simulate indexability for tests without mutating the production catalog. */
export function wouldCategoryBeIndexable(
  categoryId: CategoryId,
  publishedCount: number,
  minimumPublishedCalculators: number = DEFAULT_CATEGORY_INDEX_THRESHOLD,
): boolean {
  return isCategoryIndexable(categoryId, {
    publishedCount,
    minimumPublishedCalculators,
  });
}

export { getCategoryById, getCategoryBySlug, getAllCategories };
