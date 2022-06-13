#!/usr/bin/env -S deno run --allow-read --unstable --allow-env --allow-hrtime

import yargs from "https://deno.land/x/yargs@v17.5.1-deno/deno.ts";
import { Arguments } from "https://deno.land/x/yargs@v17.5.1-deno/deno-types.ts";

import { Compiler } from "../src/compiler.ts";
import { Engine } from "../src/engine.ts";
import { Preprocessor } from "../src/preprocess.ts";
import { readStdin } from "../src/read.ts";
import { printIr } from "../src/ir.ts";
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
  
  if (argv.opt) {
    const optimizer = new Optimizer();
    optimizer.statsOn = argv.stats || false;
    ir = optimizer.optimizeIr(ir);
    if (argv.stats) {
      console.log();
      console.log('Optimizer stats:');
      console.log(optimizer.stats);
      console.log();
    }
  }
  
  if (argv.ir) {
    printIr(ir);
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

  if (argv.stats) {
    const end = Date.now();
    const ops = interpreter.stats.system_instructions_called + interpreter.stats.user_instructions_called;
    console.log();
    console.log('Interpreter stats:');
    console.log(interpreter.stats);
    console.log();
    console.log(Math.round(ops / (end - start)) + " ops/ms");
    console.log();
  }

  if (argv.profile) {
    console.log();
    console.log('Profile:');

    const profileTable = Object.keys(interpreter.profile).map((name) => {
      const calls = interpreter.profile[name][0];
      const time = interpreter.profile[name][1];
      return {
        name,
        calls,
        time,
        'ops/ms': time > 0 ? Math.round(calls / time) : undefined
      }
    }).sort((a, b) => b.calls - a.calls);

    const system = profileTable.filter((p) => p.time);
    const user = profileTable.filter((p) => !p.time);

    console.table(system, ['name', 'calls', 'ops/ms']);

    console.table(user, ['name', 'calls']);

    console.log();
  }
}

if (import.meta.main) {
  // @ts-ignore error
  const argv = yargs(Deno.args).argv;
  argv.file = argv._[0] || "-";
  run(argv);
}
