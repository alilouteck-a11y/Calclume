import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { createPageMetadata } from "@/lib/metadata";
import { StructuredData } from "@/components/seo/StructuredData";
import { getBreadcrumbSchema } from "@/lib/structured-data";

export const metadata = createPageMetadata({
  title: "Methodology",
  description:
    "How CalcLume selects formulas, verifies calculations, handles edge cases, and maintains accuracy.",
  path: "/methodology/",
});

export default function MethodologyPage() {
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Methodology", path: "/methodology/" },
  ];

  return (
    <>
      <StructuredData data={getBreadcrumbSchema(breadcrumbs)} />
      <PageHeader
        title="Methodology"
        description="How CalcLume selects, verifies, and maintains its calculators."
        breadcrumbs={breadcrumbs}
      />
      <Section>
        <Container>
          <div className="prose-content max-w-3xl">
            <h2>Formula selection</h2>
            <p>
              Each calculator uses a single, documented formula drawn from our
              accepted source hierarchy (see our{" "}
              <a href="/sources/">Sources page</a>). When multiple valid
              formulations exist, we choose the one most appropriate for the
              calculator&apos;s audience and document the choice in the
              calculator&apos;s page contract.
            </p>

            <h2>Source hierarchy</h2>
            <p>
              We prioritize government and intergovernmental sources, university
              and peer-reviewed publications, standards bodies, established
              textbooks, and reputable professional organizations — in that
              order. We do not cite sources we have not actually consulted.
            </p>

            <h2>Independent verification</h2>
            <p>
              Before publication, each calculator is verified against at least
              two independent reference examples. Implementation code is checked
              against the documented formula, and results are compared to
              hand-calculated or textbook values.
            </p>

            <h2>Reference examples</h2>
            <p>
              Every calculator includes built-in example datasets with known
              correct outputs. These examples serve as regression tests and as
              learning aids for users exploring the tool.
            </p>

            <h2>Edge-case testing</h2>
            <p>
              Calculators are tested at boundary conditions: empty inputs,
              single values, duplicate values, extreme magnitudes, and common
              invalid inputs. Error messages must be specific and actionable.
            </p>

            <h2>Rounding policy</h2>
            <p>
              Display precision is documented per calculator. Intermediate
              calculations use full floating-point precision; final displayed
              values are rounded using standard half-up rounding unless a
              specific field convention requires otherwise. The number of
              decimal places shown is stated in each calculator&apos;s contract.
            </p>

            <h2>Unit handling</h2>
            <p>
              Each calculator documents whether it expects raw numbers, labeled
              units, or unitless values. Unit conversions, when supported, are
              shown as explicit steps rather than applied silently.
            </p>

            <h2>Correction process</h2>
            <p>
              If you believe a calculator contains an error, contact us at{" "}
              <a href="mailto:hello@calclume.com">hello@calclume.com</a>.
              Verified errors are corrected promptly, with the correction date
              noted on the affected page.
            </p>

            <h2>Update process</h2>
            <p>
              Calculators are reviewed on a scheduled basis and updated when
              reference standards change or when improved formulations become
              available. The last reviewed date appears on each published
              calculator page.
            </p>

            <h2>Current commitments vs. future aspirations</h2>
            <p>
              <strong>Current production:</strong> Methodology documentation, source
              hierarchy, calculator page contract, UI architecture, and the Mean
              Absolute Deviation Calculator are published. Calculations run locally in
              the browser.
            </p>
            <p>
              <strong>Future:</strong> Additional statistics calculators, broader
              regression suites, peer review by subject-matter contributors, and
              versioned formula changelogs are planned but not yet complete.
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}
