import Link from "next/link";
import type { ReactNode } from "react";
import { SourceList, type SourceItem } from "@/components/calculator/SourceList";

type CalculatorSourcesSectionProps = {
  sources: readonly SourceItem[];
  children: ReactNode;
};

export function CalculatorSourcesSection({
  sources,
  children,
}: CalculatorSourcesSectionProps) {
  return (
    <section id="sources" aria-labelledby="sources-methodology-heading">
      <h2
        id="sources-methodology-heading"
        className="scroll-mt-20 text-lg font-semibold text-ink"
      >
        Sources and methodology
      </h2>
      <p className="mt-3 max-w-3xl text-sm text-muted">
        Formula selection follows CalcLume’s{" "}
        <Link
          href="/sources/"
          className="font-medium text-lume-teal hover:text-teal-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lume-teal"
        >
          source hierarchy
        </Link>
        . Verification and review practices are described on the{" "}
        <Link
          href="/methodology/"
          className="font-medium text-lume-teal hover:text-teal-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lume-teal"
        >
          methodology
        </Link>{" "}
        page. {children}
      </p>
      <div className="mt-4">
        <SourceList sources={[...sources]} title="References consulted" />
      </div>
    </section>
  );
}
