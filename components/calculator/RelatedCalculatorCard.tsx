import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";

type RelatedCalculatorCardProps = {
  name: string;
  description: string;
  status?: "available" | "preparing";
  href?: string;
};

export function RelatedCalculatorCard({
  name,
  description,
  status = "preparing",
  href,
}: RelatedCalculatorCardProps) {
  const isLinked = status === "available" && Boolean(href);

  return (
    <Card as="article">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-base font-semibold text-ink">
          {isLinked ? (
            <Link
              href={href!}
              className="hover:text-lume-teal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lume-teal"
            >
              {name}
            </Link>
          ) : (
            name
          )}
        </h3>
        {status === "preparing" && (
          <Badge variant="preparing">In preparation</Badge>
        )}
      </div>
      <p className="mt-2 text-sm text-muted">{description}</p>
    </Card>
  );
}
