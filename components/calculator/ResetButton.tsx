"use client";

type ResetButtonProps = {
  onReset: () => void;
  label?: string;
  disabled?: boolean;
};

export function ResetButton({
  onReset,
  label = "Reset inputs",
  disabled = false,
}: ResetButtonProps) {
  return (
    <button
      type="button"
      onClick={onReset}
      disabled={disabled}
      aria-disabled={disabled}
      className="inline-flex min-h-11 items-center rounded-md border border-border bg-white px-4 py-2 text-sm font-medium text-ink hover:bg-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lume-teal disabled:cursor-not-allowed disabled:opacity-50"
    >
      {label}
    </button>
  );
}
