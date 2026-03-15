#!/usr/bin/env -S deno run --allow-read --allow-env --no-check

import { parseArgs } from "https://deno.land/std@0.224.0/cli/parse_args.ts";
import { assertEquals } from "https://deno.land/std@0.224.0/assert/assert_equals.ts";

interface Arguments {
  file?: string;
  dump?: boolean;
  hlir?: boolean;
  ir?: boolean;
  d?: boolean;
  disassemble?: boolean;
  trace?: boolean;
  base?: number;
  stats?: boolean;
  profile?: boolean;
  [key: string]: unknown;
}

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
  interpreter.traceOn = !!args.trace;
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
  const argv = parseArgs(Deno.args, {
    string: ["file", "base"],
    boolean: ["dump", "hlir", "ir", "d", "disassemble", "trace", "stats", "profile"],
    default: { file: "-" },
    alias: {
      file: ["f"],
      base: ["b"],
      dump: ["d"],
      hlir: ["h"],
      ir: ["i"],
      d: ["d"],
      disassemble: ["d"],
      trace: ["t"],
      stats: ["s"],
      profile: ["p"],
    },
  });
  // Map first positional argument to file (parseArgs puts them in _)
  if (argv._ && argv._.length > 0 && typeof argv._[0] === "string") {
    argv.file = argv._[0] as string;
  }
  run(argv as Arguments);
}
