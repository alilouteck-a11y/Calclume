export type MeanAbsoluteDeviationRow = {
  index: number;
  value: number;
  signedDeviation: number;
  absoluteDeviation: number;
};

export type MeanAbsoluteDeviationResult = {
  count: number;
  sum: number;
  mean: number;
  absoluteDeviationSum: number;
  meanAbsoluteDeviation: number;
  minimum: number;
  maximum: number;
  range: number;
  rows: MeanAbsoluteDeviationRow[];
};

export function calculateMeanAbsoluteDeviation(
  values: number[],
): MeanAbsoluteDeviationResult {
  if (values.length === 0) {
    throw new RangeError("At least one value is required.");
  }

  const count = values.length;
  const sum = values.reduce((total, value) => total + value, 0);
  const mean = sum / count;

  const rows = values.map((value, index) => {
    const signedDeviation = value - mean;
    return {
      index: index + 1,
      value,
      signedDeviation,
      absoluteDeviation: Math.abs(signedDeviation),
    };
  });

  const absoluteDeviationSum = rows.reduce(
    (total, row) => total + row.absoluteDeviation,
    0,
  );
  const meanAbsoluteDeviation = absoluteDeviationSum / count;
  const minimum = Math.min(...values);
  const maximum = Math.max(...values);

  return {
    count,
    sum,
    mean,
    absoluteDeviationSum,
    meanAbsoluteDeviation,
    minimum,
    maximum,
    range: maximum - minimum,
    rows,
  };
}
