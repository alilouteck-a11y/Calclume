import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { StructuredData } from "@/components/seo/StructuredData";
import type { BreadcrumbItem } from "@/lib/structured-data";

type CalculatorPageShellProps = {
  structuredData: Record<string, unknown>[];
  breadcrumbs: BreadcrumbItem[];
  intro: ReactNode;
  trust: ReactNode;
  workspace: ReactNode;
  educationNav?: ReactNode;
  education: ReactNode;
  sources: ReactNode;
  related: ReactNode;
  lastReviewed: ReactNode;
};

export function CalculatorPageShell({
  structuredData,
  breadcrumbs,
  intro,
  trust,
  workspace,
  educationNav,
  education,
  sources,
  related,
  lastReviewed,
}: CalculatorPageShellProps) {
  return (
    <>
      <StructuredData data={structuredData} />
      <div className="border-b border-border bg-white">
        <Container className="py-5 sm:py-6">
          <div className="mb-3">
            <Breadcrumbs items={breadcrumbs} />
          </div>
          {intro}
        </Container>
      </div>
      <div className="py-6 sm:py-8">
        <Container>
          {trust}
          <div className="mt-6">{workspace}</div>
          {educationNav}
          {education}
          <div className="mt-10 space-y-8 border-t border-border pt-10">
            {sources}
            {related}
            {lastReviewed}
          </div>
        </Container>
      </div>
    </>
  );
}
