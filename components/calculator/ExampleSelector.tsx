"use client";

import { useId } from "react";

export type ExampleOption = {
  id: string;
  label: string;
  description?: string;
};

type ExampleSelectorProps = {
  label: string;
  options: ExampleOption[];
  value: string;
  onChange: (value: string) => void;
  description?: string;
  placeholder?: ExampleOption;
};

export function ExampleSelector({
  label,
  options,
  value,
  onChange,
  description,
  placeholder,
}: ExampleSelectorProps) {
  const id = useId();
  const descriptionId = description ? `${id}-description` : undefined;

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-ink">
        {label}
      </label>
      {description && (
        <p id={descriptionId} className="mt-1 text-sm text-muted">
          {description}
        </p>
      )}
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-describedby={descriptionId}
        className="mt-2 w-full min-h-11 rounded-md border border-border bg-white px-3 py-2 text-sm text-ink focus:border-lume-teal focus:outline-none focus:ring-2 focus:ring-lume-teal/20"
      >
        {placeholder && (
          <option value={placeholder.id}>{placeholder.label}</option>
        )}
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
