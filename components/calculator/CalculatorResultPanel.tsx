import type { ReactNode } from "react";

type CalculatorResultPanelProps = {
  children: ReactNode;
  title?: string;
  liveRegion?: "polite" | "assertive" | "off";
};

export function CalculatorResultPanel({
  children,
  title = "Result",
  liveRegion = "polite",
}: CalculatorResultPanelProps) {
  return (
    <section aria-labelledby="calculator-result-heading">
      <h3 id="calculator-result-heading" className="text-base font-semibold text-ink">
        {title}
      </h3>
      <div
        aria-live={liveRegion}
        aria-atomic="true"
        className="mt-4 rounded-md border border-border bg-paper p-4"
      >
        {children}
      </div>
    </section>
  );
}
