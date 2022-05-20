#!/usr/bin/env -S deno run --allow-read

import { readLines } from 'https://deno.land/std/io/bufio.ts';

import { Compiler } from '../src/compiler.ts';
import { Engine } from '../src/engine.ts';

const PROMPT = new TextEncoder().encode('F♭> ');

export async function repl() {
  const compiler = new Compiler();
  const interpreter = new Engine();

  console.log('\nF♭ minor');
  while (true) {
    Deno.stdout.writeSync(PROMPT);
    for await (const line of readLines(Deno.stdin)) {
      const ir = compiler.compileToIR(Compiler.tokenize(line));
      const byteCode = Compiler.compileToByteArray(ir);
      const bigCode = Engine.fromByteArray(byteCode);
      interpreter.executeBigIntCode(bigCode);
      interpreter.print();
      console.log('');
      break;
    }
  }
}

if (import.meta.main) {
  await repl();
}