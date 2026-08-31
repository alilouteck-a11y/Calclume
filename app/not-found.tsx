import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Page not found",
  description: "The page you are looking for does not exist on CalcLume.",
  path: "/404/",
  noIndex: true,
});

export default function NotFound() {
  return (
    <Container as="main" className="py-16 sm:py-24">
      <div className="mx-auto max-w-lg text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-lume-teal">
          404
        </p>
        <h1 className="mt-2 text-3xl font-bold text-ink">Page not found</h1>
        <p className="mt-3 text-muted">
          The page you are looking for does not exist or may have been moved.
        </p>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Button href="/">Return home</Button>
          <Link
            href="/calculators/"
            className="text-sm font-semibold text-lume-teal hover:text-teal-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lume-teal"
          >
            Browse calculators
          </Link>
        </div>
      </div>
    </Container>
  );
}
