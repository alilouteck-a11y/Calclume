import { CategorySummaryCard } from "@/components/calculator/CategorySummaryCard";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { getCategorySummariesWithPublishedTools } from "@/lib/calculator-catalog";

export function HomeCategoryBrowse() {
  const summaries = getCategorySummariesWithPublishedTools();

  if (summaries.length === 0) {
    return null;
  }

  return (
    <Section ariaLabelledby="home-category-browse-heading" className="bg-white">
      <Container>
        <h2
          id="home-category-browse-heading"
          className="text-2xl font-bold text-ink sm:text-3xl"
        >
          Browse by category
        </h2>
        <p className="mt-2 max-w-2xl text-muted">
          Published calculators by category. More collections will appear here as
          they are approved and published.
        </p>

        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {summaries.map((summary) => (
            <li key={summary.category.id} className="min-w-0">
              <CategorySummaryCard
                categoryId={summary.category.id}
                name={summary.category.name}
                description={summary.category.description}
                publishedCount={summary.publishedCount}
                totalCount={summary.totalCount}
                preparationCount={summary.preparationCount}
                collectionHref={summary.collectionRoute}
                variant="homepage"
              />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
