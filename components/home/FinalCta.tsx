import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export function FinalCta() {
  return (
    <Section ariaLabelledby="final-cta-heading">
      <Container>
        <div className="rounded-lg border border-border bg-deep-surface px-6 py-10 text-center sm:px-10">
          <h2
            id="final-cta-heading"
            className="text-2xl font-bold text-white sm:text-3xl"
          >
            Ready to explore transparent calculations?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-white/80 sm:text-base">
            Browse our growing calculator collections and see how CalcLume shows
            the work behind every answer.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="/calculators/">Browse calculators</Button>
            <Link
              href="/about/"
              className="inline-flex min-h-11 items-center justify-center rounded-md border border-white/30 bg-transparent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:border-white/50 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lume-teal"
            >
              About CalcLume
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}
