import { MeanAbsoluteDeviationCalculator } from "@/components/calculators/mean-absolute-deviation/MeanAbsoluteDeviationCalculator";
import { MadEducationalContent } from "@/components/calculators/mean-absolute-deviation/MadEducationalContent";
import { SourceList } from "@/components/calculator/SourceList";
import { RelatedCalculatorCard } from "@/components/calculator/RelatedCalculatorCard";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { StructuredData } from "@/components/seo/StructuredData";
import { madCalculatorConfig } from "@/lib/calculators/mean-absolute-deviation-config";
import { getMadSoftwareApplicationSchema } from "@/lib/calculators/mean-absolute-deviation-schema";
import { launchCandidates } from "@/lib/calculator-portfolio";
import { createPageMetadata } from "@/lib/metadata";
import { getBreadcrumbSchema } from "@/lib/structured-data";
import { isCalculatorPublished } from "@/lib/published-calculators";
import Link from "next/link";

export const metadata = createPageMetadata({
  title: "Mean Absolute Deviation Calculator",
  description:
    "Calculate mean absolute deviation (MAD) about the arithmetic mean. Enter a dataset to see the formula, step-by-step working, deviation table, and a clear interpretation—all computed locally in your browser.",
  path: madCalculatorConfig.path,
});

export default function MeanAbsoluteDeviationPage() {
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Calculators", path: "/calculators/" },
    { name: "Statistics", path: "/calculators/statistics/" },
    {
      name: "Mean Absolute Deviation",
      path: madCalculatorConfig.path,
    },
  ];

  const relatedCalculators = launchCandidates.filter(
    (calculator) => calculator.slug !== madCalculatorConfig.slug,
  );

  const softwareSchema = getMadSoftwareApplicationSchema();
  const breadcrumbSchema = getBreadcrumbSchema(breadcrumbs);

  return (
    <>
      <StructuredData
        data={
          breadcrumbSchema
            ? [breadcrumbSchema, softwareSchema]
            : [softwareSchema]
        }
      />
      <PageHeader
        title={madCalculatorConfig.name}
        description="Compute mean absolute deviation about the arithmetic mean. Enter values, press Calculate MAD, and review the formula, steps, and deviation table."
        breadcrumbs={breadcrumbs}
      />
      <Section className="pt-6 sm:pt-8">
        <Container>
          <MeanAbsoluteDeviationCalculator />

          <MadEducationalContent />

          <div className="mt-10 space-y-8 border-t border-border pt-10">
            <section aria-labelledby="sources-methodology-heading">
              <h2
                id="sources-methodology-heading"
                className="text-lg font-semibold text-ink"
              >
                Sources and methodology
              </h2>
              <p className="mt-3 max-w-3xl text-sm text-muted">
                Formula selection follows CalcLume’s{" "}
                <Link
                  href="/sources/"
                  className="font-medium text-lume-teal hover:text-teal-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lume-teal"
                >
                  source hierarchy
                </Link>
                . Verification and review practices are described on the{" "}
                <Link
                  href="/methodology/"
                  className="font-medium text-lume-teal hover:text-teal-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lume-teal"
                >
                  methodology
                </Link>{" "}
                page. References below were consulted for measures of scale,
                deviation notation, and standard-deviation context.
              </p>
              <div className="mt-4">
                <SourceList
                  sources={[...madCalculatorConfig.sources]}
                  title="References consulted"
                />
              </div>
            </section>

            <section aria-labelledby="related-calculators-heading">
              <h2
                id="related-calculators-heading"
                className="text-lg font-semibold text-ink"
              >
                Related calculators
              </h2>
              <p className="mt-2 max-w-3xl text-sm text-muted">
                Related statistics tools in the same collection. Cards marked in
                preparation are not yet published and are not linked.
              </p>
              <ul className="mt-4 grid gap-4 sm:grid-cols-2">
                {relatedCalculators.slice(0, 4).map((calculator) => (
                  <li key={calculator.slug}>
                    <RelatedCalculatorCard
                      name={calculator.name}
                      description={calculator.description}
                      status={
                        isCalculatorPublished(calculator.slug)
                          ? "available"
                          : "preparing"
                      }
                    />
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-muted">
                Browse the{" "}
                <Link
                  href="/calculators/statistics/"
                  className="font-medium text-lume-teal hover:text-teal-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lume-teal"
                >
                  Statistics &amp; Data collection
                </Link>
                .
              </p>
            </section>

            <p className="text-xs text-muted">
              Last reviewed: {madCalculatorConfig.lastReviewed}
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}
