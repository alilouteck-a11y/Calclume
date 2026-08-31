/** Round for display only using half-up rounding. */
export function formatNumber(value: number, decimals: number): string {
  if (!Number.isFinite(value)) {
    return "—";
  }

  const factor = 10 ** decimals;
  const rounded = Math.round(value * factor + Number.EPSILON) / factor;
  return Object.is(rounded, -0) ? (0).toFixed(decimals) : rounded.toFixed(decimals);
}

/** Format for UI display: up to `maxDecimals` places, trailing zeros removed, -0 → 0. */
export function formatDisplayNumber(value: number, maxDecimals: number): string {
  if (!Number.isFinite(value)) {
    return "—";
  }

  const normalized = Object.is(value, -0) || value === 0 ? 0 : value;
  const fixed = formatNumber(normalized, maxDecimals);

  if (!fixed.includes(".")) {
    return fixed;
  }

  const trimmed = fixed
    .replace(/(\.\d*?[1-9])0+$/u, "$1")
    .replace(/\.0+$/u, "");

  if (trimmed === "-0") {
    return "0";
  }

  return trimmed;
}

export function formatNumberList(values: number[], decimals: number): string {
  return values.map((value) => formatDisplayNumber(value, decimals)).join(", ");
}

export function formatSigned(value: number, decimals: number): string {
  if (Object.is(value, -0) || value === 0) {
    return formatDisplayNumber(0, decimals);
  }

  const formatted = formatDisplayNumber(Math.abs(value), decimals);

  if (value > 0) {
    return `+${formatted}`;
  }

  return `−${formatted}`;
}

export type DisplayPrecision = 2 | 4 | 6;

export const DISPLAY_PRECISION_OPTIONS: DisplayPrecision[] = [2, 4, 6];

export const DEFAULT_DISPLAY_PRECISION: DisplayPrecision = 4;

export function isDisplayPrecision(value: number): value is DisplayPrecision {
  return value === 2 || value === 4 || value === 6;
}
