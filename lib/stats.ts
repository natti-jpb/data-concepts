// Statistics helpers for the A/B test simulator.
// Pure functions, no dependencies — safe to unit test in isolation.

/** Error function (Abramowitz & Stegun 7.1.26), max error ~1.5e-7. */
export function erf(x: number): number {
  const t = 1 / (1 + 0.3275911 * Math.abs(x));
  const y =
    1 -
    ((((1.061405429 * t - 1.453152027) * t + 1.421413741) * t - 0.284496736) *
      t +
      0.254829592) *
      t *
      Math.exp(-x * x);
  return x >= 0 ? y : -y;
}

/** Standard normal cumulative distribution function. */
export function normalCdf(x: number, mean = 0, sd = 1): number {
  return 0.5 * (1 + erf((x - mean) / (sd * Math.SQRT2)));
}

/** Standard normal probability density function. */
export function normalPdf(x: number, mean = 0, sd = 1): number {
  const z = (x - mean) / sd;
  return Math.exp(-0.5 * z * z) / (sd * Math.sqrt(2 * Math.PI));
}

/** Inverse normal CDF (Acklam's algorithm), max relative error ~1.1e-9. */
export function inverseNormalCdf(p: number): number {
  if (p <= 0) return -Infinity;
  if (p >= 1) return Infinity;

  const a = [
    -3.969683028665376e1, 2.209460984245205e2, -2.759285104469687e2,
    1.38357751867269e2, -3.066479806614716e1, 2.506628277459239e0,
  ];
  const b = [
    -5.447609879822406e1, 1.615858368580409e2, -1.556989798598866e2,
    6.680131188771972e1, -1.328068155288572e1,
  ];
  const c = [
    -7.784894002430293e-3, -3.223964580411365e-1, -2.400758277161838e0,
    -2.549732539343734e0, 4.374664141464968e0, 2.938163982698783e0,
  ];
  const d = [
    7.784695709041462e-3, 3.224671290700398e-1, 2.445134137142996e0,
    3.754408661907416e0,
  ];

  const pLow = 0.02425;
  const pHigh = 1 - pLow;

  if (p < pLow) {
    const q = Math.sqrt(-2 * Math.log(p));
    return (
      (((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) /
      ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1)
    );
  }
  if (p <= pHigh) {
    const q = p - 0.5;
    const r = q * q;
    return (
      ((((((a[0] * r + a[1]) * r + a[2]) * r + a[3]) * r + a[4]) * r + a[5]) *
        q) /
      (((((b[0] * r + b[1]) * r + b[2]) * r + b[3]) * r + b[4]) * r + 1)
    );
  }
  const q = Math.sqrt(-2 * Math.log(1 - p));
  return (
    -(((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) /
    ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1)
  );
}

export interface ABTestResult {
  /** Conversions (control / variant), rounded from rate × n. */
  x1: number;
  x2: number;
  /** Observed conversion rates as provided. */
  p1: number;
  p2: number;
  n1: number;
  n2: number;
  /** Absolute difference p2 − p1. */
  diff: number;
  /** Relative lift (p2 − p1) / p1. */
  relativeLift: number;
  /** Two-tailed z statistic from the pooled-proportion test. */
  z: number;
  /** Two-tailed p-value. */
  pValue: number;
  /** Critical z for the chosen alpha (two-tailed). */
  zCrit: number;
  /** Confidence interval for the difference at (1 − alpha). */
  ciLow: number;
  ciHigh: number;
  significant: boolean;
  alpha: number;
}

/**
 * Two-proportion z-test (the standard frequentist A/B test).
 * Rates are fractions in [0, 1]; alpha is the significance level (e.g. 0.05).
 */
export function twoProportionZTest(
  p1: number,
  p2: number,
  n1: number,
  n2: number,
  alpha: number,
): ABTestResult {
  const x1 = Math.round(p1 * n1);
  const x2 = Math.round(p2 * n2);

  const pooled = (x1 + x2) / (n1 + n2);
  const sePooled = Math.sqrt(pooled * (1 - pooled) * (1 / n1 + 1 / n2));
  const seUnpooled = Math.sqrt(
    (p1 * (1 - p1)) / n1 + (p2 * (1 - p2)) / n2,
  );

  const diff = p2 - p1;
  const z = sePooled === 0 ? 0 : diff / sePooled;
  const pValue = 2 * (1 - normalCdf(Math.abs(z)));
  const zCrit = inverseNormalCdf(1 - alpha / 2);

  return {
    x1,
    x2,
    p1,
    p2,
    n1,
    n2,
    diff,
    relativeLift: p1 === 0 ? 0 : diff / p1,
    z,
    pValue,
    zCrit,
    ciLow: diff - zCrit * seUnpooled,
    ciHigh: diff + zCrit * seUnpooled,
    significant: Math.abs(z) >= zCrit,
    alpha,
  };
}

/**
 * Required sample size PER GROUP for a two-proportion two-sided test
 * to detect the difference between p1 and p2 at the given alpha and power.
 */
export function requiredSampleSize(
  p1: number,
  p2: number,
  alpha: number,
  power: number,
): number {
  const delta = Math.abs(p2 - p1);
  if (delta === 0) return Infinity;
  const pbar = (p1 + p2) / 2;
  const za = inverseNormalCdf(1 - alpha / 2);
  const zb = inverseNormalCdf(power);
  const num =
    za * Math.sqrt(2 * pbar * (1 - pbar)) +
    zb * Math.sqrt(p1 * (1 - p1) + p2 * (1 - p2));
  return Math.ceil((num * num) / (delta * delta));
}

/**
 * Achieved power (1 − β) of a two-sided two-proportion test with n per group.
 * Returns the standardized non-centrality too, for plotting H1.
 */
export function achievedPower(
  p1: number,
  p2: number,
  n: number,
  alpha: number,
): { power: number; lambda: number; zCrit: number } {
  const delta = Math.abs(p2 - p1);
  const se = Math.sqrt((p1 * (1 - p1) + p2 * (1 - p2)) / n);
  const zCrit = inverseNormalCdf(1 - alpha / 2);
  const lambda = se === 0 ? 0 : delta / se;
  const power = 1 - normalCdf(zCrit - lambda) + normalCdf(-zCrit - lambda);
  return { power, lambda, zCrit };
}
