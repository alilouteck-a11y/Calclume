import Link from "next/link";
import { CategorySummaryCard } from "@/components/calculator/CategorySummaryCard";
import { CalculatorCard } from "@/components/calculator/CalculatorCard";
import { PageHeader } from "@/components/layout/PageHeader";
import { CalculatorSearch } from "@/components/search/CalculatorSearch";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { createPageMetadata } from "@/lib/metadata";
import {
  getCategorySummariesWithCatalogTools,
  getPublishedCalculators,
} from "@/lib/calculator-catalog";
import { buildSearchIndex } from "@/lib/calculator-search-index";
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

  const searchIndex = buildSearchIndex();
  const publishedCalculators = getPublishedCalculators();
  const collectionSummaries = getCategorySummariesWithCatalogTools();

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
          <div className="max-w-2xl">
            <h2 className="text-lg font-semibold text-ink">Search calculators</h2>
            <div className="mt-3">
              <CalculatorSearch
                searchIndex={searchIndex}
                variant="directory"
                enableSlashShortcut
              />
            </div>
          </div>

          {publishedCalculators.length > 0 && (
            <div className="mt-12">
              <h2 className="text-xl font-semibold text-ink">Available calculators</h2>
              <p className="mt-2 max-w-2xl text-sm text-muted">
                Published tools you can use now with formulas, steps, and interpretation.
              </p>
              <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                {publishedCalculators.map((calculator) => (
                  <li key={calculator.id}>
                    <CalculatorCard
                      slug={calculator.slug}
                      name={calculator.name}
                      description={calculator.description}
                      status="published"
                    />
                  </li>
                ))}
              </ul>
            </div>
          )}

          {collectionSummaries.length > 0 && (
            <div id="categories" className="mt-12 scroll-mt-20">
              <h2 className="text-xl font-semibold text-ink">Browse collections</h2>
              <p className="mt-2 max-w-2xl text-sm text-muted">
                Category collections include published tools and calculators still in
                preparation. Only available tools are linked from this directory.
              </p>
              <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                {collectionSummaries.map((summary) => (
                  <li key={summary.category.id}>
                    <CategorySummaryCard
                      categoryId={summary.category.id}
                      name={summary.category.name}
                      description={summary.category.description}
                      publishedCount={summary.publishedCount}
                      totalCount={summary.totalCount}
                      preparationCount={summary.preparationCount}
                      collectionHref={summary.collectionRoute}
                      variant="directory"
                    />
                  </li>
                ))}
              </ul>
            </div>
          )}

          {publishedCalculators.length > 0 && (
            <p className="mt-8 text-sm text-muted">
              {publishedCalculators.length} calculator
              {publishedCalculators.length === 1 ? "" : "s"} published.{" "}
              <Link
                href="/methodology/"
                className="font-semibold text-lume-teal hover:text-teal-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lume-teal"
              >
                Read our methodology
              </Link>
              .
            </p>
          )}
        </Container>
      </Section>
    </>
  );
}
