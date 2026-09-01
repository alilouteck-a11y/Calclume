"use client";

import { useState } from "react";
import type { DisplayPrecision } from "@/lib/calculators/format-number";
import { formatDisplayNumber } from "@/lib/calculators/format-number";
import { OUTLIER_LIST_DISPLAY_LIMIT } from "@/lib/calculators/outlier-iqr-config";
import type { OutlierIqrOutlierEntry } from "@/lib/calculators/outlier-iqr-schema";

type OutlierListProps = {
  title: string;
  outliers: OutlierIqrOutlierEntry[];
  decimals: DisplayPrecision;
  listId: string;
};

function OutlierListSection({
  title,
  outliers,
  decimals,
  listId,
}: OutlierListProps) {
  const [expanded, setExpanded] = useState(false);
  const visible =
    outliers.length <= OUTLIER_LIST_DISPLAY_LIMIT || expanded
      ? outliers
      : outliers.slice(0, OUTLIER_LIST_DISPLAY_LIMIT);

  if (outliers.length === 0) {
    return (
      <div>
        <h4 className="text-sm font-semibold text-ink">{title}</h4>
        <p className="mt-1 text-sm text-muted">None</p>
      </div>
    );
  }

  return (
    <div>
      <h4 className="text-sm font-semibold text-ink">
        {title} ({outliers.length})
      </h4>
      <ul id={listId} className="mt-2 space-y-1 text-sm text-ink">
        {visible.map((entry) => (
          <li key={`${entry.index}-${entry.value}`} className="font-mono">
            #{entry.index}: {formatDisplayNumber(entry.value, decimals)}
          </li>
        ))}
      </ul>
      {outliers.length > OUTLIER_LIST_DISPLAY_LIMIT && (
        <button
          type="button"
          onClick={() => setExpanded((value) => !value)}
          className="mt-2 inline-flex min-h-11 items-center rounded-md border border-border bg-white px-4 py-2 text-sm font-medium text-ink hover:bg-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lume-teal"
        >
          {expanded
            ? `Show first ${OUTLIER_LIST_DISPLAY_LIMIT}`
            : `Show ${outliers.length - OUTLIER_LIST_DISPLAY_LIMIT} more`}
        </button>
      )}
    </div>
  );
}

type OutlierListsProps = {
  lowerOutliers: OutlierIqrOutlierEntry[];
  upperOutliers: OutlierIqrOutlierEntry[];
  outlierCount: number;
  decimals: DisplayPrecision;
};

export function OutlierLists({
  lowerOutliers,
  upperOutliers,
  outlierCount,
  decimals,
}: OutlierListsProps) {
  return (
    <section aria-labelledby="outlier-iqr-outlier-lists-heading">
      <h3
        id="outlier-iqr-outlier-lists-heading"
        className="text-base font-semibold text-ink"
      >
        Outliers ({outlierCount})
      </h3>
      <p className="mt-1 text-sm text-muted">
        Observations strictly outside the fences. Values on a fence are not listed
        here.
      </p>
      <div className="mt-4 grid gap-6 md:grid-cols-2">
        <OutlierListSection
          title="Lower outliers"
          outliers={lowerOutliers}
          decimals={decimals}
          listId="outlier-iqr-lower-list"
        />
        <OutlierListSection
          title="Upper outliers"
          outliers={upperOutliers}
          decimals={decimals}
          listId="outlier-iqr-upper-list"
        />
      </div>
    </section>
  );
}
