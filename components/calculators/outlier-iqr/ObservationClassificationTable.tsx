import { ResultTable } from "@/components/calculator/ResultTable";
import type { OutlierIqrTableRow } from "@/lib/calculators/outlier-iqr-config";

type ObservationClassificationTableProps = {
  rows: OutlierIqrTableRow[];
  totalCount: number;
  rowLimit: number;
  expanded: boolean;
  onToggleExpansion: () => void;
};

export function ObservationClassificationTable({
  rows,
  totalCount,
  rowLimit,
  expanded,
  onToggleExpansion,
}: ObservationClassificationTableProps) {
  const showStatus = totalCount > rowLimit;

  return (
    <section aria-labelledby="outlier-iqr-classification-table-heading">
      <h3
        id="outlier-iqr-classification-table-heading"
        className="text-base font-semibold text-ink"
      >
        Observation classification table
      </h3>
      <p className="mt-1 text-sm text-muted">
        Rows follow your original input order. Sorted values appear in the
        calculation steps above.
      </p>
      {showStatus && (
        <p className="mt-1 text-sm text-muted">
          {expanded
            ? `Showing all ${totalCount} observations.`
            : `Showing ${rowLimit} of ${totalCount} observations`}
        </p>
      )}
      <div className="mt-4 overflow-x-auto">
        <ResultTable
          caption="Classification of each observation against the computed fences"
          columns={[
            { key: "index", header: "#", align: "right" },
            { key: "value", header: "Value", align: "right" },
            { key: "classification", header: "Classification", align: "left" },
          ]}
          rows={rows}
        />
      </div>
      {showStatus && (
        <button
          type="button"
          onClick={onToggleExpansion}
          className="mt-3 inline-flex min-h-11 items-center rounded-md border border-border bg-white px-4 py-2 text-sm font-medium text-ink hover:bg-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lume-teal"
        >
          {expanded
            ? `Show first ${rowLimit} rows`
            : `Show all ${totalCount} rows`}
        </button>
      )}
    </section>
  );
}
