import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";

const reasons = [
  {
    title: "Transparent formulas",
    description:
      "Every result is paired with the exact formula used, so you can follow the logic from input to answer.",
  },
  {
    title: "Tested edge cases",
    description:
      "Calculators are checked against reference examples and boundary conditions before publication.",
  },
  {
    title: "Privacy-first local calculation",
    description:
      "Your data stays in the browser. CalcLume does not transmit or store calculator inputs.",
  },
  {
    title: "Accessible explanations",
    description:
      "Step sequences and interpretations are written for clarity, with semantic structure and screen reader support.",
  },
];

export function WhyCalcLume() {
  return (
    <Section ariaLabelledby="why-calclume-heading">
      <Container>
        <div className="max-w-3xl">
          <h2
            id="why-calclume-heading"
            className="text-2xl font-bold text-ink sm:text-3xl"
          >
            Why CalcLume
          </h2>
          <p className="mt-3 text-muted">
            CalcLume is built for students, analysts, and curious learners who
            want to understand a calculation — not just copy a number.
          </p>
        </div>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {reasons.map((reason) => (
            <li key={reason.title}>
              <Card>
                <h3 className="text-base font-semibold text-ink">
                  {reason.title}
                </h3>
                <p className="mt-2 text-sm text-muted">{reason.description}</p>
              </Card>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
