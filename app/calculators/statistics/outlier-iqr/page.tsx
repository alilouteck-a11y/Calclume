import { OutlierIqrCalculator } from "@/components/calculators/outlier-iqr/OutlierIqrCalculator";
import { OutlierIqrEducationalContent } from "@/components/calculators/outlier-iqr/OutlierIqrEducationalContent";
import { SourceList } from "@/components/calculator/SourceList";
import { RelatedCalculatorCard } from "@/components/calculator/RelatedCalculatorCard";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { StructuredData } from "@/components/seo/StructuredData";
import { outlierIqrCalculatorConfig } from "@/lib/calculators/outlier-iqr-config";
import { getOutlierIqrSoftwareApplicationSchema } from "@/lib/calculators/outlier-iqr-structured-data";
import { launchCandidates } from "@/lib/calculator-portfolio";
import { createPageMetadata } from "@/lib/metadata";
import { getBreadcrumbSchema } from "@/lib/structured-data";
import { isCalculatorPublished } from "@/lib/published-calculators";
import Link from "next/link";

export const metadata = createPageMetadata({
  title: "Outlier & IQR Calculator with Box Plot",
  description: outlierIqrCalculatorConfig.description,
  path: outlierIqrCalculatorConfig.path,
});

export default function OutlierIqrPage() {
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Calculators", path: "/calculators/" },
    { name: "Statistics", path: "/calculators/statistics/" },
    {
      name: "Outlier and IQR",
      path: outlierIqrCalculatorConfig.path,
    },
  ];

  const relatedCalculators = launchCandidates.filter(
    (calculator) => calculator.slug !== outlierIqrCalculatorConfig.slug,
  );

  const softwareSchema = getOutlierIqrSoftwareApplicationSchema();
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
        title={outlierIqrCalculatorConfig.name}
        description="Compute quartiles, interquartile range, Tukey fences, whiskers, and flagged outliers. Choose a quartile method and fence multiplier, then review the five-number summary, steps, classification table, and accessible box plot."
        breadcrumbs={breadcrumbs}
      />
      <Section className="pt-6 sm:pt-8">
        <Container>
          <OutlierIqrCalculator />

          <OutlierIqrEducationalContent />

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
                page. References below support IQR, Tukey-style fences, box-plot
                interpretation, and quartile-method transparency.
              </p>
              <div className="mt-4">
                <SourceList
                  sources={[...outlierIqrCalculatorConfig.sources]}
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
              Last reviewed: {outlierIqrCalculatorConfig.lastReviewed}
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}
