#!/usr/bin/env -S deno run --allow-read --unstable --allow-env

import yargs from "https://deno.land/x/yargs@v17.5.1-deno/deno.ts";
import { Arguments } from "https://deno.land/x/yargs@v17.5.1-deno/deno-types.ts";
import { assertEquals } from "https://deno.land/std@0.92.0/testing/asserts.ts";

import { HEADER } from "../src/constants.ts";
import { base64ToArrayBuffer, dumpByteArray } from "../src/dump.ts";
import { Engine } from "../src/engine.ts";
import { bigCodeToIr, disassembleIr, printBigCodeIr, printHighLevelIr } from "../src/ir.ts";
import { readStdin } from "../src/read.ts";

export function run(args: Arguments) {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  const uIntHEADER = encoder.encode(HEADER);

  const interpreter = new Engine();

  const filename = args.file || "-";
  const bin = filename == "-" ? readStdin() : Deno.readFileSync(filename);

  for (let i = 0; i < uIntHEADER.length; i++) {
    assertEquals(uIntHEADER[i], bin[i], "Invalid Header");
  }

  const base64 = decoder.decode(bin.subarray(uIntHEADER.length));

  if (args.dump) {
    const byteCode = base64ToArrayBuffer(base64);
    dumpByteArray(byteCode);
    Deno.exit();
  }

  const bigCode = Engine.fromBase64(base64);

  if (args.hlir) {
    const ir = bigCodeToIr(bigCode);
    printHighLevelIr(ir);
    Deno.exit();
  }

  if (args.ir) {
    printBigCodeIr(bigCode);
    Deno.exit();
  }

  if (args.d || args.disassemble) {
    const ir = bigCodeToIr(bigCode);
    disassembleIr(ir);
    Deno.exit();
  }

  interpreter.loadBigIntCode(bigCode);
  interpreter.traceOn = args.trace;
  interpreter.base = args.base || 10;
  interpreter.statsOn = args.stats || false;
  interpreter.profileOn = args.profile || false;

  const start = Date.now();
  interpreter.run();
  const end = Date.now();

  if (args.stats) {
    const ops = interpreter.stats.system_instructions_called + interpreter.stats.user_instructions_called;
    interpreter.printStats();
    console.log(Math.round(ops / (end - start)) + " ops/ms");
    console.log();
  }

  if (args.profile) {
    interpreter.printProfile();
  }
}

if (import.meta.main) {
  // @ts-ignore error
  const argv = yargs(Deno.args).argv;
  argv.file = argv._[0] || "-";
  run(argv);
}
