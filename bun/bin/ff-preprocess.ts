#!/usr/bin/env bun

import fs from "node:fs";
import path from "node:path";
import { parseArgs } from "node:util";
import { fileURLToPath } from "node:url";

import { readStdin } from "../src/read.ts";
import { Preprocessor } from "../src/preprocess.ts";
import { PreprocessArgs } from "../src/args.ts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PRELUDE = path.resolve(__dirname, "../../ff/lib/prelude.ffp");

function getRuntimeArgs() {
  // Bun exposes its canonical argv via `Bun.argv`; relying on `process.argv`
  // can drop the source file argument under `bun run`.
  if (process.versions.bun) {
    const bunGlobal = globalThis as { Bun?: { argv?: string[] } };
    if (Array.isArray(bunGlobal.Bun?.argv)) {
      return bunGlobal.Bun.argv.slice(2);
    }
  }
  return process.argv.slice(2);
}

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
    args: getRuntimeArgs(),
    options: {
      file: { type: "string", short: "f" },
      "preprocessor-prelude": { type: "boolean", short: "P", default: false },
      prelude: { type: "boolean", default: false },
    },
    allowPositionals: true,
    allowNegative: true,
  });

  const argv: PreprocessArgs = {
    ...values,
    file: values.file || (typeof positionals[0] === "string" ? positionals[0] : "-"),
  };

  run(argv);
}
