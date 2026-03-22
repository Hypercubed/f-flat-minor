import { describe, expect, it } from "vitest";

import { Compiler } from "../../typescript/core/src/compiler.ts";

describe("Compiler.tokenize", () => {
  it("keeps bare operator tokens as words", () => {
    expect(Compiler.tokenize("1 - 2 +")).toEqual([1n, "-", 2n, "+"]);
  });

  it("still parses signed non-decimal numbers", () => {
    expect(Compiler.tokenize("-0b11")).toEqual([-3n]);
  });
});
