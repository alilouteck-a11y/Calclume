import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";

type RelatedCalculatorCardProps = {
  name: string;
  description: string;
  status?: "available" | "preparing";
};

export function RelatedCalculatorCard({
  name,
  description,
  status = "preparing",
}: RelatedCalculatorCardProps) {
  return (
    <Card as="article">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-base font-semibold text-ink">{name}</h3>
        {status === "preparing" && (
          <Badge variant="preparing">In preparation</Badge>
        )}
      </div>
      <p className="mt-2 text-sm text-muted">{description}</p>
    </Card>
  );
}
