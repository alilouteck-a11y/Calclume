import Link from "next/link";
import type { ReactNode } from "react";

export type TrustStripItem = {
  label: string;
  href?: string;
  detail?: string;
};

type CalculatorTrustStripProps = {
  items: readonly TrustStripItem[];
  methodNote: ReactNode;
};

export function CalculatorTrustStrip({ items, methodNote }: CalculatorTrustStripProps) {
  return (
    <section aria-labelledby="calculator-trust-heading">
      <h2 id="calculator-trust-heading" className="sr-only">
        How this calculator works
      </h2>
      <ul className="flex flex-col gap-2 rounded-md border border-border bg-paper px-4 py-3 text-sm text-ink sm:flex-row sm:flex-wrap sm:items-baseline sm:gap-x-4 sm:gap-y-2">
        {items.map((item) => (
          <li key={item.label} className="min-w-0">
            {item.href ? (
              <Link
                href={item.href}
                className="font-medium text-lume-teal hover:text-teal-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lume-teal"
              >
                {item.label}
              </Link>
            ) : (
              <span className="font-medium">{item.label}</span>
            )}
            {item.detail ? (
              <span className="mt-0.5 block text-muted sm:mt-0 sm:inline">
                {" "}
                — {item.detail}
              </span>
            ) : null}
          </li>
        ))}
      </ul>
      <p className="mt-3 max-w-3xl text-sm text-muted">{methodNote}</p>
    </section>
  );
}
