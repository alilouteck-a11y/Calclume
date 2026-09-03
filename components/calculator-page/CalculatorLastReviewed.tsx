import Link from "next/link";

type CalculatorLastReviewedProps = {
  isoDate: string;
};

function formatReviewDate(isoDate: string): string {
  const [year, month, day] = isoDate.split("-").map(Number);
  if (!year || !month || !day) {
    return isoDate;
  }

  return new Date(Date.UTC(year, month - 1, day)).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function CalculatorLastReviewed({ isoDate }: CalculatorLastReviewedProps) {
  return (
    <p className="text-xs text-muted">
      Last reviewed: {formatReviewDate(isoDate)}. See{" "}
      <Link
        href="/editorial-policy/"
        className="font-medium text-lume-teal hover:text-teal-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lume-teal"
      >
        editorial policy
      </Link>
      .
    </p>
  );
}
