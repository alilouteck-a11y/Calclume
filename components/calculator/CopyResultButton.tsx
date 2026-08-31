"use client";

import { useState } from "react";

type CopyResultButtonProps = {
  value: string;
  label?: string;
  disabled?: boolean;
};

export function CopyResultButton({
  value,
  label = "Copy result",
  disabled = false,
}: CopyResultButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    if (disabled) {
      return;
    }

    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="inline-flex flex-col items-start gap-1">
      <button
        type="button"
        onClick={handleCopy}
        disabled={disabled}
        aria-disabled={disabled}
        className="inline-flex min-h-11 items-center rounded-md border border-border bg-white px-4 py-2 text-sm font-medium text-ink hover:bg-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lume-teal disabled:cursor-not-allowed disabled:opacity-50"
      >
        {label}
      </button>
      {copied && (
        <span role="status" aria-live="polite" className="text-sm text-muted">
          Copied to clipboard
        </span>
      )}
    </div>
  );
}
