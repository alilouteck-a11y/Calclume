export type SourceItem = {
  title: string;
  publisher?: string;
  url?: string;
  note?: string;
};

type SourceListProps = {
  sources: SourceItem[];
  title?: string;
};

export function SourceList({ sources, title = "Sources" }: SourceListProps) {
  return (
    <section aria-labelledby="source-list-heading">
      <h3 id="source-list-heading" className="text-base font-semibold text-ink">
        {title}
      </h3>
      <ul className="mt-3 space-y-2">
        {sources.map((source, index) => (
          <li key={`${source.title}-${index}`} className="text-sm text-muted">
            {source.url ? (
              <a
                href={source.url}
                className="font-medium text-lume-teal hover:text-teal-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lume-teal"
                rel="noopener noreferrer"
                target="_blank"
              >
                {source.title}
              </a>
            ) : (
              <span className="font-medium text-ink">{source.title}</span>
            )}
            {source.publisher && (
              <span> — {source.publisher}</span>
            )}
            {source.note && <span className="block text-xs">{source.note}</span>}
          </li>
        ))}
      </ul>
    </section>
  );
}
