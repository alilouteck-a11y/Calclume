"use client";

import { useId } from "react";
import { quartileMethodOptions } from "@/lib/calculators/outlier-iqr-config";
import type { QuartileMethod } from "@/lib/calculators/outlier-iqr-schema";

type QuartileMethodSelectorProps = {
  value: QuartileMethod;
  onChange: (value: QuartileMethod) => void;
};

export function QuartileMethodSelector({
  value,
  onChange,
}: QuartileMethodSelectorProps) {
  const id = useId();
  const helperId = `${id}-helper`;
  const selected = quartileMethodOptions.find((option) => option.value === value);

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-ink">
        Quartile method
      </label>
      <p id={helperId} className="mt-1 text-sm text-muted">
        {selected?.helper ??
          "Different calculators use different quartile conventions, so Q1 and Q3 may not match every source."}
      </p>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value as QuartileMethod)}
        aria-describedby={helperId}
        className="mt-2 w-full min-h-11 rounded-md border border-border bg-white px-3 py-2 text-sm text-ink focus:border-lume-teal focus:outline-none focus:ring-2 focus:ring-lume-teal/20"
      >
        {quartileMethodOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
