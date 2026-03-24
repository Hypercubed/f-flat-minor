#!/usr/bin/env -S deno run --allow-net --allow-read --allow-env --no-check

import { parseArgs } from "https://deno.land/std@0.224.0/cli/parse_args.ts";
import * as path from "https://deno.land/std@0.224.0/path/mod.ts";

interface Arguments {
  file?: string;
  prelude?: boolean;
  "preprocessor-prelude"?: boolean;
  [key: string]: unknown;
}

import { readStdin } from "../src/read.ts";
import { Preprocessor } from "../src/preprocess.ts";

const PRELUDE = path.fromFileUrl(
  new URL("../../ff/lib/prelude.ffp", import.meta.url),
);

export function run(args: Arguments) {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  const filename = args.file || "-";
  const code = filename == "-"
    ? decoder.decode(readStdin())
    : Deno.readTextFileSync(filename);

  const loadPreprocessorPrelude = !!(args["preprocessor-prelude"] || args.prelude);
  const preprocessor = new Preprocessor(
    loadPreprocessorPrelude ? { macroEngineBootstrapFile: PRELUDE } : undefined,
  );
  const processed = preprocessor.preprocess(Preprocessor.tokenize(code), filename);
  Deno.stdout.writeSync(encoder.encode(processed));
}

if (import.meta.main) {
  const argv = parseArgs(Deno.args, {
    string: ["file"],
    boolean: ["preprocessor-prelude", "prelude"],
    default: { file: "-" },
    alias: {
      file: ["f"],
      "preprocessor-prelude": ["P", "prelude"],
    },
  });
  // Map first positional argument to file (parseArgs puts them in _)
  if (argv._ && argv._.length > 0 && typeof argv._[0] === "string") {
    argv.file = argv._[0] as string;
  }
  run(argv as Arguments);
}
