import Link from "next/link";
import type { CategoryId } from "@/lib/calculator-catalog";

type CategorySummaryCardProps = {
  categoryId: CategoryId;
  name: string;
  description: string;
  publishedCount: number;
  totalCount: number;
  preparationCount: number;
  collectionHref: string;
  /** Homepage shows available count; directory also distinguishes preparation inventory. */
  variant?: "homepage" | "directory";
};

export function CategorySummaryCard({
  categoryId,
  name,
  description,
  publishedCount,
  totalCount,
  preparationCount,
  collectionHref,
  variant = "homepage",
}: CategorySummaryCardProps) {
  const availableLabel = `${publishedCount} available`;

  return (
    <article
      className="h-full rounded-lg border border-border border-l-4 bg-white p-5 shadow-sm"
      style={{ borderLeftColor: `var(--category-accent-${categoryId})` }}
    >
      <h3 className="text-lg font-semibold text-ink">
        <Link
          href={collectionHref}
          className="hover:text-lume-teal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lume-teal"
        >
          {name}
        </Link>
      </h3>
      <p className="mt-2 text-sm text-muted">{description}</p>
      <p className="mt-3 text-sm font-medium text-ink">{availableLabel}</p>
      {variant === "directory" && totalCount > publishedCount && (
        <p className="mt-1 text-xs text-muted">
          {totalCount} in this collection · {preparationCount} in preparation
        </p>
      )}
      {variant === "homepage" && totalCount > publishedCount && (
        <p className="mt-1 text-xs text-muted">
          {totalCount} tools in this collection
        </p>
      )}
      <p className="mt-4">
        <Link
          href={collectionHref}
          className="text-sm font-semibold text-lume-teal hover:text-teal-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lume-teal"
        >
          View {name} collection
        </Link>
      </p>
    </article>
  );
}
