import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export function HomeTrustStrip() {
  return (
    <Section ariaLabelledby="home-trust-strip-heading" className="bg-white py-8 sm:py-10">
      <Container>
        <div className="rounded-lg border border-border bg-paper px-5 py-4 sm:px-8">
          <h2 id="home-trust-strip-heading" className="sr-only">
            Trust and methodology
          </h2>
          <ul className="flex flex-col items-center gap-3 text-sm text-muted sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-2 sm:text-base">
            <li className="font-medium text-ink">Local calculation</li>
            <li aria-hidden="true" className="hidden text-border sm:inline">
              ·
            </li>
            <li>
              <Link
                href="/methodology/"
                className="font-semibold text-lume-teal hover:text-teal-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lume-teal"
              >
                Documented methodology
              </Link>
            </li>
            <li aria-hidden="true" className="hidden text-border sm:inline">
              ·
            </li>
            <li>
              <Link
                href="/privacy/"
                className="font-semibold text-lume-teal hover:text-teal-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lume-teal"
              >
                Privacy-first
              </Link>
            </li>
          </ul>
        </div>
      </Container>
    </Section>
  );
}
