import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export function HomeDiscoveryCta() {
  return (
    <Section ariaLabelledby="home-discovery-cta-heading">
      <Container>
        <div className="rounded-lg border border-border bg-deep-surface px-6 py-10 text-center sm:px-10">
          <h2
            id="home-discovery-cta-heading"
            className="text-2xl font-bold text-white sm:text-3xl"
          >
            Explore the calculator library
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-white/80 sm:text-base">
            Browse published tools with formulas, steps, and interpretation on every
            page.
          </p>
          <div className="mt-6">
            <Button href="/calculators/">Browse all calculators</Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
