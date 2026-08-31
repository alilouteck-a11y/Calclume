import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { getCalculatorHref } from "@/lib/published-calculators";

type CalculatorCardProps = {
  slug: string;
  name: string;
  description: string;
  status: "launch-candidate" | "expansion-candidate" | "published";
};

export function CalculatorCard({
  slug,
  name,
  description,
  status,
}: CalculatorCardProps) {
  const href = getCalculatorHref(slug);
  const isPublished = status === "published" && href;

  return (
    <Card as="article" className="h-full">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-base font-semibold text-ink">
          {isPublished ? (
            <Link
              href={href}
              className="hover:text-lume-teal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lume-teal"
            >
              {name}
            </Link>
          ) : (
            name
          )}
        </h3>
        <Badge
          variant={
            status === "published"
              ? "default"
              : status === "launch-candidate"
                ? "preparing"
                : "expansion"
          }
        >
          {status === "published"
            ? "Available"
            : status === "launch-candidate"
              ? "In preparation"
              : "Planned"}
        </Badge>
      </div>
      <p className="mt-2 text-sm text-muted">{description}</p>
      {isPublished ? (
        <p className="mt-3">
          <Link
            href={href}
            className="text-sm font-semibold text-lume-teal hover:text-teal-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lume-teal"
          >
            Open calculator
          </Link>
        </p>
      ) : (
        <p className="mt-3 text-xs text-muted">
          This calculator is being prepared and is not yet available.
        </p>
      )}
    </Card>
  );
}
