import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { createPageMetadata } from "@/lib/metadata";
import { StructuredData } from "@/components/seo/StructuredData";
import { getBreadcrumbSchema } from "@/lib/structured-data";

export const metadata = createPageMetadata({
  title: "Terms of Use",
  description:
    "Terms governing use of CalcLume informational calculators and website content.",
  path: "/terms/",
});

export default function TermsPage() {
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Terms", path: "/terms/" },
  ];

  return (
    <>
      <StructuredData data={getBreadcrumbSchema(breadcrumbs)} />
      <PageHeader
        title="Terms of Use"
        description="Terms governing your use of CalcLume."
        breadcrumbs={breadcrumbs}
      />
      <Section>
        <Container>
          <div className="prose-content max-w-3xl">
            <p>
              <strong>Last updated:</strong> August 2026
            </p>

            <h2>Informational tool disclaimer</h2>
            <p>
              CalcLume provides calculators and explanatory content for
              informational and educational purposes. Results are intended to
              help you understand calculations — they are not a substitute for
              professional judgment.
            </p>

            <h2>Not professional advice</h2>
            <p>
              CalcLume does not provide legal, financial, medical, tax,
              investment, or other professional advice. Do not rely on CalcLume
              results for decisions that require licensed professional
              consultation.
            </p>

            <h2>Accuracy</h2>
            <p>
              We work to ensure calculator accuracy through documented
              methodology and verification. However, CalcLume is provided
              &quot;as is&quot; without warranties of any kind. We are not
              liable for errors, omissions, or consequences arising from use of
              the site or its calculators.
            </p>

            <h2>Acceptable use</h2>
            <p>
              You may use CalcLume for personal, educational, and
              non-commercial purposes. You may not attempt to disrupt the site,
              scrape content at scale, or misrepresent CalcLume results as
              originating from a professional service.
            </p>

            <h2>Intellectual property</h2>
            <p>
              CalcLume content, design, and calculator implementations are
              protected by applicable intellectual property laws. Formulas and
              mathematical methods themselves are not proprietary, but our
              specific presentations, step sequences, and explanatory text are.
            </p>

            <h2>Changes</h2>
            <p>
              We may update these terms. Continued use of the site after changes
              are posted constitutes acceptance of the revised terms.
            </p>

            <h2>Contact</h2>
            <p>
              Questions about these terms may be directed to{" "}
              <a href="mailto:hello@calclume.com">hello@calclume.com</a>.
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}
