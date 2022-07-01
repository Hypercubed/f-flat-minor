#!/usr/bin/env -S deno run --allow-net --allow-read --unstable --allow-env

import { red } from "https://deno.land/std@0.139.0/fmt/colors.ts";
import yargs from "https://deno.land/x/yargs@v17.5.1-deno/deno.ts";
import { Arguments } from "https://deno.land/x/yargs@v17.5.1-deno/deno-types.ts";

import { base64ToArrayBuffer, dumpByteArray } from "../src/dump.ts";

import { readStdin } from "../src/read.ts";
import { disassembleIr, printHighLevelIr, printLowLevelIr } from "../src/ir.ts";
import { Compiler } from "../src/compiler.ts";
import { HEADER } from "../src/constants.ts";
import { Optimizer } from "../src/optimizer.ts";
import { Preprocessor } from "../src/preprocess.ts";

export function run(argv: Arguments) {
  const textEncoder = new TextEncoder();

  const filename = argv.file || "-";
  let code = filename == "-"
    ? new TextDecoder().decode(readStdin())
    : Deno.readTextFileSync(filename);

  if (!('preprocess' in argv) || argv.preprocess) {
    const preprocessor = new Preprocessor();
    code = preprocessor.preprocess(Preprocessor.tokenize(code), filename);
  }

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

  if (argv.ir || argv.llir) {
    printLowLevelIr(ir);
    Deno.exit();
  }

  if (argv.disassemble) {
    disassembleIr(ir);
    Deno.exit();
  }

  const base64Encoded = Compiler.compileToBase64(ir);

  if (argv.dump) {
    const byteCode = base64ToArrayBuffer(base64Encoded);
    dumpByteArray(byteCode);
    Deno.exit();
  }

  const uIntHEADER = textEncoder.encode(HEADER);
  Deno.stdout.writeSync(uIntHEADER);
  Deno.stdout.writeSync(textEncoder.encode(base64Encoded));
}

if (import.meta.main) {
  // @ts-ignore error
  const argv = yargs(Deno.args).argv;
  argv.file = argv._[0] || "-";
  run(argv);
}
