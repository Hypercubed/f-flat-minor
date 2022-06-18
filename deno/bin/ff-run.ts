#!/usr/bin/env -S deno run --allow-read --unstable --allow-env --allow-hrtime

import yargs from "https://deno.land/x/yargs@v17.5.1-deno/deno.ts";
import { Arguments } from "https://deno.land/x/yargs@v17.5.1-deno/deno-types.ts";

import { Compiler } from "../src/compiler.ts";
import { Engine } from "../src/engine.ts";
import { Preprocessor } from "../src/preprocess.ts";
import { readStdin } from "../src/read.ts";
import { printHighLevelIr, printLowLevelIr } from "../src/ir.ts";
import { Optimizer } from "../src/optimizer.ts";

export function run(argv: Arguments) {
  const textDecoder = new TextDecoder();

  const filename = argv.file || "-";
  let code = filename == "-"
    ? textDecoder.decode(readStdin())
    : Deno.readTextFileSync(filename);

  const preprocessor = new Preprocessor();
  code = preprocessor.preprocess(Preprocessor.tokenize(code));

  const compiler = new Compiler();
  let ir = compiler.compileToIR(Compiler.tokenize(code));

  if (argv.hlir) {
    printHighLevelIr(ir);
    Deno.exit();
  }
  
  if (argv.opt) {
    const optimizer = new Optimizer();
    ir = optimizer.optimize(ir);
    if (argv.stats) {
      console.log();
      console.log('Optimizer stats:');
      console.log(optimizer.stats);
      console.log();
    }
  }
  
  if (argv.hlir || argv.ir) {
    printLowLevelIr(ir);
    Deno.exit();
  }
  
  const interpreter = new Engine();
  interpreter.traceOn = argv.trace;
  interpreter.base = argv.base || 10;
  interpreter.statsOn = argv.stats || false;
  interpreter.profileOn = argv.profile || false;

  interpreter.loadIR(ir);

  const start = Date.now();
  interpreter.run();
  const end = Date.now();

  if (argv.stats) {
    const ops = interpreter.stats.system_instructions_called + interpreter.stats.user_instructions_called;
    interpreter.printStats();
    console.log(Math.round(ops / (end - start)) + " ops/ms");
    console.log();
  }

  if (argv.profile) {
    interpreter.printProfile();
  }
}

if (import.meta.main) {
  // @ts-ignore error
  const argv = yargs(Deno.args).argv;
  argv.file = argv._[0] || "-";
  run(argv);
}

