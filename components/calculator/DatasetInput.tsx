"use client";

import { useId, type Ref } from "react";

type DatasetInputProps = {
  label: string;
  description?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
  disabled?: boolean;
  textareaRef?: Ref<HTMLTextAreaElement>;
};

export function DatasetInput({
  label,
  description,
  value,
  onChange,
  error,
  placeholder = "Enter values separated by commas",
  disabled = false,
  textareaRef,
}: DatasetInputProps) {
  const id = useId();
  const descriptionId = description ? `${id}-description` : undefined;
  const errorId = error ? `${id}-error` : undefined;

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
      <textarea
        ref={textareaRef}
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        aria-describedby={[descriptionId, errorId].filter(Boolean).join(" ") || undefined}
        aria-invalid={error ? true : undefined}
        rows={3}
        className="mt-2 w-full min-h-11 rounded-md border border-border bg-white px-3 py-2 text-sm text-ink placeholder:text-muted focus:border-lume-teal focus:outline-none focus:ring-2 focus:ring-lume-teal/20 disabled:cursor-not-allowed disabled:opacity-60"
      />
      {error && (
        <p id={errorId} role="alert" className="mt-1 text-sm text-error">
          {error}
        </p>
      )}
    </div>
  );
}
