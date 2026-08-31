import Link from "next/link";
import { CalculatorCard } from "@/components/calculator/CalculatorCard";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { launchCandidates } from "@/lib/calculator-portfolio";
import { isCalculatorPublished } from "@/lib/published-calculators";

export function StatisticsPreview() {
  const publishedCount = launchCandidates.filter((calculator) =>
    isCalculatorPublished(calculator.slug),
  ).length;

  return (
    <Section ariaLabelledby="statistics-preview-heading" className="bg-white">
      <Container>
        <div className="max-w-3xl">
          <h2
            id="statistics-preview-heading"
            className="text-2xl font-bold text-ink sm:text-3xl"
          >
            Statistics &amp; Data — initial collection
          </h2>
          <p className="mt-3 text-muted">
            Our first calculator cluster focuses on descriptive statistics and
            common inference helpers.
            {publishedCount > 0
              ? ` ${publishedCount} calculator${publishedCount === 1 ? " is" : "s are"} available now; others remain in preparation.`
              : " Tools are in preparation."}
          </p>
          <p className="mt-2">
            <Link
              href="/calculators/statistics/"
              className="text-sm font-semibold text-lume-teal hover:text-teal-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lume-teal"
            >
              View the Statistics collection
            </Link>
          </p>
        </div>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {launchCandidates.map((calculator) => (
            <li key={calculator.slug}>
              <CalculatorCard
                slug={calculator.slug}
                name={calculator.name}
                description={calculator.description}
                status={
                  isCalculatorPublished(calculator.slug)
                    ? "published"
                    : calculator.status
                }
              />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
