type InterpretationPanelProps = {
  interpretation: string;
  title?: string;
};

export function InterpretationPanel({
  interpretation,
  title = "Interpretation",
}: InterpretationPanelProps) {
  return (
    <aside
      aria-labelledby="interpretation-heading"
      className="rounded-md border border-lume-teal-bright/30 bg-lume-teal-bright/5 p-4"
    >
      <h3 id="interpretation-heading" className="text-base font-semibold text-ink">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-ink">{interpretation}</p>
    </aside>
  );
}
