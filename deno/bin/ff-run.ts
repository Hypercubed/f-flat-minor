#!/usr/bin/env -S deno run --allow-read --unstable --allow-env

import yargs from "https://deno.land/x/yargs@v17.5.1-deno/deno.ts";
import { Arguments } from "https://deno.land/x/yargs@v17.5.1-deno/deno-types.ts";

import { Compiler } from "../src/compiler.ts";
import { Engine } from "../src/engine.ts";
import { Preprocessor } from "../src/preprocess.ts";
import { readStdin } from "../src/read.ts";
import { printIr } from "../src/ir.ts";

export function run(argv: Arguments) {
  const textDecoder = new TextDecoder();

  const filename = argv.file || "-";
  let code = filename == "-"
    ? textDecoder.decode(readStdin())
    : Deno.readTextFileSync(filename);

  const preprocessor = new Preprocessor();
  const compiler = new Compiler();
  const interpreter = new Engine();

  code = preprocessor.preprocess(Preprocessor.tokenize(code));
  const ir = compiler.compileToIR(Compiler.tokenize(code));

  if (argv.ir) {
    printIr(ir);
    Deno.exit();
  }

  interpreter.traceOn = argv.trace;

  interpreter.loadIR(ir);
  interpreter.run();
}

if (import.meta.main) {
  // @ts-ignore error
  const argv = yargs(Deno.args).argv;
  argv.file = argv._[0] || "-";
  run(argv);
}
