import Link from "next/link";

/**
 * Educational sections for the Mean Absolute Deviation calculator page.
 * Interactive formula working lives inside the calculator; these sections teach the concept.
 */
export function MadEducationalContent() {
  return (
    <div className="prose-content mt-10 max-w-3xl border-t border-border pt-10">
      <h2>What is mean absolute deviation?</h2>
      <p>
        Mean absolute deviation (MAD) measures how far values in a dataset typically
        sit from the arithmetic mean. For each observation, you find the distance to
        the mean, convert that distance to an absolute value so negative and positive
        deviations cannot cancel each other, then average those absolute distances.
      </p>
      <p>
        The result uses the same units as the original data. A MAD of 2.4 centimeters
        means values are, on average, 2.4 centimeters away from the mean—not 2.4
        “percentage points” or a unitless score. Whether a MAD looks small or large
        depends on the scale and context of the dataset; the same number can be
        meaningful for one measurement and unimportant for another.
      </p>
      <p>
        This page discusses mean absolute deviation about the arithmetic mean. It is
        not median absolute deviation (which centers on the median) and not mean
        absolute percentage error (which scales deviations by the observed values).
      </p>

      <h2>Mean absolute deviation formula</h2>
      <p>CalcLume uses the following definition:</p>
      <pre className="formula-block my-4 rounded-md border border-border bg-paper p-4 text-sm text-ink whitespace-pre-wrap">
        {`x̄ = Σxᵢ / n

MAD = Σ|xᵢ − x̄| / n`}
      </pre>
      <ul>
        <li>
          <strong>xᵢ</strong> — each observation in the dataset
        </li>
        <li>
          <strong>n</strong> — the number of observations
        </li>
        <li>
          <strong>x̄</strong> — the arithmetic mean of the observations
        </li>
        <li>
          <strong>|xᵢ − x̄|</strong> — the absolute deviation of each value from the
          mean
        </li>
      </ul>
      <p>
        The denominator is <em>n</em>, the count of observations. This calculator does
        not offer an <em>n − 1</em> sample option. Intermediate arithmetic keeps full
        floating-point precision; only the displayed values follow the decimal-places
        setting you choose.
      </p>

      <h2>How to calculate MAD</h2>
      <ol>
        <li>Enter the numeric values that form your dataset.</li>
        <li>
          Compute the arithmetic mean: add the values and divide by <em>n</em>.
        </li>
        <li>
          For each value, subtract the mean and take the absolute value to get{" "}
          |xᵢ − x̄|.
        </li>
        <li>Add the absolute deviations.</li>
        <li>
          Divide that sum by <em>n</em>. The quotient is the mean absolute deviation.
        </li>
      </ol>
      <p>
        On this page, press <strong>Calculate MAD</strong> after entering or loading a
        dataset. The calculator shows the result summary, formula working, a deviation
        table, and a neutral interpretation of the average distance from the mean.
      </p>

      <h2>Complete worked example</h2>
      <p>
        Dataset: <code>12, 15, 14, 10, 19</code>
      </p>
      <p>
        Count: <em>n</em> = 5
      </p>
      <p>
        Mean: x̄ = (12 + 15 + 14 + 10 + 19) / 5 = 70 / 5 = <strong>14</strong>
      </p>
      <p>Absolute deviations from 14:</p>
      <ul>
        <li>|12 − 14| = 2</li>
        <li>|15 − 14| = 1</li>
        <li>|14 − 14| = 0</li>
        <li>|10 − 14| = 4</li>
        <li>|19 − 14| = 5</li>
      </ul>
      <p>
        Sum of absolute deviations = 2 + 1 + 0 + 4 + 5 = <strong>12</strong>
      </p>
      <p>
        MAD = 12 / 5 = <strong>2.4</strong>
      </p>
      <p>
        Minimum = 10, maximum = 19, and range = 19 − 10 = <strong>9</strong>. Range
        describes the span of the raw values; MAD describes average distance from the
        center.
      </p>
      <p>
        Interpretation: values in this dataset are, on average, 2.4 units away from the
        arithmetic mean of 14.
      </p>

      <h2>Mean absolute deviation versus standard deviation</h2>
      <p>
        Both MAD and standard deviation describe spread around a center, but they
        treat deviations differently.
      </p>
      <ul>
        <li>
          <strong>MAD</strong> averages absolute distances from the mean. Extreme
          values influence the result linearly.
        </li>
        <li>
          <strong>Standard deviation</strong> averages squared distances (then takes a
          square root). Extreme values influence the result more strongly because
          squaring amplifies large deviations.
        </li>
      </ul>
      <p>
        MAD stays in the original data units and is often easier to explain as “average
        distance from the mean.” Standard deviation is the more common choice in
        inference, probability models, and many software defaults. Neither measure is
        automatically “better”; the right choice depends on the question and the
        audience.
      </p>
      <p>
        Naming note: this CalcLume calculator computes mean absolute deviation about
        the arithmetic mean. NIST material discusses that idea as average absolute
        deviation (a scale measure). In some statistical references—including NIST
        contexts—“MAD” means median absolute deviation. Those are different
        statistics; do not treat them as interchangeable.
      </p>

      <h2>When MAD is useful</h2>
      <ul>
        <li>
          Teaching dispersion with a direct “average distance from the mean”
          interpretation
        </li>
        <li>
          Summarizing spread when absolute (rather than squared) deviations match the
          decision context
        </li>
        <li>
          Comparing datasets that share similar units and scale, when a simple average
          distance is enough
        </li>
        <li>
          Checking how far typical values sit from a reported mean without introducing
          squared units
        </li>
      </ul>

      <h2>Limitations and interpretation</h2>
      <ul>
        <li>
          MAD depends on the arithmetic mean. Outliers still affect the center and
          therefore the deviations, even though they are not squared.
        </li>
        <li>
          MAD is not median absolute deviation and is not a percentage error measure.
        </li>
        <li>
          Absolute MAD values are not given qualitative dispersion ratings on this
          site without context. Compare MAD to the dataset’s scale, units, and
          purpose.
        </li>
        <li>
          This calculator always divides by <em>n</em>. There is no sample{" "}
          <em>n − 1</em> mode.
        </li>
        <li>
          Display precision affects rounding in the interface only; it does not change
          the underlying calculation.
        </li>
      </ul>
      <p>
        For how CalcLume selects formulas and reviews calculator pages, see the{" "}
        <Link href="/methodology/">methodology</Link> and{" "}
        <Link href="/sources/">sources</Link> pages.
      </p>
    </div>
  );
}
