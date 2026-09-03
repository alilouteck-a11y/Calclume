import Link from "next/link";

type CalculatorPageIntroProps = {
  categoryName: string;
  categoryHref: string;
  title: string;
  description: string;
};

export function CalculatorPageIntro({
  categoryName,
  categoryHref,
  title,
  description,
}: CalculatorPageIntroProps) {
  return (
    <div>
      <p className="text-sm font-medium text-muted">
        <Link
          href={categoryHref}
          className="text-lume-teal hover:text-teal-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lume-teal"
        >
          {categoryName}
        </Link>
        <span aria-hidden="true"> · </span>
        Calculator
      </p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
        {title}
      </h1>
      <p className="mt-3 max-w-3xl text-base text-muted sm:text-lg">{description}</p>
    </div>
  );
}
