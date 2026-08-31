import type { ReactNode } from "react";

type BadgeProps = {
  children: ReactNode;
  variant?: "default" | "preparing" | "expansion";
};

const variantClasses = {
  default: "bg-paper text-muted border-border",
  preparing: "bg-warm-signal/20 text-ink border-warm-signal/40",
  expansion: "bg-paper text-muted border-border",
};

export function Badge({ children, variant = "default" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-sm border px-2 py-0.5 text-xs font-medium ${variantClasses[variant]}`}
    >
      {children}
    </span>
  );
}
