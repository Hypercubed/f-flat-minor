#!/usr/bin/env -S deno run --allow-net --allow-read --unstable --allow-env

import yargs from "https://deno.land/x/yargs@v17.5.1-deno/deno.ts";
import { Arguments } from "https://deno.land/x/yargs@v17.5.1-deno/deno-types.ts";

import { readStdin } from "../src/read.ts";
import { Preprocessor } from "../src/preprocess.ts";

export function run(args: Arguments) {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  const filename = String(args._.shift() || "-");
  const code = filename == "-"
    ? decoder.decode(readStdin())
    : Deno.readTextFileSync(filename);

  const preprocessor = new Preprocessor();
  const processed = preprocessor.preprocess(Preprocessor.tokenize(code));
  Deno.stdout.writeSync(encoder.encode(processed));
}

if (import.meta.main) {
  // @ts-ignore error
  const argv = yargs(Deno.args).argv;
  run(argv);
}
