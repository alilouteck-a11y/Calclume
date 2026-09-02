import { describe, expect, it } from "vitest";
import {
  buildSearchIndex,
  getSearchStatusMessage,
  normalizeSearchText,
  rankSearchResults,
  SEARCH_MIN_QUERY_LENGTH,
} from "@/lib/calculator-search-index";

describe("calculator search index", () => {
  const index = buildSearchIndex();

  it("indexes only published calculators", () => {
    expect(index).toHaveLength(2);
    expect(index.map((entry) => entry.slug).sort()).toEqual([
      "mean-absolute-deviation",
      "outlier-iqr",
    ]);
  });

  it("normalizes case, whitespace, and diacritics", () => {
    expect(normalizeSearchText("  Mean   Absolute  ")).toBe("mean absolute");
    expect(normalizeSearchText("Café")).toBe("cafe");
    expect(normalizeSearchText("  IQR  ")).toBe("iqr");
  });

  it("returns empty results for empty and one-character queries", () => {
    expect(rankSearchResults("", index)).toEqual([]);
    expect(rankSearchResults("m", index)).toEqual([]);
    expect(getSearchStatusMessage("m", 0)).toMatch(/type at least 2 characters/i);
  });

  it("ranks MAD alias and name queries", () => {
    expect(rankSearchResults("mad", index)[0]?.slug).toBe("mean-absolute-deviation");
    expect(rankSearchResults("MAD", index)[0]?.slug).toBe("mean-absolute-deviation");
    expect(rankSearchResults("mean absolute deviation", index)[0]?.slug).toBe(
      "mean-absolute-deviation",
    );
  });

  it("ranks IQR and outlier queries", () => {
    expect(rankSearchResults("iqr", index)[0]?.slug).toBe("outlier-iqr");
    expect(rankSearchResults("interquartile", index)[0]?.slug).toBe("outlier-iqr");
    expect(rankSearchResults("outlier", index)[0]?.slug).toBe("outlier-iqr");
  });

  it("matches statistics category filter without inventing routes", () => {
    const results = rankSearchResults("calculator", index, "statistics");
    expect(results).toHaveLength(2);
    expect(results.every((entry) => entry.categoryId === "statistics")).toBe(true);
  });

  it("returns no results for unknown queries at valid length", () => {
    expect(rankSearchResults("zzzznotfound", index)).toEqual([]);
    expect(getSearchStatusMessage("zzzznotfound", 0)).toBe("No calculators found");
  });

  it("does not mutate the built index between searches", () => {
    const before = buildSearchIndex().map((entry) => entry.id);
    rankSearchResults("mad", index);
    rankSearchResults("outlier", index);
    expect(buildSearchIndex().map((entry) => entry.id)).toEqual(before);
  });

  it("caps results at twelve and sorts ties by name", () => {
    const base = index[0]!;
    const largeIndex = Array.from({ length: 20 }, (_, mockIndex) => ({
      ...base,
      id: `statistics-mock-${mockIndex}`,
      slug: `mock-${mockIndex}`,
      route: `/calculators/statistics/mock-${mockIndex}/`,
      name: `Mock Calculator ${String(mockIndex).padStart(2, "0")}`,
      shortName: `Mock ${mockIndex}`,
      searchAliases: ["shared alias"],
    }));

    const results = rankSearchResults("shared alias", largeIndex);
    expect(results).toHaveLength(12);
    expect(results[0]!.name <= results[1]!.name).toBe(true);
  });

  it("documents minimum query length constant", () => {
    expect(SEARCH_MIN_QUERY_LENGTH).toBe(2);
  });
});
