import type { ReactNode } from "react";

type CalculatorShellProps = {
  title: string;
  description?: string;
  children: ReactNode;
};

export function CalculatorShell({
  title,
  description,
  children,
}: CalculatorShellProps) {
  return (
    <article className="rounded-lg border border-border border-l-[3px] border-l-[var(--category-accent)] bg-white shadow-sm">
      <header className="border-b border-border px-5 py-4 sm:px-6">
        <h2 className="text-xl font-semibold text-ink">{title}</h2>
        {description && (
          <p className="mt-1 text-sm text-muted">{description}</p>
        )}
      </header>
      <div className="p-5 sm:p-6">{children}</div>
    </article>
  );
}
