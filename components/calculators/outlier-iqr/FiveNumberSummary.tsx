import type { DisplayPrecision } from "@/lib/calculators/format-number";
import { formatDisplayNumber } from "@/lib/calculators/format-number";
import type { OutlierIqrResult } from "@/lib/calculators/outlier-iqr-schema";

type FiveNumberSummaryProps = {
  result: OutlierIqrResult;
  decimals: DisplayPrecision;
};

export function FiveNumberSummary({ result, decimals }: FiveNumberSummaryProps) {
  const fmt = (value: number) => formatDisplayNumber(value, decimals);
  const items = [
    { label: "Data minimum", value: fmt(result.minimum) },
    { label: "Q1", value: fmt(result.q1) },
    { label: "Median", value: fmt(result.median) },
    { label: "Q3", value: fmt(result.q3) },
    { label: "Data maximum", value: fmt(result.maximum) },
  ];

  return (
    <section aria-labelledby="outlier-iqr-five-number-heading">
      <h3
        id="outlier-iqr-five-number-heading"
        className="text-base font-semibold text-ink"
      >
        Five-number summary
      </h3>
      <dl className="mt-3 grid grid-cols-1 gap-x-6 gap-y-2 min-[360px]:grid-cols-2 lg:grid-cols-5">
        {items.map((item) => (
          <div key={item.label} className="min-w-0">
            <dt className="text-xs text-muted">{item.label}</dt>
            <dd className="mt-0.5 break-words font-mono text-sm font-medium text-ink">
              {item.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
