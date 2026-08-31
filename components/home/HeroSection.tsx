import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { siteConfig } from "@/lib/site-config";

export function HeroSection() {
  return (
    <Section className="bg-white">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-lume-teal">
            {siteConfig.name}
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl lg:text-5xl">
            Clear calculators that show the work
          </h1>
          <p className="mt-4 text-lg text-muted">
            Every CalcLume calculator returns your answer alongside the formula,
            step-by-step working, and a plain-language interpretation — so you
            can verify the result, not just read it.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="/calculators/">Browse calculators</Button>
            <Button href="/methodology/" variant="secondary">
              Read our methodology
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
