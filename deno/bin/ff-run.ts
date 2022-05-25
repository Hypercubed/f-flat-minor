#!/usr/bin/env -S deno run --allow-read --unstable

import { Compiler } from "../src/compiler.ts";
import { Engine } from "../src/engine.ts";
import { Preprocessor } from "../src/preprocess.ts";
import { readStdin } from "../src/read.ts";

export function run(filename = '-') {
  let code = filename == '-' ? new TextDecoder().decode(readStdin()) : Deno.readTextFileSync(filename);

  const preprocessor = new Preprocessor();

  code = preprocessor.preprocess(Preprocessor.tokenize(code));

  const compiler = new Compiler();

  const ir = compiler.compileToIR(Compiler.tokenize(code));
  const bigCode = Compiler.compileToBigArray(ir);

  const interpreter = new Engine();
  interpreter.executeBigIntCode(bigCode);
}

if (import.meta.main) {
  const args = Deno.args.filter((arg) => !arg.startsWith('-'));
  run(args[0]);
}