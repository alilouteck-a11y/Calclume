import type { QuartileMethod } from "@/lib/calculators/outlier-iqr-schema";

export type QuartileTriple = {
  q1: number;
  median: number;
  q3: number;
};

export function medianOfSorted(sorted: number[]): number {
  const n = sorted.length;
  if (n === 0) {
    throw new RangeError("Cannot compute median of an empty array.");
  }

  const mid = Math.floor(n / 2);

  if (n % 2 === 1) {
    return sorted[mid];
  }

  return (sorted[mid - 1] + sorted[mid]) / 2;
}

export function exclusiveHalvesQuartiles(sorted: number[]): QuartileTriple {
  const n = sorted.length;
  const median = medianOfSorted(sorted);

  let lowerHalf: number[];
  let upperHalf: number[];

  if (n % 2 === 1) {
    const midIndex = Math.floor(n / 2);
    lowerHalf = sorted.slice(0, midIndex);
    upperHalf = sorted.slice(midIndex + 1);
  } else {
    lowerHalf = sorted.slice(0, n / 2);
    upperHalf = sorted.slice(n / 2);
  }

  return {
    q1: medianOfSorted(lowerHalf),
    median,
    q3: medianOfSorted(upperHalf),
  };
}

export function excelR7Quantile(sorted: number[], percentile: number): number {
  const n = sorted.length;
  const h = (n - 1) * percentile + 1;
  const lowerIndex = Math.floor(h) - 1;

  if (Number.isInteger(h)) {
    return sorted[lowerIndex];
  }

  const fraction = h - Math.floor(h);
  const upperIndex = lowerIndex + 1;

  return sorted[lowerIndex] + fraction * (sorted[upperIndex] - sorted[lowerIndex]);
}

export function excelR7Quartiles(sorted: number[]): QuartileTriple {
  return {
    q1: excelR7Quantile(sorted, 0.25),
    median: excelR7Quantile(sorted, 0.5),
    q3: excelR7Quantile(sorted, 0.75),
  };
}

export function computeQuartiles(
  sorted: number[],
  method: QuartileMethod,
): QuartileTriple {
  switch (method) {
    case "exclusive-halves":
      return exclusiveHalvesQuartiles(sorted);
    case "excel-r7":
      return excelR7Quartiles(sorted);
  }
}
