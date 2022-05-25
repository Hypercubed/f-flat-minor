#!/usr/bin/env -S deno run --allow-read --unstable

import { readLines } from 'https://deno.land/std/io/bufio.ts';
import * as path from "https://deno.land/std@0.57.0/path/mod.ts";

import { Compiler } from '../src/compiler.ts';
import { Engine } from '../src/engine.ts';
import { Preprocessor } from "../src/preprocess.ts";

const PROMPT = new TextEncoder().encode('F♭> ');
const core = path.fromFileUrl(path.join(import.meta.url, '../../../ff/core.ff'));

export async function repl() {
  const compiler = new Compiler();
  const interpreter = new Engine();
  const preprocessor = new Preprocessor();

  console.log('\nF♭ minor');

  run(`.load ${core}`);

  while (true) {
    Deno.stdout.writeSync(PROMPT);
    for await (const line of readLines(Deno.stdin)) {
      run(line);
      interpreter.print();
      console.log('');
      break;
    }
  }

  function run(line: string) {
    const code = preprocessor.preprocess([line]);
    const ir = compiler.compileToIR(Compiler.tokenize(code));
    const bigCode = Compiler.compileToBigArray(ir);
    interpreter.executeBigIntCode(bigCode);
  }
}

if (import.meta.main) {
  await repl();
}