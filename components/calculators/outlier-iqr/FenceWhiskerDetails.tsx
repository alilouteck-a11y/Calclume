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
      <dl className="mt-3 grid grid-cols-1 gap-x-6 gap-y-2 min-[360px]:grid-cols-2 lg:grid-cols-4">
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
