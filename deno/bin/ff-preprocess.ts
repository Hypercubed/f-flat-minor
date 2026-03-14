#!/usr/bin/env -S deno run --allow-net --allow-read --allow-env --no-check

import { parseArgs } from "https://deno.land/std@0.224.0/cli/parse_args.ts";

interface Arguments {
  file?: string;
  [key: string]: unknown;
}

import { readStdin } from "../src/read.ts";
import { Preprocessor } from "../src/preprocess.ts";

export function run(args: Arguments) {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  const filename = args.file || "-";
  const code = filename == "-"
    ? decoder.decode(readStdin())
    : Deno.readTextFileSync(filename);

  const preprocessor = new Preprocessor();
  const processed = preprocessor.preprocess(Preprocessor.tokenize(code), filename);
  Deno.stdout.writeSync(encoder.encode(processed));
}

if (import.meta.main) {
  const argv = parseArgs(Deno.args, {
    string: ["file"],
    default: { file: "-" },
    alias: {
      file: ["f"],
    },
  });
  // Map first positional argument to file (parseArgs puts them in _)
  if (argv._ && argv._.length > 0 && typeof argv._[0] === "string") {
    argv.file = argv._[0] as string;
  }
  run(argv as Arguments);
}
