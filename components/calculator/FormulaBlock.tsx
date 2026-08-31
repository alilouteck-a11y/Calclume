type FormulaBlockProps = {
  formula: string;
  label?: string;
};

export function FormulaBlock({ formula, label = "Formula" }: FormulaBlockProps) {
  return (
    <figure className="rounded-md border border-border bg-paper p-4">
      <figcaption className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">
        {label}
      </figcaption>
      <pre className="formula-block m-0 whitespace-pre-wrap text-ink">{formula}</pre>
    </figure>
  );
}
