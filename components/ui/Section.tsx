import type { ReactNode } from "react";

type SectionProps = {
  children: ReactNode;
  className?: string;
  id?: string;
  ariaLabelledby?: string;
};

export function Section({
  children,
  className = "",
  id,
  ariaLabelledby,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={ariaLabelledby}
      className={`py-10 sm:py-16 ${className}`}
    >
      {children}
    </section>
  );
}
