import { CalculatorCard } from "@/components/calculator/CalculatorCard";
import { CalculatorNotice } from "@/components/calculator/CalculatorNotice";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import {
  expansionCandidates,
  launchCandidates,
} from "@/lib/calculator-portfolio";
import { isCalculatorPublished } from "@/lib/published-calculators";
import { createPageMetadata } from "@/lib/metadata";
import { StructuredData } from "@/components/seo/StructuredData";
import { getBreadcrumbSchema } from "@/lib/structured-data";

export const metadata = createPageMetadata({
  title: "Statistics & Data Calculators",
  description:
    "Step-by-step statistics and data calculators at CalcLume. Mean absolute deviation, IQR, standard error, and more.",
  path: "/calculators/statistics/",
});

function getCalculatorStatus(slug: string) {
  if (isCalculatorPublished(slug)) {
    return "published" as const;
  }
  return "launch-candidate" as const;
}

export default function StatisticsCalculatorsPage() {
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Calculators", path: "/calculators/" },
    { name: "Statistics", path: "/calculators/statistics/" },
  ];

  const publishedCount = launchCandidates.filter((calculator) =>
    isCalculatorPublished(calculator.slug),
  ).length;

  return (
    <>
      <StructuredData data={getBreadcrumbSchema(breadcrumbs)} />
      <PageHeader
        title="Statistics & Data Calculators"
        description="Descriptive statistics and common inference helpers. Each published tool shows its formula, working steps, and interpretation."
        breadcrumbs={breadcrumbs}
      />
      <Section>
        <Container>
          {publishedCount === 0 ? (
            <CalculatorNotice title="Collection in preparation">
              These calculators are being built and verified. No tools are
              available yet.
            </CalculatorNotice>
          ) : (
            <CalculatorNotice title="Collection in progress">
              {publishedCount} of {launchCandidates.length} launch calculators
              is available. Remaining tools are listed below as in preparation.
            </CalculatorNotice>
          )}

          <h2 className="mt-10 text-xl font-semibold text-ink">
            Launch calculators
          </h2>
          <p className="mt-2 text-sm text-muted">
            Initial Statistics &amp; Data release cluster.
          </p>
          <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {launchCandidates.map((calculator) => (
              <li key={calculator.slug}>
                <CalculatorCard
                  slug={calculator.slug}
                  name={calculator.name}
                  description={calculator.description}
                  status={getCalculatorStatus(calculator.slug)}
                />
              </li>
            ))}
          </ul>

          <h2 className="mt-10 text-xl font-semibold text-ink">
            Expansion candidates
          </h2>
          <p className="mt-2 text-sm text-muted">
            Planned after the initial launch cluster is complete.
          </p>
          <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {expansionCandidates.map((calculator) => (
              <li key={calculator.slug}>
                <CalculatorCard
                  slug={calculator.slug}
                  name={calculator.name}
                  description={calculator.description}
                  status="expansion-candidate"
                />
              </li>
            ))}
          </ul>
        </Container>
      </Section>
    </>
  );
}
