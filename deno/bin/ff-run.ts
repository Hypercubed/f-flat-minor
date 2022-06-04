#!/usr/bin/env -S deno run --allow-read --unstable

import { Compiler } from "../src/compiler.ts";
import { Engine } from "../src/engine.ts";
import { Preprocessor } from "../src/preprocess.ts";
import { readStdin } from "../src/read.ts";

export function run(filename = '-') {
  const textDecoder = new TextDecoder();
  let code = filename == '-' ? textDecoder.decode(readStdin()) : Deno.readTextFileSync(filename);

  const preprocessor = new Preprocessor();
  const compiler = new Compiler();
  const interpreter = new Engine();

  code = preprocessor.preprocess(Preprocessor.tokenize(code));
  const ir = compiler.compileToIR(Compiler.tokenize(code));


  interpreter.loadIR(ir);
  interpreter.run();
}

if (import.meta.main) {
  const args = Deno.args.filter((arg) => !arg.startsWith('-'));
  run(args[0]);
}