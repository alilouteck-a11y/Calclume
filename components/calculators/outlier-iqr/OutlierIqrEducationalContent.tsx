import Link from "next/link";
import { outlierIqrCalculatorConfig } from "@/lib/calculators/outlier-iqr-config";
import { outlierIqrEducationalExample as example } from "@/lib/calculators/outlier-iqr-educational-example";

/**
 * Educational sections for the Outlier and IQR calculator page.
 * Interactive working lives inside the calculator; these sections teach the concepts.
 */
export function OutlierIqrEducationalContent() {
  return (
    <div className="prose-content mt-10 max-w-3xl border-t border-border pt-10">
      <h2>What is the interquartile range?</h2>
      <p>
        The interquartile range (IQR) measures how spread out the middle half of a
        dataset is. You find the first quartile (Q1) and third quartile (Q3), then
        subtract: IQR = Q3 − Q1. Values between Q1 and Q3 sit in the central
        portion of the sorted data; the IQR captures the width of that middle
        band without using every observation in the same way the full range does.
      </p>
      <p>
        IQR uses the same units as the original measurements. Whether an IQR looks
        wide or narrow depends on the scale and context of the data.
      </p>

      <h2>What is an outlier?</h2>
      <p>
        In exploratory data analysis, an <strong>outlier</strong> is an observation
        that appears unusually far from the bulk of the data. Outliers are not
        automatically mistakes. They may reflect rare events, measurement issues, or
        genuine extreme values that deserve investigation.
      </p>
      <p>
        This calculator flags observations that fall <em>strictly outside</em> Tukey-style
        fence boundaries derived from the IQR. Values exactly on a fence are{" "}
        <strong>not</strong> classified as outliers. Nothing is removed from your
        dataset automatically—the tool only labels points for review.
      </p>

      <h2>IQR formula</h2>
      <p>CalcLume uses the following definition:</p>
      <pre className="formula-block my-4 rounded-md border border-border bg-paper p-4 text-sm text-ink whitespace-pre-wrap">
        {outlierIqrCalculatorConfig.formula.combined}
      </pre>
      <ul>
        <li>
          <strong>Q1</strong> — first quartile (25th percentile position under the
          selected method)
        </li>
        <li>
          <strong>Q3</strong> — third quartile (75th percentile position under the
          selected method)
        </li>
        <li>
          <strong>k</strong> — fence multiplier (1.5 for standard inner fences, 3.0
          for wider outer fences)
        </li>
        <li>
          <strong>IQR</strong> — Q3 − Q1
        </li>
      </ul>
      <p>
        Whiskers on the box plot show the most extreme <em>non-outlier</em>{" "}
        observations—the smallest and largest values that remain inside the fences.
        Fences are reference boundaries; whiskers are data extrema among non-outliers.
      </p>

      <h2>How IQR fences work</h2>
      <p>
        Tukey-style fences extend outward from the quartiles by a multiple of the
        IQR. With the default <strong>1.5 × IQR</strong> rule (sometimes called inner
        fences), the lower fence is Q1 − 1.5 × IQR and the upper fence is Q3 + 1.5
        × IQR. The <strong>3.0 × IQR</strong> option widens both fences; quartiles
        and IQR stay the same—only the fence distance changes.
      </p>
      <p>
        Classification uses strict inequalities: a value below the lower fence is a
        lower outlier; a value above the upper fence is an upper outlier. A value
        equal to a fence is treated as within the acceptable range and is not listed
        as an outlier.
      </p>
      <p>
        NIST materials discuss inner and outer fence multipliers in box-plot practice.
        CalcLume labels the selectable multipliers by distance (1.5× and 3.0× IQR)
        rather than claiming universal “mild” or “extreme” terminology for every field.
      </p>

      <h2>How to calculate IQR and outliers</h2>
      <ol>
        <li>Enter your numeric observations (4 to 1,000 values).</li>
        <li>
          Choose a <strong>quartile method</strong>. The default is{" "}
          <strong>exclusive-halves</strong> (median of halves): sorted data is
          split into lower and upper halves and the median of each half becomes Q1
          and Q3. When <em>n</em> is odd, the overall median is excluded from both
          halves.
        </li>
        <li>
          The alternate <strong>Excel-compatible percentile (INC)</strong> option
          uses linear interpolation equivalent to Excel{" "}
          <code>PERCENTILE.INC</code> (Hyndman–Fan type 7).
        </li>
        <li>
          Choose a <strong>fence multiplier</strong>: default <strong>1.5× IQR</strong>{" "}
          or alternate <strong>3.0× IQR</strong>.
        </li>
        <li>
          Press <strong>Calculate outliers and IQR</strong>. Review the IQR, fences,
          whiskers, outlier lists, step-by-step work, classification table, and box
          plot.
        </li>
      </ol>
      <p>
        Changing only decimal places reformats displayed values without marking the
        result stale. Changing the dataset, quartile method, or multiplier requires
        recalculation to refresh the output.
      </p>

      <h2>Worked example</h2>
      <p>
        Dataset (original order): <code>{example.input}</code> (fixture{" "}
        {example.fixtureId}; example <code>{example.exampleId}</code>)
      </p>
      <p>
        Quartile method: <strong>{example.quartileMethodLabel}</strong> (
        <code>{example.quartileMethod}</code>). Fence multiplier:{" "}
        <strong>{example.fenceMultiplier}× IQR</strong>.
      </p>
      <p>
        Sorted values: <code>{example.sortedInput}</code>. Count <em>n</em> ={" "}
        {example.count}.
      </p>
      <p>
        Lower half (first five values): 1, 2, 3, 4, 5 → Q1 = <strong>{example.q1}</strong>.
        <br />
        Upper half (last five values): 6, 7, 8, 9, 100 → Q3 ={" "}
        <strong>{example.q3}</strong>.
        <br />
        Median = <strong>{example.median}</strong>.
      </p>
      <p>
        IQR = Q3 − Q1 = {example.q3} − {example.q1} = <strong>{example.iqr}</strong>
      </p>
      <p>
        Lower fence = Q1 − 1.5 × IQR = {example.q1} − 1.5 × {example.iqr} ={" "}
        <strong>{example.lowerFence}</strong>
        <br />
        Upper fence = Q3 + 1.5 × IQR = {example.q3} + 1.5 × {example.iqr} ={" "}
        <strong>{example.upperFence}</strong>
      </p>
      <p>
        Values 1 through 9 lie strictly inside the fences.{" "}
        <strong>{example.outlierValues.join("; ")}</strong> is above the upper fence
        and is flagged as an upper outlier. The calculator does not remove it from
        your dataset.
      </p>
      <p>
        Lower whisker = <strong>{example.lowerWhisker}</strong> and upper whisker ={" "}
        <strong>{example.upperWhisker}</strong> (most extreme non-outlier
        observations). Fences at {example.lowerFence} and {example.upperFence} are
        reference boundaries—not whisker endpoints.
      </p>

      <h2>Five-number summary explained</h2>
      <p>
        The five-number summary reports the minimum observed value, Q1, median, Q3,
        and maximum observed value. It describes location and spread without assuming
        a particular distribution shape.
      </p>
      <p>
        When outliers are present, the whiskers on a box plot may end at non-outlier
        extrema while the summary minimum and maximum still reflect the full dataset
        (including outliers). This calculator shows both the five-number summary and
        separate whisker endpoints so you can see how flagged points relate to the
        bulk of the data.
      </p>

      <h2>How to read the box plot</h2>
      <p>
        The horizontal box plot on this page maps numeric values to position along an
        axis. The box spans Q1 to Q3; the median appears as a distinct line inside the
        box. Whiskers extend to the lower and upper non-outlier extremes. Dashed
        vertical lines mark fence positions. Open circles mark outliers beyond the
        whiskers.
      </p>
      <p>
        A visible text summary and a screen-reader data table duplicate the key
        values, so the chart is not the only source of information. Line styles and
        marker shapes supplement color so the plot remains interpretable without
        relying on hue alone.
      </p>

      <h2>Why quartile methods can disagree</h2>
      <p>
        Quartile definitions are not standardized across textbooks, homework systems,
        and spreadsheet functions. The same dataset can yield different Q1 and Q3
        values depending on whether software uses median-of-halves rules, linear
        interpolation (such as Excel <code>PERCENTILE.INC</code>), or other percentile
        conventions.
      </p>
      <p>
        CalcLume’s default <strong>exclusive-halves</strong> method (labeled{" "}
        <em>median of halves (exclusive)</em> in the calculator) matches many
        classroom treatments. The <strong>Excel-compatible percentile (INC)</strong>{" "}
        option helps when you need parity with spreadsheet output. Always report which
        method you used when sharing results.
      </p>

      <h2>IQR versus mean absolute deviation</h2>
      <p>
        IQR summarizes spread through quartiles and is relatively resistant to extreme
        values in the sense that outliers are summarized separately once fences are
        applied.{" "}
        <Link href="/calculators/statistics/mean-absolute-deviation/">
          Mean absolute deviation (MAD)
        </Link>{" "}
        measures average distance from the arithmetic mean and stays in original units
        with a direct “average deviation from the center” reading.
      </p>
      <p>
        The two tools answer related but different questions. IQR and fences emphasize
        the middle half and tail flags; MAD emphasizes mean-centered absolute distance.
        Many exploratory workflows use both.
      </p>

      <h2>IQR versus standard deviation</h2>
      <p>
        Standard deviation measures spread around the mean using squared deviations.
        Large values influence standard deviation more strongly than IQR because
        squaring amplifies extremes. Standard deviation is common in inference and
        modeling contexts; IQR is common in robust summaries and box-plot rules.
      </p>
      <p>
        Neither measure is automatically superior. Choose based on whether quartile-based
        or mean-based spread better matches your question and audience.
      </p>

      <h2>When IQR is useful</h2>
      <ul>
        <li>Summarizing the spread of the middle 50% of observations</li>
        <li>Flagging unusually low or high values with transparent fence rules</li>
        <li>Teaching box plots and five-number summaries alongside a worked dataset</li>
        <li>Comparing datasets on a common scale when quartile-based spread is appropriate</li>
        <li>Reviewing data quality before analysis without deleting points automatically</li>
      </ul>

      <h2>Limitations</h2>
      <ul>
        <li>
          Quartile positions depend on the selected method; compare results only when
          methods match.
        </li>
        <li>
          Fence rules are exploratory heuristics, not hypothesis tests or significance
          procedures.
        </li>
        <li>
          This calculator does not remove, winsorize, or impute outliers for you.
        </li>
        <li>
          Only 1.5× and 3.0× multipliers are offered—no arbitrary custom multipliers in
          this version.
        </li>
        <li>
          Between 4 and 1,000 observations are supported; smaller samples are not valid
          for this tool’s quartile rules.
        </li>
        <li>
          Values exactly on a fence are not classified as outliers (strict &lt; / &gt;
          comparisons).
        </li>
        <li>
          Display precision affects rounding in the interface only; it does not change
          underlying calculations.
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
