import Link from "next/link";
import { RelatedCalculatorCard } from "@/components/calculator/RelatedCalculatorCard";
import { isPublished, type CalculatorRecord } from "@/lib/calculator-catalog";
import { getCalculatorHref } from "@/lib/published-calculators";

type CalculatorRelatedSectionProps = {
  calculators: readonly CalculatorRecord[];
  collectionHref: string;
  collectionLabel: string;
};

export function CalculatorRelatedSection({
  calculators,
  collectionHref,
  collectionLabel,
}: CalculatorRelatedSectionProps) {
  const publishedRelated = calculators.flatMap((calculator) => {
    if (!isPublished(calculator)) {
      return [];
    }

    const href = getCalculatorHref(calculator.slug);
    if (!href) {
      return [];
    }

    return [{ calculator, href }];
  });

  return (
    <section aria-labelledby="related-calculators-heading">
      <h2 id="related-calculators-heading" className="text-lg font-semibold text-ink">
        Related calculators
      </h2>
      <p className="mt-2 max-w-3xl text-sm text-muted">
        Related published tools in this collection.
      </p>
      {publishedRelated.length > 0 ? (
        <ul className="mt-4 grid max-w-xl gap-4 sm:grid-cols-2">
          {publishedRelated.map(({ calculator, href }) => (
            <li key={calculator.id} className="min-w-0">
              <RelatedCalculatorCard
                name={calculator.name}
                description={calculator.description}
                status="available"
                href={href}
              />
            </li>
          ))}
        </ul>
      ) : null}
      <p className="mt-4 text-sm text-muted">
        Browse the{" "}
        <Link
          href={collectionHref}
          className="font-medium text-lume-teal hover:text-teal-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lume-teal"
        >
          {collectionLabel}
        </Link>
        .
      </p>
    </section>
  );
}
