#!/usr/bin/env -S deno run --allow-read
import { readLines } from "https://deno.land/std/io/bufio.ts";

import * as compiler from "../src/compile.ts";
import * as interpreter from "../src/execute.ts";

const PROMPT = new TextEncoder().encode("F♭> ");

export async function repl() {
  compiler.setup();
  interpreter.setup();

  console.log("\nF♭ minor");
  while (true) {
    Deno.stdout.writeSync(PROMPT);
    for await (const line of readLines(Deno.stdin)) {
      const ir = compiler.compileToIR(compiler.tokenize(line));
      const byteCode = compiler.compileToByteArray(ir);
      const bigCode = interpreter.fromByteArray(byteCode);
      interpreter.executeBigIntCode(bigCode);
      interpreter.print();
      console.log("");
      break;
    }
  }
}

if (import.meta.main) {
  await repl();
}