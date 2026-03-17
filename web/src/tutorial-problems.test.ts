import { describe, expect, it } from "vitest";

import { runProgram } from "./program-runner.ts";
import { TUTORIAL_PROBLEMS } from "./tutorial-problems.ts";

function getProblem(id: string) {
  const problem = TUTORIAL_PROBLEMS.find((entry) => entry.id === id);

  if (!problem) {
    throw new Error(`Missing tutorial problem: ${id}`);
  }

  return problem;
}

describe("tutorial problems", () => {
  it("keeps the expected 15-problem starter sequence", () => {
    expect(TUTORIAL_PROBLEMS.map(({ id }) => id)).toEqual([
      "square",
      "message-and-value",
      "abs",
      "even",
      "countdown",
      "sum-to",
      "factorial",
      "fibonacci",
      "gcd",
      "reverse-digits",
      "numeric-palindrome",
      "fizzbuzz",
      "collatz-steps",
      "prime",
      "pascal-row",
    ]);
  });

  it.each([
    ["square", "36"],
    ["countdown", "5 4 3 2 1 0"],
    ["fizzbuzz", "1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz"],
    ["prime", "1"],
    ["pascal-row", "1 5 10 10 5 1"],
  ])("runs %s with the expected tutorial output", (id, expected) => {
    const result = runProgram(getProblem(id).source, "", true);

    expect(result.output.trimEnd()).toBe(expected);
    expect(result.exitCode).toBe(0);
    expect(result.issues).toEqual([]);
  });
});
