import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";

export function MethodologyPreview() {
  return (
    <Section ariaLabelledby="methodology-preview-heading" className="bg-white">
      <Container>
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <h2
              id="methodology-preview-heading"
              className="text-2xl font-bold text-ink sm:text-3xl"
            >
              Documented methodology
            </h2>
            <p className="mt-3 text-muted">
              CalcLume documents how formulas are chosen, verified against
              reference sources, tested at edge cases, and updated when
              corrections are needed. We separate what we commit to today from
              what we plan for later.
            </p>
            <div className="mt-6">
              <Button href="/methodology/" variant="secondary">
                Read the full methodology
              </Button>
            </div>
          </div>
          <Card>
            <h3 className="text-base font-semibold text-ink">
              Our verification approach
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li>Source hierarchy from government and academic references</li>
              <li>Independent cross-checks against textbook examples</li>
              <li>Documented rounding and unit handling policies</li>
              <li>Public correction process for reported errors</li>
            </ul>
          </Card>
        </div>
      </Container>
    </Section>
  );
}
