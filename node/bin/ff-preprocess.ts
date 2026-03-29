#!/usr/bin/env -S node --experimental-transform-types --disable-warning=ExperimentalWarning

import fs from "node:fs";
import path from "node:path";
import { parseArgs } from "node:util";
import { fileURLToPath } from "node:url";

import { readStdin } from "../src/read.ts";
import { Preprocessor } from "../src/preprocess.ts";
import type { PreprocessArgs } from "../src/args.ts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PRELUDE = path.resolve(__dirname, "../../ff/lib/prelude.ffp");

export function run(argv: PreprocessArgs) {
  const decoder = new TextDecoder();

  const filename = argv.file || "-";
  const code = filename == "-"
    ? decoder.decode(readStdin())
    : fs.readFileSync(filename, "utf-8");

  const loadPreprocessorPrelude = !!(argv["preprocessor-prelude"] || argv.prelude);
  const preprocessor = new Preprocessor(
    loadPreprocessorPrelude ? { macroEngineBootstrapFile: PRELUDE } : undefined,
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
    },
    allowPositionals: true,
    allowNegative: true,
  });

  const argv: PreprocessArgs = {
    ...values,
    file: positionals[0] || values.file,
  };

  run(argv);
}
