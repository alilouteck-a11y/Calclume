import Link from "next/link";
import { CalculatorSearch } from "@/components/search/CalculatorSearch";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import type { SearchableCalculator } from "@/lib/calculator-search-index";

type HomeHeroSearchProps = {
  searchIndex: readonly SearchableCalculator[];
};

export function HomeHeroSearch({ searchIndex }: HomeHeroSearchProps) {
  return (
    <Section id="search" className="bg-white">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Clear calculators that show the work
          </h1>
          <p className="mt-4 text-lg text-muted">
            Formulas, steps, and interpretation on every page. Calculations run
            locally in your browser.
          </p>
          <div className="mt-8 text-left">
            <CalculatorSearch
              searchIndex={searchIndex}
              variant="hero"
              inputId="home-search-input"
              listboxId="home-search-results"
              enableSlashShortcut
            />
          </div>
          <noscript>
            <p className="mt-4 text-sm text-muted">
              Browse all calculators on the{" "}
              <Link href="/calculators/" className="font-semibold text-lume-teal underline">
                calculator directory
              </Link>
              .
            </p>
          </noscript>
        </div>
      </Container>
    </Section>
  );
}
