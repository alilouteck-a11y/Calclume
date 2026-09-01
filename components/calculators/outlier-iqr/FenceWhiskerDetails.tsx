import type { DisplayPrecision } from "@/lib/calculators/format-number";
import { formatDisplayNumber } from "@/lib/calculators/format-number";
import type { OutlierIqrResult } from "@/lib/calculators/outlier-iqr-schema";

type FenceWhiskerDetailsProps = {
  result: OutlierIqrResult;
  decimals: DisplayPrecision;
};

export function FenceWhiskerDetails({ result, decimals }: FenceWhiskerDetailsProps) {
  const fmt = (value: number) => formatDisplayNumber(value, decimals);
  const items = [
    { label: "Lower fence", value: fmt(result.lowerFence) },
    { label: "Upper fence", value: fmt(result.upperFence) },
    { label: "Lower whisker", value: fmt(result.lowerWhisker) },
    { label: "Upper whisker", value: fmt(result.upperWhisker) },
  ];

  return (
    <section aria-labelledby="outlier-iqr-fence-whisker-heading">
      <h3
        id="outlier-iqr-fence-whisker-heading"
        className="text-base font-semibold text-ink"
      >
        IQR fences and whiskers
      </h3>
      <p className="mt-1 text-sm text-muted">
        Fences are reference boundaries for outlier flags. Whiskers end at the most
        extreme observed values that are not outliers.
      </p>
      <dl className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <div key={item.label} className="rounded-md border border-border bg-paper p-3">
            <dt className="text-sm text-muted">{item.label}</dt>
            <dd className="mt-1 font-mono text-sm font-medium text-ink">
              {item.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
