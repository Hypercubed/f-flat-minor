import { describe, expect, it } from "vitest";

import { codettaOutputsMatch, normalizeCodettaOutputForComparison } from "./codetta-compare.ts";

describe("Codetta output comparison", () => {
  it("normalizes trailing spaces and tabs at line ends", () => {
    const output = "alpha  \n\tbeta\t\t\n";

    expect(normalizeCodettaOutputForComparison(output)).toBe("alpha\n\tbeta");
  });

  it("treats trailing horizontal whitespace in actual output as a match", () => {
    expect(codettaOutputsMatch("1  \n2\t\n", "1\n2\n")).toBe(true);
  });

  it("treats trailing horizontal whitespace in expected fixture as a match", () => {
    expect(codettaOutputsMatch("left\nright\n", "left \nright\t\n")).toBe(true);
  });

  it("does not ignore meaningful internal or leading whitespace", () => {
    expect(codettaOutputsMatch("A  B\n", "A B\n")).toBe(false);
    expect(codettaOutputsMatch("  lead\n", "lead\n")).toBe(false);
  });
});
