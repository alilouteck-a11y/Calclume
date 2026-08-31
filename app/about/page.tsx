import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { createPageMetadata } from "@/lib/metadata";
import { StructuredData } from "@/components/seo/StructuredData";
import { getBreadcrumbSchema } from "@/lib/structured-data";

export const metadata = createPageMetadata({
  title: "About",
  description:
    "Learn about CalcLume's purpose, audience, and transparent calculation model.",
  path: "/about/",
});

export default function AboutPage() {
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about/" },
  ];

  return (
    <>
      <StructuredData data={getBreadcrumbSchema(breadcrumbs)} />
      <PageHeader
        title="About CalcLume"
        description="CalcLume helps you understand calculations — not just read results."
        breadcrumbs={breadcrumbs}
      />
      <Section>
        <Container>
          <div className="prose-content max-w-3xl">
            <h2>Our purpose</h2>
            <p>
              CalcLume provides accurate, transparent calculators for students,
              analysts, educators, and curious learners. Every tool is designed
              to return four things: the answer, the formula used, the working
              steps, and a plain-language interpretation.
            </p>

            <h2>Who CalcLume is for</h2>
            <p>
              CalcLume serves anyone who needs to perform a calculation and
              understand how the result was reached. This includes students
              checking homework, professionals verifying a quick analysis, and
              self-directed learners exploring statistical concepts.
            </p>

            <h2>Our principles</h2>
            <ul>
              <li>
                <strong>Show the work.</strong> Every calculator displays its
                formula and step sequence alongside the result.
              </li>
              <li>
                <strong>Calculator usefulness first.</strong> The working tool
                appears near the top of each page — not buried below marketing
                copy.
              </li>
              <li>
                <strong>Privacy by design.</strong> Calculations run locally in
                your browser. Entered data is not transmitted or stored.
              </li>
              <li>
                <strong>Honest scope.</strong> We do not publish unfinished
                calculators or fabricate credentials, reviews, or usage
                statistics.
              </li>
              <li>
                <strong>Documented methodology.</strong> Formula selection,
                verification, and correction processes are described publicly.
              </li>
            </ul>

            <h2>What CalcLume is not</h2>
            <p>
              CalcLume is an informational calculation tool. It does not provide
              legal, financial, medical, or professional advice. Health, loan,
              mortgage, tax, investment, and medical calculators are outside our
              initial scope.
            </p>

            <h2>Transparent calculation model</h2>
            <p>
              Each future calculator page will follow a consistent structure:
              inputs at the top, result immediately below, then formula, steps,
              interpretation, sources, and related tools. This model is
              documented in our Calculator Page Contract and enforced through
              testing and editorial review.
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}
