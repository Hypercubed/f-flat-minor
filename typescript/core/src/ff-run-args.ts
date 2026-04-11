// Shared ff-run CLI argument definitions and normalization helpers
// This file provides the canonical CLI contract for ff-run across all runtimes

import type { RunArgs } from "./args.ts";
import { normalizeStdlibRootArgs } from "./args.ts";
export type { RunArgs } from "./args.ts";

/**
 * Canonical default values for ff-run options
 */
export const RUN_ARG_DEFAULTS = {
  file: "-",
  preprocess: true,
  stats: false,
  validate: true,
  hlir: false,
  llir: false,
  opt: false,
  ir: false,
  disassemble: false,
  enc: false,
  trace: false,
  "trace-format": "human",
  "trace-verbose": false,
  profile: false,
  "preprocessor-prelude": false,
  prelude: false,
  "stdlib-root": [] as string[],
} as const;

/**
 * Canonical short option aliases for ff-run
 * Maps long option names to their short aliases
 */
export const RUN_ARG_ALIASES = {
  file: ["f"],
  preprocess: ["E"],
  stats: ["s"],
  validate: ["V"],
  hlir: ["h"],
  llir: ["l"],
  opt: ["O"],
  ir: ["i"],
  disassemble: ["d"],
  enc: ["e"],
  trace: ["t"],
  "trace-format": ["T"],
  profile: ["p"],
  "preprocessor-prelude": ["P", "prelude"],
} as const satisfies Record<string, string[]>;

/**
 * Boolean options for ff-run (for parsers that need type hints)
 */
export const RUN_ARG_BOOLEANS = [
  "preprocess",
  "stats",
  "validate",
  "hlir",
  "llir",
  "opt",
  "ir",
  "disassemble",
  "enc",
  "trace",
  "trace-verbose",
  "profile",
  "preprocessor-prelude",
  "prelude",
] as const;

/**
 * String options for ff-run (for parsers that need type hints)
 */
export const RUN_ARG_STRINGS = [
  "file",
  "base",
  "trace-format",
  "trace-queue-max",
  "trace-stack-max",
  "stdlib-root",
] as const;

/**
 * Options that should be coerced to numbers
 */
export const RUN_ARG_NUMERIC = [
  "base",
  "trace-queue-max",
  "trace-stack-max",
] as const;

/**
 * Normalize raw parsed arguments into canonical RunArgs shape.
 * Handles:
 * - Coercing numeric string values to numbers
 * - Mapping positional arguments to file
 * - Applying defaults for missing values
 */
export function normalizeRunArgs(
  raw: Record<string, unknown>,
  positionals?: string[],
): RunArgs {
  const normalized: RunArgs = { ...raw };

  // Map first positional to file if file not explicitly provided (or is default)
  if ((!normalized.file || normalized.file === RUN_ARG_DEFAULTS.file) && positionals && positionals.length > 0) {
    const first = positionals[0];
    if (typeof first === "string") {
      normalized.file = first;
    }
  }

  // Apply default for file if still not set
  if (!normalized.file) {
    normalized.file = RUN_ARG_DEFAULTS.file;
  }

  // Coerce numeric options
  for (const key of RUN_ARG_NUMERIC) {
    const value = normalized[key as keyof RunArgs];
    if (value !== undefined && value !== null) {
      (normalized as Record<string, unknown>)[key] = Number(value);
    }
  }

  normalized["stdlib-root"] = normalizeStdlibRootArgs(normalized["stdlib-root"]);

  return normalized;
}

/**
 * Build parseArgs configuration for Node/Bun node:util.parseArgs
 * Returns the options object that defines the CLI contract
 */
export function buildParseArgsConfig(): {
  file: { type: "string"; short: "f" };
  preprocess: { type: "boolean"; short: "E"; default: true };
  stats: { type: "boolean"; short: "s"; default: false };
  validate: { type: "boolean"; short: "V"; default: true };
  hlir: { type: "boolean"; short: "h"; default: false };
  llir: { type: "boolean"; short: "l"; default: false };
  opt: { type: "boolean"; short: "O"; default: false };
  ir: { type: "boolean"; short: "i"; default: false };
  disassemble: { type: "boolean"; short: "d"; default: false };
  enc: { type: "boolean"; short: "e"; default: false };
  trace: { type: "boolean"; short: "t"; default: false };
  "trace-format": { type: "string"; default: "human" };
  "trace-verbose": { type: "boolean"; default: false };
  "trace-queue-max": { type: "string" };
  "trace-stack-max": { type: "string" };
  profile: { type: "boolean"; short: "p"; default: false };
  "preprocessor-prelude": { type: "boolean"; short: "P"; default: false };
  prelude: { type: "boolean"; default: false };
  base: { type: "string" };
  "stdlib-root": { type: "string"; multiple: true };
} {
  return {
    file: { type: "string", short: "f" },
    preprocess: { type: "boolean", short: "E", default: true },
    stats: { type: "boolean", short: "s", default: false },
    validate: { type: "boolean", short: "V", default: true },
    hlir: { type: "boolean", short: "h", default: false },
    llir: { type: "boolean", short: "l", default: false },
    opt: { type: "boolean", short: "O", default: false },
    ir: { type: "boolean", short: "i", default: false },
    disassemble: { type: "boolean", short: "d", default: false },
    enc: { type: "boolean", short: "e", default: false },
    trace: { type: "boolean", short: "t", default: false },
    "trace-format": { type: "string", default: "human" },
    "trace-verbose": { type: "boolean", default: false },
    "trace-queue-max": { type: "string" },
    "trace-stack-max": { type: "string" },
    profile: { type: "boolean", short: "p", default: false },
    "preprocessor-prelude": { type: "boolean", short: "P", default: false },
    prelude: { type: "boolean", default: false },
    base: { type: "string" },
    "stdlib-root": { type: "string", multiple: true },
  };
}

/**
 * Build parseArgs configuration for Deno's std/cli/parse_args
 */
export function buildDenoParseArgsConfig(): {
  string: string[];
  boolean: string[];
  default: Record<string, string | boolean | string[]>;
  alias: Record<string, string[]>;
  collect: string[];
} {
  return {
    string: [...RUN_ARG_STRINGS],
    boolean: [...RUN_ARG_BOOLEANS],
    default: { ...RUN_ARG_DEFAULTS },
    alias: { ...RUN_ARG_ALIASES } as Record<string, string[]>,
    collect: ["stdlib-root"],
  };
}
