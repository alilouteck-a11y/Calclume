export type ResultTableColumn<T extends Record<string, string | number>> = {
  key: keyof T & string;
  header: string;
  align?: "left" | "right";
};

type ResultTableProps<T extends Record<string, string | number>> = {
  caption: string;
  columns: ResultTableColumn<T>[];
  rows: T[];
};

export function ResultTable<T extends Record<string, string | number>>({
  caption,
  columns,
  rows,
}: ResultTableProps<T>) {
  return (
    <div className="table-scroll">
      <table className="w-full border-collapse text-sm">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="border-b border-border bg-paper">
            {columns.map((column) => (
              <th
                key={column.key}
                scope="col"
                className={`px-3 py-2 font-semibold text-ink ${
                  column.align === "right" ? "text-right" : "text-left"
                }`}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className="border-b border-border">
              {columns.map((column) => (
                <td
                  key={column.key}
                  className={`px-3 py-2 text-ink ${
                    column.align === "right" ? "text-right font-mono" : "text-left"
                  }`}
                >
                  {row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
