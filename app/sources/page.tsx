import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { createPageMetadata } from "@/lib/metadata";
import { StructuredData } from "@/components/seo/StructuredData";
import { getBreadcrumbSchema } from "@/lib/structured-data";

export const metadata = createPageMetadata({
  title: "Sources",
  description:
    "The accepted source hierarchy CalcLume uses when selecting formulas and verifying calculations.",
  path: "/sources/",
});

export default function SourcesPage() {
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Sources", path: "/sources/" },
  ];

  return (
    <>
      <StructuredData data={getBreadcrumbSchema(breadcrumbs)} />
      <PageHeader
        title="Sources"
        description="The reference hierarchy CalcLume uses to select and verify formulas."
        breadcrumbs={breadcrumbs}
      />
      <Section>
        <Container>
          <div className="prose-content max-w-3xl">
            <p>
              CalcLume selects formulas and verifies calculations using the
              following source hierarchy. Higher-ranked sources take precedence
              when formulations differ.
            </p>

            <h2>1. Government and intergovernmental sources</h2>
            <p>
              National statistical agencies, census bureaus, and
              intergovernmental organizations (e.g., WHO, OECD, UNESCO) provide
              authoritative definitions and standard formulas for many
              statistical measures.
            </p>

            <h2>2. Universities and peer-reviewed publications</h2>
            <p>
              Academic institutions and peer-reviewed journals provide rigorous
              definitions, derivations, and worked examples. Course materials
              from accredited universities are acceptable when they align with
              established statistical conventions.
            </p>

            <h2>3. Standards bodies</h2>
            <p>
              Organizations such as ISO, NIST, and IEEE publish formal standards
              for measurement, notation, and computational methods that guide
              our formula selection.
            </p>

            <h2>4. Established textbooks and reference works</h2>
            <p>
              Widely adopted textbooks in statistics, mathematics, and data
              science serve as reference points for standard formulas and
              worked examples. We prefer recent editions but note when older
              conventions apply.
            </p>

            <h2>5. Reputable professional organizations</h2>
            <p>
              Professional societies (e.g., ASA, RSS, IMS) publish guidelines,
              glossaries, and best-practice documents that inform our
              methodology and terminology choices.
            </p>

            <h2>What we do not cite</h2>
            <p>
              CalcLume does not cite blog posts, unverified wiki edits, AI
              outputs, or sources we have not actually consulted. We do not
              fabricate citations or attribute formulas to sources that do not
              contain them.
            </p>

            <h2>Per-calculator sources</h2>
            <p>
              Each published calculator page lists the specific sources consulted
              during its development. Unpublished calculators do not appear as live
              detail routes.
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}
