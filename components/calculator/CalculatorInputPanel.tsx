import type { ReactNode } from "react";

type CalculatorInputPanelProps = {
  children: ReactNode;
  title?: string;
  description?: string;
};

export function CalculatorInputPanel({
  children,
  title = "Inputs",
  description,
}: CalculatorInputPanelProps) {
  return (
    <section
      aria-labelledby="calculator-inputs-heading"
      className="rounded-md border border-border bg-[var(--color-surface-subtle)] p-4 sm:p-5"
    >
      <h3 id="calculator-inputs-heading" className="text-base font-semibold text-ink">
        {title}
      </h3>
      {description && (
        <p id="calculator-inputs-description" className="mt-1 text-sm text-muted">
          {description}
        </p>
      )}
      <div className="mt-4 space-y-4">{children}</div>
    </section>
  );
}
