import Link from "next/link";
import { CalculationSteps } from "@/components/calculator/CalculationSteps";
import { FormulaBlock } from "@/components/calculator/FormulaBlock";
import { InterpretationPanel } from "@/components/calculator/InterpretationPanel";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

const exampleSteps = [
  {
    label: "Compute the mean",
    detail: "x̄ = (12 + 15 + 14 + 10 + 19) / 5 = 14",
  },
  {
    label: "Find absolute deviations",
    detail: "|12−14| + |15−14| + |14−14| + |10−14| + |19−14| = 2 + 1 + 0 + 4 + 5 = 12",
  },
  {
    label: "Divide by n",
    detail: "MAD = 12 / 5 = 2.4",
  },
];

export function ExamplePanel() {
  return (
    <Section ariaLabelledby="example-panel-heading">
      <Container>
        <div className="mx-auto max-w-3xl">
          <h2
            id="example-panel-heading"
            className="text-2xl font-bold text-ink sm:text-3xl"
          >
            How CalcLume explains an answer
          </h2>
          <p className="mt-2 text-muted">
            A representative layout — not a live calculator. Published calculator
            pages follow this structure: result first, then formula, steps, and
            interpretation.
          </p>
          <p className="mt-2">
            <Link
              href="/calculators/statistics/mean-absolute-deviation/"
              className="text-sm font-semibold text-lume-teal hover:text-teal-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lume-teal"
            >
              Open the Mean Absolute Deviation Calculator
            </Link>
          </p>
        </div>
        <div className="mx-auto mt-8 max-w-3xl">
          <div
            role="img"
            aria-label="Illustrative example showing mean absolute deviation result of 2.4 with formula and steps"
            className="rounded-lg border-2 border-dashed border-lume-teal-bright/40 bg-white p-5 sm:p-6"
          >
            <p className="mb-4 inline-flex rounded-sm bg-warm-signal/25 px-2 py-1 text-xs font-semibold uppercase tracking-wide text-ink">
              Illustrative example — not interactive
            </p>
            <div className="space-y-5">
              <div className="rounded-md border border-border bg-paper p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                  Result
                </p>
                <p className="mt-1 text-2xl font-bold text-ink">MAD = 2.4</p>
              </div>
              <FormulaBlock
                label="Formula"
                formula="MAD = (Σ|xᵢ − x̄|) / n"
              />
              <CalculationSteps steps={exampleSteps} />
              <InterpretationPanel interpretation="Values in this dataset are, on average, 2.4 units away from the arithmetic mean of 14." />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
