import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { getRecentlyAddedPublishedCalculators } from "@/lib/calculator-catalog";

const MIN_RECENTLY_ADDED = 2;

export function HomeRecentlyAdded() {
  const recentlyAdded = getRecentlyAddedPublishedCalculators();

  if (recentlyAdded.length < MIN_RECENTLY_ADDED) {
    return null;
  }

  return (
    <Section ariaLabelledby="home-recently-added-heading">
      <Container>
        <h2
          id="home-recently-added-heading"
          className="text-2xl font-bold text-ink sm:text-3xl"
        >
          Recently added
        </h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {recentlyAdded.map((calculator) => (
            <li key={calculator.id} className="min-w-0">
              <Card as="article">
                <h3 className="text-base font-semibold text-ink">
                  <Link
                    href={calculator.route}
                    className="hover:text-lume-teal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lume-teal"
                  >
                    {calculator.name}
                  </Link>
                </h3>
                <p className="mt-2 text-sm text-muted">{calculator.description}</p>
                {calculator.publishedAt && (
                  <p className="mt-3 text-xs text-muted">
                    Published {calculator.publishedAt}
                  </p>
                )}
              </Card>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
