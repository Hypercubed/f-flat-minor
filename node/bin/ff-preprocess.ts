#!/usr/bin/env -S node --experimental-transform-types --disable-warning=ExperimentalWarning

import fs from "node:fs";
import path from "node:path";
import { parseArgs } from "node:util";

import { readStdin } from "../src/read.ts";
import { Preprocessor } from "../src/preprocess.ts";
import type { PreprocessArgs } from "../src/args.ts";
import { buildStdlibRootList, FBM_STDLIB_PATH_ENV, normalizeStdlibRootArgs } from "../src/args.ts";
import { resolveDefaultStdlibRoot } from "../src/stdlib-roots.ts";

const STDLIB_ROOT = resolveDefaultStdlibRoot(import.meta.url);
const PRELUDE = "<prelude>";

function getStdlibRoots(argv: PreprocessArgs): string[] {
  return buildStdlibRootList({
    defaultRoot: STDLIB_ROOT,
    delimiter: path.delimiter,
    envValue: process.env[FBM_STDLIB_PATH_ENV],
    cliRoots: argv["stdlib-root"],
  });
}

export function run(argv: PreprocessArgs) {
  const decoder = new TextDecoder();

  const filename = argv.file || "-";
  const code = filename == "-"
    ? decoder.decode(readStdin())
    : fs.readFileSync(filename, "utf-8");

  const loadPreprocessorPrelude = !!(argv["preprocessor-prelude"] || argv.prelude);
  const preprocessor = new Preprocessor(
    {
      stdlibRoots: getStdlibRoots(argv),
      ...(loadPreprocessorPrelude ? { macroEngineBootstrapFile: PRELUDE } : {}),
    },
  );
  const processed = preprocessor.preprocess(Preprocessor.tokenize(code), filename);
  process.stdout.write(processed);
}

if (import.meta.main) {
  const { values, positionals } = parseArgs({
    args: process.argv.slice(2),
    options: {
      file: { type: "string", short: "f" },
      prelude: { type: "boolean", default: false },
      "preprocessor-prelude": { type: "boolean", short: "P", default: false },
      "stdlib-root": { type: "string", multiple: true },
    },
    allowPositionals: true,
    allowNegative: true,
  });

  const argv: PreprocessArgs = {
    ...values,
    file: positionals[0] || values.file,
    "stdlib-root": normalizeStdlibRootArgs(values["stdlib-root"]),
  };

  run(argv);
}
