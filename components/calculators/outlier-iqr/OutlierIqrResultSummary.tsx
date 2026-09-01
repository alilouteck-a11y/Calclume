import type { OutlierIqrResultSummaryField } from "@/lib/calculators/outlier-iqr-config";

type OutlierIqrResultSummaryProps = {
  fields: OutlierIqrResultSummaryField[];
};

export function OutlierIqrResultSummary({ fields }: OutlierIqrResultSummaryProps) {
  const primary = fields.find((field) => field.primary) ?? fields[0];
  const secondary = fields.filter((field) => field !== primary);

  return (
    <dl>
      <div className="border-b border-border pb-3">
        <dt className="text-xs font-semibold uppercase tracking-wide text-muted">
          {primary.label}
        </dt>
        <dd className="mt-1 text-3xl font-bold text-ink">{primary.value}</dd>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {secondary.map((field) => (
          <div key={field.label}>
            <dt className="text-sm text-muted">{field.label}</dt>
            <dd
              className={`mt-0.5 text-sm font-medium text-ink ${field.mono ? "font-mono" : ""}`}
            >
              {field.value}
            </dd>
          </div>
        ))}
      </div>
    </dl>
  );
}
