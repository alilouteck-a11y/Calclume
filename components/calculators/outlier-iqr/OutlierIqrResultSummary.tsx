import type { OutlierIqrResultSummaryField } from "@/lib/calculators/outlier-iqr-config";

type OutlierIqrResultSummaryProps = {
  fields: OutlierIqrResultSummaryField[];
};

export function OutlierIqrResultSummary({ fields }: OutlierIqrResultSummaryProps) {
  const primary = fields.find((field) => field.primary) ?? fields[0];
  const outlierCountField = fields.find((field) => field.label === "Outlier count");
  const secondary = fields.filter(
    (field) => field !== primary && field !== outlierCountField,
  );
  const outlierCount = Number(outlierCountField?.value ?? 0);
  const outlierHeadline =
    outlierCount === 1 ? "1 outlier found" : `${outlierCount} outliers found`;

  return (
    <dl>
      <div className="border-b border-border pb-3">
        <dt className="text-xs font-semibold uppercase tracking-wide text-muted">
          Outliers
        </dt>
        <dd className="mt-1 break-words font-bold text-ink [font-size:var(--text-result-primary)] [line-height:var(--text-result-primary-line-height)]">
          {outlierHeadline}
        </dd>
      </div>
      <div className="border-b border-border py-3">
        <dt className="text-xs font-semibold uppercase tracking-wide text-muted">
          {primary.label}
        </dt>
        <dd className="mt-1 break-words font-bold text-ink [font-size:var(--text-result-primary)] [line-height:var(--text-result-primary-line-height)]">
          IQR = <span>{primary.value}</span>
        </dd>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {outlierCountField ? (
          <div>
            <dt className="text-sm text-muted">{outlierCountField.label}</dt>
            <dd className="mt-0.5 text-sm font-medium text-ink">
              {outlierCountField.value}
            </dd>
          </div>
        ) : null}
        {secondary.map((field) => (
          <div key={field.label}>
            <dt className="text-sm text-muted">{field.label}</dt>
            <dd
              className={`mt-0.5 break-words text-sm font-medium text-ink ${field.mono ? "font-mono" : ""}`}
            >
              {field.value}
            </dd>
          </div>
        ))}
      </div>
    </dl>
  );
}
