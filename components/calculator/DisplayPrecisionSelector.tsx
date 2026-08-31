"use client";

import { useId } from "react";
import {
  DEFAULT_DISPLAY_PRECISION,
  DISPLAY_PRECISION_OPTIONS,
  type DisplayPrecision,
  isDisplayPrecision,
} from "@/lib/calculators/format-number";

type DisplayPrecisionSelectorProps = {
  value: DisplayPrecision;
  onChange: (value: DisplayPrecision) => void;
};

export function DisplayPrecisionSelector({
  value,
  onChange,
}: DisplayPrecisionSelectorProps) {
  const id = useId();

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-ink">
        Decimal places
      </label>
      <select
        id={id}
        value={value}
        onChange={(event) => {
          const next = Number(event.target.value);
          if (isDisplayPrecision(next)) {
            onChange(next);
          }
        }}
        className="mt-2 w-full min-h-11 rounded-md border border-border bg-white px-3 py-2 text-sm text-ink focus:border-lume-teal focus:outline-none focus:ring-2 focus:ring-lume-teal/20"
      >
        {DISPLAY_PRECISION_OPTIONS.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export { DEFAULT_DISPLAY_PRECISION };
