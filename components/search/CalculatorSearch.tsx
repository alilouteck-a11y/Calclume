"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  getSearchableCategoryFilters,
  getSearchStatusMessage,
  rankSearchResults,
  SEARCH_DEBOUNCE_MS,
  SEARCH_MIN_QUERY_LENGTH,
  type SearchableCalculator,
} from "@/lib/calculator-search-index";
import type { CategoryId } from "@/lib/calculator-catalog";

type CalculatorSearchProps = {
  searchIndex: readonly SearchableCalculator[];
  variant?: "hero" | "header" | "directory";
  inputId?: string;
  listboxId?: string;
  enableSlashShortcut?: boolean;
  onClose?: () => void;
  autoFocus?: boolean;
  className?: string;
};

function useDebouncedValue<T>(value: T, delayMs: number): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = window.setTimeout(() => setDebounced(value), delayMs);
    return () => window.clearTimeout(timer);
  }, [value, delayMs]);

  return debounced;
}

export function CalculatorSearch({
  searchIndex,
  variant = "hero",
  inputId: inputIdProp,
  listboxId: listboxIdProp,
  enableSlashShortcut = false,
  onClose,
  autoFocus = false,
  className = "",
}: CalculatorSearchProps) {
  const router = useRouter();
  const generatedInputId = useId();
  const generatedListboxId = useId();
  const inputId = inputIdProp ?? generatedInputId;
  const listboxId = listboxIdProp ?? generatedListboxId;
  const statusId = `${inputId}-status`;

  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<CategoryId | "all">("all");
  const [keyboardIndex, setKeyboardIndex] = useState(-1);
  const [isExpanded, setIsExpanded] = useState(false);

  const debouncedQuery = useDebouncedValue(query, SEARCH_DEBOUNCE_MS);
  const categoryFilters = useMemo(
    () => getSearchableCategoryFilters(searchIndex),
    [searchIndex],
  );

  const results = useMemo(
    () => rankSearchResults(debouncedQuery, searchIndex, categoryFilter),
    [debouncedQuery, searchIndex, categoryFilter],
  );

  const normalizedQuery = debouncedQuery.trim().toLowerCase();
  const showResults = normalizedQuery.length >= SEARCH_MIN_QUERY_LENGTH;
  const activeCategoryLabel =
    categoryFilter === "all"
      ? undefined
      : categoryFilters.find((filter) => filter.id === categoryFilter)?.label;

  const queryNeedsMoreCharacters =
    query.trim().length > 0 && query.trim().length < SEARCH_MIN_QUERY_LENGTH;

  const statusMessage = showResults
    ? getSearchStatusMessage(debouncedQuery, results.length, activeCategoryLabel)
    : "";

  const focusInput = useCallback(() => {
    inputRef.current?.focus();
    setIsExpanded(true);
  }, []);

  useEffect(() => {
    if (!enableSlashShortcut) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "/" || event.metaKey || event.ctrlKey || event.altKey) {
        return;
      }

      const target = event.target;
      if (
        target instanceof HTMLElement &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }

      event.preventDefault();
      focusInput();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [enableSlashShortcut, focusInput]);

  const highlightedIndex =
    keyboardIndex >= 0 && keyboardIndex < results.length
      ? keyboardIndex
      : results.length > 0
        ? 0
        : -1;

  const handleEscape = () => {
    if (query.length > 0) {
      setQuery("");
      setKeyboardIndex(-1);
      inputRef.current?.focus();
      return;
    }

    setIsExpanded(false);
    onClose?.();
    inputRef.current?.blur();
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      handleEscape();
      return;
    }

    if (!showResults || results.length === 0) {
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setKeyboardIndex((current) => {
        const base = current >= 0 ? current : 0;
        return (base + 1) % results.length;
      });
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setKeyboardIndex((current) => {
        const base = current >= 0 ? current : 0;
        return base <= 0 ? results.length - 1 : base - 1;
      });
      return;
    }

    if (event.key === "Enter" && highlightedIndex >= 0) {
      event.preventDefault();
      const target = results[highlightedIndex];
      if (target) {
        setIsExpanded(false);
        onClose?.();
        router.push(target.route);
      }
    }
  };

  const showCategoryFilters = categoryFilters.length > 1;
  const isHeaderVariant = variant === "header";

  return (
    <div className={`relative ${className}`}>
      <label htmlFor={inputId} className="sr-only">
        Search calculators
      </label>
      <div className="flex gap-2">
        <input
          ref={inputRef}
          id={inputId}
          type="search"
          role="combobox"
          aria-expanded={showResults && isExpanded}
          aria-controls={listboxId}
          aria-activedescendant={
            highlightedIndex >= 0
              ? `${listboxId}-option-${highlightedIndex}`
              : undefined
          }
          aria-autocomplete="list"
          aria-describedby={statusId}
          placeholder="Search calculators…"
          value={query}
          autoComplete="off"
          autoFocus={autoFocus}
          onChange={(event) => {
            setQuery(event.target.value);
            setIsExpanded(true);
            setKeyboardIndex(-1);
          }}
          onFocus={() => setIsExpanded(true)}
          onKeyDown={handleInputKeyDown}
          className={`min-h-11 w-full rounded-md border border-border bg-white px-4 py-2 text-base text-ink placeholder:text-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lume-teal ${
            isHeaderVariant ? "text-sm" : ""
          }`}
        />
        {query.length > 0 && (
          <button
            type="button"
            aria-label="Clear search"
            onClick={() => {
              setQuery("");
              setKeyboardIndex(-1);
              inputRef.current?.focus();
            }}
            className="inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-md border border-border bg-white px-3 text-sm font-medium text-ink hover:bg-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lume-teal"
          >
            Clear
          </button>
        )}
      </div>

      {showCategoryFilters && (
        <div
          className="mt-3 flex flex-wrap gap-2"
          role="group"
          aria-label="Filter by category"
        >
          {categoryFilters.map((filter) => {
            const isActive = categoryFilter === filter.id;
            return (
              <button
                key={filter.id}
                type="button"
                aria-pressed={isActive}
                onClick={() => setCategoryFilter(filter.id)}
                className={`inline-flex min-h-11 items-center rounded-md border px-3 text-sm font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lume-teal ${
                  isActive
                    ? "border-lume-teal bg-lume-teal text-white"
                    : "border-border bg-white text-ink hover:bg-paper"
                }`}
              >
                {filter.label}
              </button>
            );
          })}
        </div>
      )}

      <p id={statusId} role="status" aria-live="polite" className="sr-only">
        {statusMessage}
      </p>

      {queryNeedsMoreCharacters && (
        <p className="mt-2 text-sm text-muted" aria-live="polite">
          Type at least {SEARCH_MIN_QUERY_LENGTH} characters to search published
          calculators.
        </p>
      )}

      {showResults && isExpanded && (
        <div
          className={`mt-3 scroll-mt-20 ${
            isHeaderVariant
              ? "absolute left-0 right-0 z-50 rounded-lg border border-border bg-white p-2 shadow-md"
              : ""
          }`}
        >
          {results.length === 0 ? (
            <div className="rounded-md border border-border bg-paper px-4 py-3 text-sm text-muted">
              <p>No calculators match &ldquo;{query.trim()}&rdquo;.</p>
              <p className="mt-2">
                <Link
                  href="/calculators/"
                  className="font-semibold text-lume-teal hover:text-teal-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lume-teal"
                >
                  Browse all calculators →
                </Link>
              </p>
            </div>
          ) : (
            <ul
              id={listboxId}
              role="listbox"
              aria-label="Calculator search results"
              className="divide-y divide-border rounded-md border border-border bg-white"
            >
              {results.map((entry, index) => (
                <li
                  key={entry.id}
                  id={`${listboxId}-option-${index}`}
                  role="option"
                  aria-selected={index === highlightedIndex}
                >
                  <Link
                    href={entry.route}
                    onClick={() => {
                      setIsExpanded(false);
                      onClose?.();
                    }}
                    className={`block min-h-11 px-4 py-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-lume-teal ${
                      index === highlightedIndex ? "bg-paper" : "hover:bg-paper"
                    }`}
                  >
                    <span className="block font-semibold text-ink">{entry.name}</span>
                    <span className="mt-0.5 block text-xs text-muted">
                      {entry.categoryName}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}

          {results.length > 0 && (
            <p className="mt-2 text-sm">
              <Link
                href="/calculators/"
                className="font-semibold text-lume-teal hover:text-teal-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lume-teal"
              >
                View all in directory →
              </Link>
            </p>
          )}
        </div>
      )}

      {!showResults && query.length === 0 && variant !== "header" && (
        <p className="mt-2 text-sm text-muted">
          Type at least 2 characters to search published calculators.
        </p>
      )}
    </div>
  );
}

export function focusHomeSearchInput(): void {
  const input = document.getElementById("home-search-input");
  if (input instanceof HTMLInputElement) {
    input.focus();
    input.scrollIntoView({ block: "center" });
  }
}
