import { describe, expect, it } from "vitest";

import { formatVmStepCount } from "./format-vm-steps.ts";

describe("formatVmStepCount", () => {
  it("uses locale grouping below 100k", () => {
    expect(formatVmStepCount(0)).toBe("0");
    expect(formatVmStepCount(12_345)).toMatch(/12[, ]?345/);
    expect(formatVmStepCount(99_999)).toMatch(/99[, ]?999/);
  });

  it("switches to k at 100k with two fixed decimals", () => {
    expect(formatVmStepCount(100_000)).toBe("100.00k");
    expect(formatVmStepCount(123_456)).toBe("123.46k");
    expect(formatVmStepCount(500_000)).toBe("500.00k");
  });

  it("rolls nearly 1M into m without a bogus 1000k", () => {
    expect(formatVmStepCount(999_500)).toBe("1.00m");
    expect(formatVmStepCount(999_999)).toBe("1.00m");
  });

  it("uses m then b with two fixed decimals", () => {
    expect(formatVmStepCount(1_000_000)).toBe("1.00m");
    expect(formatVmStepCount(12_345_678)).toBe("12.35m");
    expect(formatVmStepCount(250_000_000)).toBe("250.00m");
    expect(formatVmStepCount(1_000_000_000)).toBe("1.00b");
    expect(formatVmStepCount(3_500_000_000)).toBe("3.50b");
  });
});
