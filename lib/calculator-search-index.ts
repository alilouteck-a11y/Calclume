/**
 * Client-side calculator search index and ranking.
 * Server-safe — no React or browser APIs.
 */

import {
  findCategoryById,
  getPublishedCalculators,
  type CategoryId,
} from "@/lib/calculator-catalog";

export type SearchableCalculator = {
  readonly id: string;
  readonly name: string;
  readonly shortName: string;
  readonly slug: string;
  readonly route: string;
  readonly description: string;
  readonly categoryId: CategoryId;
  readonly categoryName: string;
  readonly searchAliases: readonly string[];
};

export const SEARCH_MIN_QUERY_LENGTH = 2;
export const SEARCH_MAX_RESULTS = 12;
export const SEARCH_DEBOUNCE_MS = 200;

export function normalizeSearchText(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/\s+/g, " ");
}

export function buildSearchIndex(): SearchableCalculator[] {
  return getPublishedCalculators().map((entry) => {
    const category = findCategoryById(entry.categoryId);
    return {
      id: entry.id,
      name: entry.name,
      shortName: entry.shortName,
      slug: entry.slug,
      route: entry.route,
      description: entry.description,
      categoryId: entry.categoryId,
      categoryName: category?.name ?? entry.categoryId,
      searchAliases: entry.searchAliases,
    };
  });
}

export function getSearchableCategoryFilters(
  index: readonly SearchableCalculator[],
): readonly { id: CategoryId | "all"; label: string }[] {
  const categoryIds = [...new Set(index.map((entry) => entry.categoryId))];

  if (categoryIds.length <= 1) {
    return [{ id: "all", label: "All categories" }];
  }

  return [
    { id: "all", label: "All categories" },
    ...categoryIds.map((categoryId) => ({
      id: categoryId,
      label: findCategoryById(categoryId)?.name ?? categoryId,
    })),
  ];
}

function scoreEntry(query: string, entry: SearchableCalculator): number {
  const normalizedName = normalizeSearchText(entry.name);
  const normalizedShortName = normalizeSearchText(entry.shortName);
  const normalizedDescription = normalizeSearchText(entry.description);
  const normalizedSlug = normalizeSearchText(entry.slug);
  const normalizedAliases = entry.searchAliases.map((alias) =>
    normalizeSearchText(alias),
  );

  if (normalizedName === query) {
    return 1000;
  }

  if (normalizedAliases.some((alias) => alias === query)) {
    return 900;
  }

  if (normalizedName.startsWith(query)) {
    return 800;
  }

  if (normalizedAliases.some((alias) => alias.startsWith(query))) {
    return 700;
  }

  if (normalizedName.includes(query)) {
    return 400;
  }

  if (normalizedShortName.includes(query)) {
    return 350;
  }

  if (normalizedDescription.includes(query)) {
    return 200;
  }

  if (normalizedSlug.startsWith(query)) {
    return 150;
  }

  return 0;
}

export function rankSearchResults(
  rawQuery: string,
  index: readonly SearchableCalculator[],
  categoryFilter: CategoryId | "all" = "all",
): SearchableCalculator[] {
  const query = normalizeSearchText(rawQuery);

  if (query.length < SEARCH_MIN_QUERY_LENGTH) {
    return [];
  }

  const filtered =
    categoryFilter === "all"
      ? index
      : index.filter((entry) => entry.categoryId === categoryFilter);

  return filtered
    .map((entry) => ({ entry, score: scoreEntry(query, entry) }))
    .filter(({ score }) => score > 0)
    .sort((left, right) => {
      if (right.score !== left.score) {
        return right.score - left.score;
      }
      return left.entry.name.localeCompare(right.entry.name);
    })
    .slice(0, SEARCH_MAX_RESULTS)
    .map(({ entry }) => entry);
}

export function getSearchStatusMessage(
  query: string,
  resultCount: number,
  categoryLabel?: string,
): string {
  const normalized = normalizeSearchText(query);

  if (normalized.length < SEARCH_MIN_QUERY_LENGTH) {
    return "Type at least 2 characters to search calculators.";
  }

  if (categoryLabel) {
    return resultCount === 0
      ? `Filtered to ${categoryLabel}, no calculators found`
      : `Filtered to ${categoryLabel}, ${resultCount} calculator${resultCount === 1 ? "" : "s"} found`;
  }

  return resultCount === 0
    ? "No calculators found"
    : `${resultCount} calculator${resultCount === 1 ? "" : "s"} found`;
}
