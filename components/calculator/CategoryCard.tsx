import Link from "next/link";
import { Card } from "@/components/ui/Card";

type CategoryCardProps = {
  name: string;
  description: string;
  href: string;
  calculatorCount?: number;
};

export function CategoryCard({
  name,
  description,
  href,
  calculatorCount,
}: CategoryCardProps) {
  return (
    <Card as="article" className="h-full">
      <h3 className="text-lg font-semibold text-ink">
        <Link
          href={href}
          className="hover:text-lume-teal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lume-teal"
        >
          {name}
        </Link>
      </h3>
      <p className="mt-2 text-sm text-muted">{description}</p>
      {calculatorCount !== undefined && (
        <p className="mt-3 text-xs font-medium text-muted">
          {calculatorCount} calculators in preparation
        </p>
      )}
    </Card>
  );
}
