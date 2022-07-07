#!/usr/bin/env -S deno run --allow-read --unstable --allow-env --allow-hrtime
import { red } from "https://deno.land/std@0.139.0/fmt/colors.ts";
import yargs from "https://deno.land/x/yargs@v17.5.1-deno/deno.ts";
import { Arguments } from "https://deno.land/x/yargs@v17.5.1-deno/deno-types.ts";

import { Compiler } from "../src/compiler.ts";
import { Engine } from "../src/engine.ts";
import { Preprocessor } from "../src/preprocess.ts";
import { readStdin } from "../src/read.ts";
import { disassembleIr, printHighLevelIr, printLowLevelIr } from "../src/ir.ts";
import { Optimizer } from "../src/optimizer.ts";
import { HEADER } from "../src/constants.ts";

export function run(argv: Arguments) {
  const textDecoder = new TextDecoder();
  const textEncoder = new TextEncoder();
  
  const filename = argv.file || "-";

  // console.log({ filename });
  // console.log(Deno.cwd());
  // Deno.exit(0);

  let code = filename == "-"
    ? textDecoder.decode(readStdin())
    : Deno.readTextFileSync(filename);

  const preprocessor = new Preprocessor();
  code = preprocessor.preprocess(Preprocessor.tokenize(code), filename);

  const compiler = new Compiler();

  let start = Date.now();
  let ir = compiler.compileToIR(Compiler.tokenize(code), filename);
  let end = Date.now();
  
  if (argv.stats) {
    console.log(`Compiled in ${end - start}ms`);
  }

  if (!('validate' in argv) || argv.validate) {
    const issues = compiler.validate(ir);

    if (issues.length > 0) {
      console.error();
      console.error(red(`${issues.length} compiler issues found:`));
      console.error();
      issues.forEach((issue) => {
        console.error(`  ${issue}`);
      });
      console.error();
      console.error(`Use --no-validate to bypass compiler errors`);
      console.error();
      Deno.exit(1);
    }
  }

  if (argv.hlir) {
    printHighLevelIr(ir);
    Deno.exit();
  }
  
  if (argv.opt) {
    const optimizer = new Optimizer();
    start = Date.now();
    ir = optimizer.optimize(ir);
    end = Date.now();
    if (argv.stats) {
      console.log();
      console.log('Optimizer stats:');
      console.log(optimizer.stats);
      console.log();
      console.log(`Optimized in ${end - start}ms`);
    }
  }
  
  if (argv.hlir || argv.ir) {
    printLowLevelIr(ir);
    Deno.exit();
  }

  if (argv.disassemble) {
    disassembleIr(ir);
    Deno.exit();
  }

  if (argv.enc) {
    const base64Encoded = Compiler.compileToBase64(ir);
    const uIntHEADER = textEncoder.encode(HEADER);
    Deno.stdout.writeSync(uIntHEADER);
    Deno.stdout.writeSync(textEncoder.encode(base64Encoded));
    Deno.exit();
  }
  
  const interpreter = new Engine();
  interpreter.traceOn = argv.trace;
  interpreter.base = argv.base || 10;
  interpreter.statsOn = argv.stats || false;
  interpreter.profileOn = argv.profile || false;

  interpreter.loadIR(ir);

  start = performance.now();
  interpreter.run();
  end = performance.now();

  if (argv.stats) {
    const ops = interpreter.stats.system_instructions_called + interpreter.stats.user_instructions_called;
    interpreter.printStats();
    console.log();
    console.log(`Executed in ${(end - start).toFixed(4)}ms, `, Math.round(ops / (end - start)) + " ops/ms");
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

