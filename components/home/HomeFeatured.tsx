import { CalculatorCard } from "@/components/calculator/CalculatorCard";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { getFeaturedPublishedCalculators } from "@/lib/calculator-catalog";

export function HomeFeatured() {
  const featured = getFeaturedPublishedCalculators();

  if (featured.length === 0) {
    return null;
  }

  return (
    <Section ariaLabelledby="home-featured-heading">
      <Container>
        <h2 id="home-featured-heading" className="text-2xl font-bold text-ink sm:text-3xl">
          Featured calculators
        </h2>
        <p className="mt-2 max-w-2xl text-muted">
          Published tools selected for clarity and step-by-step working.
        </p>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((calculator) => (
            <li key={calculator.id} className="min-w-0">
              <CalculatorCard
                slug={calculator.slug}
                name={calculator.name}
                description={calculator.description}
                status="published"
              />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
