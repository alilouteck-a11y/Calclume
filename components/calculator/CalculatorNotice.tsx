import type { ReactNode } from "react";

type CalculatorNoticeVariant = "info" | "warning" | "error";

type CalculatorNoticeProps = {
  children: ReactNode;
  variant?: CalculatorNoticeVariant;
  title?: string;
};

const variantClasses: Record<CalculatorNoticeVariant, string> = {
  info: "border-border bg-paper text-ink",
  warning: "border-warm-signal/50 bg-warm-signal/10 text-ink",
  error: "border-error/30 bg-error/5 text-error",
};

export function CalculatorNotice({
  children,
  variant = "info",
  title,
}: CalculatorNoticeProps) {
  return (
    <div
      role={variant === "error" ? "alert" : "note"}
      className={`rounded-md border p-4 text-sm ${variantClasses[variant]}`}
    >
      {title && <p className="mb-1 font-semibold">{title}</p>}
      {children}
    </div>
  );
}
