/**
 * Formats VM step counts for compact summary UI:
 * - Below 100,000: full locale grouping (up to 5 digits).
 * - From 100k: compact suffix k, then m, then b (lowercase), always with two decimal places.
 */
export function formatVmStepCount(n: number): string {
  if (!Number.isFinite(n) || n < 0) {
    return String(n);
  }

  const x = Math.floor(n);

  if (x < 100_000) {
    return x.toLocaleString();
  }

  if (x < 1_000_000) {
    const k = x / 1000;
    if (k >= 999.5) {
      return compactAbove(x, 1_000_000, "m");
    }
    return `${k.toFixed(2)}k`;
  }

  if (x < 1_000_000_000) {
    const m = x / 1_000_000;
    if (m >= 999.5) {
      return compactAbove(x, 1_000_000_000, "b");
    }
    return `${m.toFixed(2)}m`;
  }

  const b = x / 1_000_000_000;
  return `${b.toFixed(2)}b`;
}

function compactAbove(x: number, unit: number, suffix: string): string {
  const v = x / unit;
  return `${v.toFixed(2)}${suffix}`;
}
