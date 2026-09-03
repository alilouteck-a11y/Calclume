type EducationNavItem = {
  id: string;
  label: string;
};

type CalculatorEducationNavProps = {
  items: readonly EducationNavItem[];
};

export function CalculatorEducationNav({ items }: CalculatorEducationNavProps) {
  if (items.length < 5) {
    return null;
  }

  return (
    <nav aria-label="On this page" className="mt-10 border-t border-border pt-8">
      <p className="text-sm font-semibold text-ink">On this page</p>
      <ol className="mt-3 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-5 sm:gap-y-2">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className="text-sm font-medium text-lume-teal hover:text-teal-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lume-teal"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
