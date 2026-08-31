export type CalculationStep = {
  label: string;
  detail: string;
};

type CalculationStepsProps = {
  steps: CalculationStep[];
  title?: string;
};

export function CalculationSteps({
  steps,
  title = "Steps",
}: CalculationStepsProps) {
  return (
    <section aria-labelledby="calculation-steps-heading">
      <h3 id="calculation-steps-heading" className="text-base font-semibold text-ink">
        {title}
      </h3>
      <ol className="mt-4 space-y-3">
        {steps.map((step, index) => (
          <li
            key={`${step.label}-${index}`}
            className="rounded-md border border-border bg-white p-3"
          >
            <p className="text-sm font-medium text-ink">
              Step {index + 1}: {step.label}
            </p>
            <p className="formula-block mt-1 text-sm text-muted">{step.detail}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
