import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

type ButtonProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
} & (
  | ({ href: string } & Omit<ComponentProps<typeof Link>, "className">)
  | ({ href?: undefined } & ComponentProps<"button">)
);

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-lume-teal text-white hover:bg-teal-hover border border-transparent",
  secondary:
    "bg-white text-ink border border-border hover:border-lume-teal hover:text-lume-teal",
  ghost: "bg-transparent text-ink hover:bg-paper border border-transparent",
};

const baseClasses =
  "inline-flex min-h-11 items-center justify-center rounded-md px-5 py-2.5 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lume-teal";

export function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`;

  if ("href" in props && props.href) {
    const { href, ...linkProps } = props;
    return (
      <Link href={href} className={classes} {...linkProps}>
        {children}
      </Link>
    );
  }

  const buttonProps = props as ComponentProps<"button">;
  return (
    <button type="button" className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
