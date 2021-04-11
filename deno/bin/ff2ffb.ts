#!/usr/bin/env -S deno run --allow-net --allow-read

import { dumpByteArray } from "../src/dump.ts";
import * as compiler from "../src/compile.ts";
import { readStdin } from "../src/read.ts";
import { printIr } from "../src/ir.ts";

const HEADER = new TextEncoder().encode("F♭A𝄫C♭");

export function compile(filename = '-') {
  const code = filename == '-' ? new TextDecoder().decode(readStdin()) : Deno.readTextFileSync(filename);

  compiler.setup();
  const ir = compiler.compileToIR(compiler.tokenize(code));
  
  if (Deno.args.includes("--ir")) {
    printIr(ir);
    Deno.exit();
  }
  
  const byteCode = compiler.compileToByteArray(ir);
  
  if (Deno.args.includes("--dump")) {
    dumpByteArray(byteCode);
    Deno.exit();
  }
  
  Deno.stdout.writeSync(HEADER);
  Deno.stdout.writeSync(byteCode);
}

if (import.meta.main) {
  compile(Deno.args[0]);
}
