import Link from "next/link";
import { CalculatorCard } from "@/components/calculator/CalculatorCard";
import { CalculatorNotice } from "@/components/calculator/CalculatorNotice";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { StructuredData } from "@/components/seo/StructuredData";
import {
  getCategorySummary,
  type CategorySummary,
} from "@/lib/calculator-category-publication";
import type { CategoryId } from "@/lib/calculator-categories";
import { createPageMetadata } from "@/lib/metadata";
import { getBreadcrumbSchema } from "@/lib/structured-data";
import { notFound } from "next/navigation";

export function createCategoryPageMetadata(categoryId: CategoryId) {
  const summary = getCategorySummary(categoryId);
  if (!summary?.isPublic) {
    return createPageMetadata({
      title: "Category",
      description: "Category collection",
      path: `/calculators/${categoryId}/`,
      noIndex: true,
    });
  }

  return createPageMetadata({
    title: summary.category.pageTitle,
    description: summary.category.metaDescription,
    path: summary.category.route,
  });
}

type CategoryCollectionPageProps = {
  categoryId: CategoryId;
};

function getCardStatus(
  status: "published" | "launch-candidate" | "expansion-candidate",
): "published" | "launch-candidate" | "expansion-candidate" {
  return status;
}

export function CategoryCollectionPage({ categoryId }: CategoryCollectionPageProps) {
  const summary = getCategorySummary(categoryId);

  if (!summary || !summary.isPublic) {
    notFound();
  }

  return <CategoryCollectionView summary={summary} />;
}

export function CategoryCollectionView({ summary }: { summary: CategorySummary }) {
  const { category, publishedCount, publishedCalculators } = summary;

  const launchAndPublished = [
    ...publishedCalculators,
    ...summary.preparationCalculators,
  ];

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Calculators", path: "/calculators/" },
    { name: category.name, path: category.route },
  ];

  return (
    <>
      <StructuredData data={getBreadcrumbSchema(breadcrumbs)} />
      <PageHeader
        title={category.pageTitle}
        description={category.description}
        breadcrumbs={breadcrumbs}
      />
      <Section>
        <Container>
          <p className="max-w-3xl text-base text-muted">{category.intro}</p>

          {publishedCount === 0 ? (
            <CalculatorNotice title="Collection in preparation">
              These calculators are being built and verified. No tools are
              available yet.
            </CalculatorNotice>
          ) : (
            <CalculatorNotice title="Collection in progress">
              {publishedCount} of {launchAndPublished.length} launch calculator
              {launchAndPublished.length === 1 ? "" : "s"}{" "}
              {publishedCount === 1 ? "is" : "are"} available. Remaining tools are
              listed below as in preparation.
            </CalculatorNotice>
          )}

          <h2 className="mt-10 text-xl font-semibold text-ink">
            Launch calculators
          </h2>
          <p className="mt-2 text-sm text-muted">
            Initial {category.name} release cluster.
          </p>
          <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {launchAndPublished.map((calculator) => (
              <li key={calculator.id}>
                <CalculatorCard
                  slug={calculator.slug}
                  name={calculator.name}
                  description={calculator.description}
                  status={getCardStatus(
                    calculator.status === "published"
                      ? "published"
                      : "launch-candidate",
                  )}
                />
              </li>
            ))}
          </ul>

          {summary.expansionCalculators.length > 0 && (
            <>
              <h2 className="mt-10 text-xl font-semibold text-ink">
                Expansion candidates
              </h2>
              <p className="mt-2 text-sm text-muted">
                Planned after the initial launch cluster is complete.
              </p>
              <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {summary.expansionCalculators.map((calculator) => (
                  <li key={calculator.id}>
                    <CalculatorCard
                      slug={calculator.slug}
                      name={calculator.name}
                      description={calculator.description}
                      status="expansion-candidate"
                    />
                  </li>
                ))}
              </ul>
            </>
          )}

          <p className="mt-10 text-sm text-muted">
            Review how CalcLume selects formulas and verifies results in our{" "}
            <Link
              href="/methodology/"
              className="font-semibold text-lume-teal hover:text-teal-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lume-teal"
            >
              methodology
            </Link>
            .
          </p>
        </Container>
      </Section>
    </>
  );
}
