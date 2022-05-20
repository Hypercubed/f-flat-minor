#!/usr/bin/env -S deno run --allow-read

import { Compiler } from "../src/compiler.ts";
import { Engine } from "../src/engine.ts";
import { readStdin } from "../src/read.ts";

export function run(filename = '-') {
  const code = filename == '-' ? new TextDecoder().decode(readStdin()) : Deno.readTextFileSync(filename);

  const compiler = new Compiler();

  const ir = compiler.compileToIR(Compiler.tokenize(code));
  const byteCode = Compiler.compileToByteArray(ir);

  const interpreter = new Engine();

  const bigCode = Engine.fromByteArray(byteCode);
  interpreter.executeBigIntCode(bigCode);
}

if (import.meta.main) {
  run(Deno.args[0]);
}