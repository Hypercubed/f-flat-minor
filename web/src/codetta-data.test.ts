import { describe, expect, it } from "vitest";

import { CODETTA_ENTRIES, getCodettaSolutionFilename } from "./codetta-data.ts";
import { compileProgram, getCompiledBytecodeDisplay } from "./program-runner.ts";

describe("Codetta data loading", () => {
  it("includes the current shipped Coda Etudes in the leaderboard data", () => {
    const ids = new Set(CODETTA_ENTRIES.map((entry) => entry.id));

    expect(ids.has("catalans-constant")).toBe(true);
    expect(ids.has("roman-to-arabic")).toBe(true);
    expect(ids.has("collatz")).toBe(true);
    expect(ids.has("leap-years")).toBe(true);
    expect(ids.has("ln-2")).toBe(true);
    expect(ids.has("pascals-triangle")).toBe(true);
    expect(ids.has("tower-of-hanoi")).toBe(true);
  });

  it("loads Codetta entries with description, output, and solution content", () => {
    const fizzbuzz = CODETTA_ENTRIES.find((entry) => entry.id === "fizzbuzz");

    expect(CODETTA_ENTRIES.length).toBeGreaterThan(0);
    expect(CODETTA_ENTRIES.every((entry) => entry.description.length > 0)).toBe(true);
    expect(CODETTA_ENTRIES.every((entry) => entry.expected.length > 0)).toBe(true);
    expect(CODETTA_ENTRIES.every((entry) => entry.solution.length > 0)).toBe(true);

    expect(fizzbuzz).toBeDefined();
    expect(fizzbuzz?.expected.length).toBeGreaterThan(0);
    expect(fizzbuzz?.solution.length).toBeGreaterThan(0);
  });

  it("preserves the loaded Codetta solution filename extension per etude", () => {
    expect(getCodettaSolutionFilename("99bottles")).toBe("/codetta/99bottles/solution.ffp");
    expect(getCodettaSolutionFilename("fizzbuzz")).toBe("/codetta/fizzbuzz/solution.ffp");
  });

  it("keeps current-best byte metadata aligned with optimized compiled output", () => {
    for (const entry of CODETTA_ENTRIES) {
      const compiled = compileProgram(entry.solution, "", true, {
        filename: getCodettaSolutionFilename(entry.id),
      });

      expect(compiled.compiledBytes, entry.id).toBe(entry.bytes);
      expect(getCompiledBytecodeDisplay(compiled.bytecode).length, entry.id).toBe(entry.bytes);
    }
  });
});
