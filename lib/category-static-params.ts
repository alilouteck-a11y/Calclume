/**
 * Optional dynamic category segment helpers for when ≥2 public categories exist.
 * Static export cannot use generateStaticParams() with an empty array, so Phase 4.3
 * keeps Statistics on an explicit thin wrapper and exposes these helpers for the
 * next category launch (e.g. Math at ≥3 published tools).
 */

import {
  getPublicCategoryStaticParams,
  isCategoryPublic,
} from "@/lib/calculator-category-publication";
import { isValidCategoryId, type CategoryId } from "@/lib/calculator-categories";

export function resolvePublicCategoryParam(
  category: string,
): CategoryId | null {
  if (!isValidCategoryId(category) || !isCategoryPublic(category)) {
    return null;
  }
  return category;
}

/** Params for a future `app/calculators/[category]/page.tsx` once a second hub ships. */
export function getFutureCategoryStaticParams() {
  return getPublicCategoryStaticParams({ excludeIds: ["statistics"] });
}
