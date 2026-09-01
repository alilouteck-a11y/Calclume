"use client";

import { useId } from "react";
import { fenceMultiplierOptions } from "@/lib/calculators/outlier-iqr-config";
import type { FenceMultiplier } from "@/lib/calculators/outlier-iqr-schema";

type FenceMultiplierSelectorProps = {
  value: FenceMultiplier;
  onChange: (value: FenceMultiplier) => void;
};

export function FenceMultiplierSelector({
  value,
  onChange,
}: FenceMultiplierSelectorProps) {
  const id = useId();
  const helperId = `${id}-helper`;
  const selected = fenceMultiplierOptions.find((option) => option.value === value);

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-ink">
        Fence multiplier
      </label>
      <p id={helperId} className="mt-1 text-sm text-muted">
        {selected?.helper ??
          "Changing the multiplier adjusts fence boundaries, not quartiles."}
      </p>
      <select
        id={id}
        value={String(value)}
        onChange={(event) => onChange(Number(event.target.value) as FenceMultiplier)}
        aria-describedby={helperId}
        className="mt-2 w-full min-h-11 rounded-md border border-border bg-white px-3 py-2 text-sm text-ink focus:border-lume-teal focus:outline-none focus:ring-2 focus:ring-lume-teal/20"
      >
        {fenceMultiplierOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
