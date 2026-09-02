import Link from "next/link";
import { FormulaBlock } from "@/components/calculator/FormulaBlock";
import { InterpretationPanel } from "@/components/calculator/InterpretationPanel";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

const workingSummary = [
  "Mean: x̄ = (12 + 15 + 14 + 10 + 19) / 5 = 14",
  "Absolute deviations sum to 12",
  "MAD = 12 / 5 = 2.4",
];

export function HomeHowItWorks() {
  return (
    <Section ariaLabelledby="home-how-it-works-heading">
      <Container>
        <div className="mx-auto max-w-3xl">
          <h2
            id="home-how-it-works-heading"
            className="text-2xl font-bold text-ink sm:text-3xl"
          >
            How CalcLume shows the work
          </h2>
          <p className="mt-2 text-muted">
            One representative example below — not a live calculator. Every published
            calculator page follows the same transparent result, formula, working, and
            interpretation structure.
          </p>
        </div>

        <div className="mx-auto mt-6 max-w-3xl">
          <div
            role="img"
            aria-label="Compact illustrative example showing mean absolute deviation result of 2.4 with formula and working summary"
            className="rounded-lg border-2 border-dashed border-lume-teal-bright/40 bg-white p-4 sm:p-5"
          >
            <p className="mb-3 inline-flex rounded-sm bg-warm-signal/25 px-2 py-1 text-xs font-semibold uppercase tracking-wide text-ink">
              Illustrative example — not interactive
            </p>
            <div className="space-y-4">
              <div className="rounded-md border border-border bg-paper p-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                  Result
                </p>
                <p className="mt-1 text-xl font-bold text-ink sm:text-2xl">MAD = 2.4</p>
              </div>
              <FormulaBlock label="Formula" formula="MAD = (Σ|xᵢ − x̄|) / n" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                  Working
                </p>
                <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-ink">
                  {workingSummary.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
              </div>
              <InterpretationPanel interpretation="Values in this dataset are, on average, 2.4 units away from the arithmetic mean of 14." />
            </div>
          </div>
          <p className="mt-4">
            <Link
              href="/calculators/statistics/mean-absolute-deviation/"
              className="text-sm font-semibold text-lume-teal hover:text-teal-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lume-teal"
            >
              See the full worked calculation
            </Link>
          </p>
        </div>
      </Container>
    </Section>
  );
}
