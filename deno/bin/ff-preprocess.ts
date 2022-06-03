#!/usr/bin/env -S deno run --allow-net --allow-read --unstable

import { readStdin } from '../src/read.ts';
import { Preprocessor } from "../src/preprocess.ts";

export function preprocess(filename = '-') {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  const code = filename == '-' ? decoder.decode(readStdin()) : Deno.readTextFileSync(filename);
  
  const preprocessor = new Preprocessor();
  const processed = preprocessor.preprocess(Preprocessor.tokenize(code));
  Deno.stdout.writeSync(encoder.encode(processed));
}

if (import.meta.main) {
  const args = Deno.args.filter((arg) => !arg.startsWith('-'));
  preprocess(args[0]);
}