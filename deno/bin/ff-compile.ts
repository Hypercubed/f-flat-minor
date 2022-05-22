#!/usr/bin/env -S deno run --allow-net --allow-read --unstable

import { dumpByteArray } from '../src/dump.ts';

import { readStdin } from '../src/read.ts';
import { printIr } from '../src/ir.ts';
import { Compiler } from "../src/compiler.ts";

const HEADER = new TextEncoder().encode('F♭A𝄫C♭');

export function compile(filename = '-') {
  const code = filename == '-' ? new TextDecoder().decode(readStdin()) : Deno.readTextFileSync(filename);

  const compiler = new Compiler();
  
  const ir = compiler.compileToIR(Compiler.tokenize(code));

  if (Deno.args.includes('--ir')) {
    printIr(ir);
    Deno.exit();
  }

  const byteCode = Compiler.compileToByteArray(ir);

  if (Deno.args.includes('--dump')) {
    dumpByteArray(byteCode);
    Deno.exit();
  }

  Deno.stdout.writeSync(HEADER);
  Deno.stdout.writeSync(byteCode);
}

if (import.meta.main) {
  compile(Deno.args[0]);
}