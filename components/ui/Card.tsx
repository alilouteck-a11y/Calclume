import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "article";
};

export function Card({ children, className = "", as: Component = "div" }: CardProps) {
  return (
    <Component
      className={`rounded-lg border border-border bg-white p-5 shadow-sm ${className}`}
    >
      {children}
    </Component>
  );
}
