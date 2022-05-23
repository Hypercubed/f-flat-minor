#!/usr/bin/env -S deno run --allow-net --allow-read --unstable

import { readStdin } from '../src/read.ts';
import { Preprocessor } from "../src/preprocess.ts";

export function preprocess(filename = '-') {
  const code = filename == '-' ? new TextDecoder().decode(readStdin()) : Deno.readTextFileSync(filename);
  const preprocessor = new Preprocessor();
  const processed = preprocessor.preprocess(Preprocessor.tokenize(code));
  Deno.stdout.writeSync(new TextEncoder().encode(processed));
}

if (import.meta.main) {
  const args = Deno.args.filter((arg) => !arg.startsWith('-'));
  preprocess(args[0]);
}