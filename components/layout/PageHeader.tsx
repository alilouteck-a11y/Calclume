import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "./Breadcrumbs";
import type { BreadcrumbItem } from "@/lib/structured-data";

type PageHeaderProps = {
  title: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
  children?: ReactNode;
};

export function PageHeader({
  title,
  description,
  breadcrumbs,
  children,
}: PageHeaderProps) {
  return (
    <div className="border-b border-border bg-white">
      <Container className="py-8 sm:py-10">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <div className="mb-4">
            <Breadcrumbs items={breadcrumbs} />
          </div>
        )}
        <h1 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          {title}
        </h1>
        {description && (
          <p className="mt-3 max-w-3xl text-lg text-muted">{description}</p>
        )}
        {children}
      </Container>
    </div>
  );
}
