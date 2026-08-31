import Link from "next/link";
import { CategoryCard } from "@/components/calculator/CategoryCard";
import { CalculatorCard } from "@/components/calculator/CalculatorCard";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { createPageMetadata } from "@/lib/metadata";
import { launchCandidates, statisticsCalculators } from "@/lib/calculator-portfolio";
import { isCalculatorPublished } from "@/lib/published-calculators";
import { StructuredData } from "@/components/seo/StructuredData";
import { getBreadcrumbSchema } from "@/lib/structured-data";

export const metadata = createPageMetadata({
  title: "Calculators",
  description:
    "Browse CalcLume calculator collections. Transparent tools that show formulas, steps, and interpretations.",
  path: "/calculators/",
});

export default function CalculatorsPage() {
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Calculators", path: "/calculators/" },
  ];

  const publishedLaunch = launchCandidates.filter((calculator) =>
    isCalculatorPublished(calculator.slug),
  );

  return (
    <>
      <StructuredData data={getBreadcrumbSchema(breadcrumbs)} />
      <PageHeader
        title="Calculators"
        description="CalcLume calculators return your answer alongside the formula, working steps, and a clear interpretation."
        breadcrumbs={breadcrumbs}
      />
      <Section>
        <Container>
          {publishedLaunch.length > 0 && (
            <>
              <h2 className="text-xl font-semibold text-ink">Available now</h2>
              <ul className="mt-4 grid gap-4 sm:grid-cols-2">
                {publishedLaunch.map((calculator) => (
                  <li key={calculator.slug}>
                    <CalculatorCard
                      slug={calculator.slug}
                      name={calculator.name}
                      description={calculator.description}
                      status="published"
                    />
                  </li>
                ))}
              </ul>
            </>
          )}

          <h2 className="mt-10 text-xl font-semibold text-ink">Collections</h2>
          <ul className="mt-4 grid gap-4 sm:grid-cols-2">
            <li>
              <CategoryCard
                name="Statistics & Data"
                description="Descriptive statistics, dispersion measures, and common inference helpers with step-by-step working."
                href="/calculators/statistics/"
                calculatorCount={statisticsCalculators.length}
              />
            </li>
          </ul>

          <p className="mt-8 text-sm text-muted">
            Browse the{" "}
            <Link
              href="/calculators/statistics/"
              className="font-semibold text-lume-teal hover:text-teal-hover"
            >
              Statistics &amp; Data collection
            </Link>{" "}
            for the full launch and expansion list.
          </p>
        </Container>
      </Section>
    </>
  );
}
