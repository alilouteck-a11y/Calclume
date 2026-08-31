type StructuredDataProps = {
  data: Record<string, unknown> | Record<string, unknown>[] | null;
};

export function StructuredData({ data }: StructuredDataProps) {
  if (!data) {
    return null;
  }

  const items = Array.isArray(data) ? data : [data];

  return (
    <>
      {items.map((item, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  );
}
