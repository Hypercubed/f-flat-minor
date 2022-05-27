#!/usr/bin/env -S deno run --allow-net --allow-read --unstable

import { dumpByteArray } from '../src/dump.ts';

import { readStdin } from '../src/read.ts';
import { printIr } from '../src/ir.ts';
import { Compiler } from "../src/compiler.ts";

export function compile(filename = '-') {
  const textEncoder = new TextEncoder();
  
  const HEADER = textEncoder.encode('F♭A𝄫C♭');
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
  const args = Deno.args.filter((arg) => !arg.startsWith('-'));
  compile(args[0]);
}