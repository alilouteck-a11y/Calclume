export type ParseDatasetResult =
  | { ok: true; values: number[] }
  | { ok: false; error: string };

export const MAX_DATASET_OBSERVATIONS = 1000;

const SEPARATOR_PATTERN = /[\s,;\n]+/;

/** Strict numeric token: integers, decimals, leading-dot (.5), optional sign. No partial tokens. */
const VALID_NUMBER_TOKEN =
  /^[+-]?(?:\d+\.?\d*|\.\d+)$/;

const REJECTED_LITERALS = new Set([
  "nan",
  "infinity",
  "+infinity",
  "-infinity",
]);

export function parseDataset(input: string): ParseDatasetResult {
  const trimmed = input.trim();

  if (!trimmed) {
    return { ok: false, error: "Enter at least one numeric value." };
  }

  const tokens = trimmed.split(SEPARATOR_PATTERN).filter(Boolean);

  if (tokens.length === 0) {
    return { ok: false, error: "Enter at least one numeric value." };
  }

  const values: number[] = [];

  for (const token of tokens) {
    const normalized = token.toLowerCase();

    if (REJECTED_LITERALS.has(normalized)) {
      return {
        ok: false,
        error: `"${token}" is not a valid number.`,
      };
    }

    if (!VALID_NUMBER_TOKEN.test(token)) {
      return {
        ok: false,
        error: `"${token}" is not a valid number. Use digits and optional decimal points only.`,
      };
    }

    const value = Number(token);

    if (!Number.isFinite(value)) {
      return {
        ok: false,
        error: `"${token}" is not a valid number.`,
      };
    }

    values.push(value);
  }

  if (values.length > MAX_DATASET_OBSERVATIONS) {
    return {
      ok: false,
      error: `Datasets are limited to ${MAX_DATASET_OBSERVATIONS.toLocaleString("en-US")} observations. Your input contains ${values.length.toLocaleString("en-US")}.`,
    };
  }

  return { ok: true, values };
}
