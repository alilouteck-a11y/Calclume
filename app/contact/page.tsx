import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { siteConfig } from "@/lib/site-config";
import { createPageMetadata } from "@/lib/metadata";
import { StructuredData } from "@/components/seo/StructuredData";
import { getBreadcrumbSchema } from "@/lib/structured-data";

export const metadata = createPageMetadata({
  title: "Contact",
  description: "Get in touch with the CalcLume team for questions, corrections, or feedback.",
  path: "/contact/",
});

export default function ContactPage() {
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Contact", path: "/contact/" },
  ];

  return (
    <>
      <StructuredData data={getBreadcrumbSchema(breadcrumbs)} />
      <PageHeader
        title="Contact"
        description="Questions, corrections, or feedback — we read every message."
        breadcrumbs={breadcrumbs}
      />
      <Section>
        <Container>
          <div className="prose-content max-w-3xl">
            <p>
              For questions about CalcLume calculators, methodology, reported
              errors, or general feedback, reach us by email:
            </p>
            <p>
              <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
            </p>
            <p>
              We aim to respond within a reasonable timeframe. If you are
              reporting a calculation error, please include the calculator name,
              your inputs, the result you received, and the result you expected.
            </p>
            <p>
              CalcLume does not offer phone support or live chat at this time.
              There is no contact form — email is the only supported contact
              method on the current site.
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}
