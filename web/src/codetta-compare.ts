function trimTrailingHorizontalWhitespace(line: string): string {
  return line.replace(/[\t ]+$/u, "");
}

export function normalizeCodettaOutputForComparison(output: string): string {
  return output
    .trimEnd()
    .split(/\r?\n/u)
    .map(trimTrailingHorizontalWhitespace)
    .join("\n");
}

export function codettaOutputsMatch(actual: string, expected: string): boolean {
  return normalizeCodettaOutputForComparison(actual) === normalizeCodettaOutputForComparison(expected);
}
