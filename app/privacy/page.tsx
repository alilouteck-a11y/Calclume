import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { createPageMetadata } from "@/lib/metadata";
import { StructuredData } from "@/components/seo/StructuredData";
import { getBreadcrumbSchema } from "@/lib/structured-data";

export const metadata = createPageMetadata({
  title: "Privacy Policy",
  description:
    "How CalcLume handles your data today: no accounts, no analytics or ads, and calculator inputs that stay in your browser.",
  path: "/privacy/",
});

export default function PrivacyPage() {
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Privacy", path: "/privacy/" },
  ];

  return (
    <>
      <StructuredData data={getBreadcrumbSchema(breadcrumbs)} />
      <PageHeader
        title="Privacy Policy"
        description="What CalcLume does and does not do with your data."
        breadcrumbs={breadcrumbs}
      />
      <Section>
        <Container>
          <div className="prose-content max-w-3xl">
            <p>
              <strong>Last updated:</strong> August 2026
            </p>

            <h2>Overview</h2>
            <p>
              CalcLume is designed with privacy as a core principle. The current
              production site is a static website with no user accounts, no backend
              that receives calculator inputs, and no CalcLume-operated data store for
              calculator datasets.
            </p>

            <h2>Calculator data</h2>
            <p>
              All calculations run locally in your browser. Data you enter into a
              calculator is not transmitted to CalcLume servers and is not stored by
              CalcLume. When you close or refresh the page, entered values are cleared
              unless your browser retains them through its own caching mechanisms.
            </p>

            <h2>Accounts</h2>
            <p>
              CalcLume does not offer user accounts, registration, or authentication.
              We do not collect names, email addresses, or other personal information
              through the website itself.
            </p>

            <h2>Analytics and advertising</h2>
            <p>
              The current production build does not include analytics trackers,
              advertising networks, or affiliate link systems. If these are added later,
              this policy will be updated before they are activated.
            </p>

            <h2>Cookies</h2>
            <p>
              CalcLume does not set functional cookies in the current static
              implementation. Your browser or hosting provider may set technical cookies
              as part of content delivery; CalcLume does not control or use these for
              tracking.
            </p>

            <h2>Contact email</h2>
            <p>
              If you contact us by email, we receive the information you choose to
              include in your message. We use this only to respond to your inquiry and
              do not add it to a marketing list.
            </p>

            <h2>Changes to this policy</h2>
            <p>
              We will update this page if our data practices change. Material changes
              will be noted with a revised date at the top of this page.
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}
