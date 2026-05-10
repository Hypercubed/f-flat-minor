#!/usr/bin/env -S node --experimental-transform-types --disable-warning=ExperimentalWarning

import fs from "node:fs";
import { parseArgs } from "node:util";

import { HEADER } from "../src/constants.ts";
import { base64ToArrayBuffer, dumpByteArray } from "../src/dump.ts";
import { Engine } from "../src/engine.ts";
import { bigCodeToIr, disassembleIr, printBigCodeIr, printHighLevelIr } from "../src/ir.ts";
import { readStdin } from "../src/read.ts";
import type { ExecuteArgs } from "../src/args.ts";

export function run(args: ExecuteArgs) {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  const uIntHEADER = encoder.encode(HEADER);

  const interpreter = new Engine();

  const filename = args.file || "-";
  const bin = filename == "-" ? readStdin() : fs.readFileSync(filename);

  for (let i = 0; i < uIntHEADER.length; i++) {
    if (uIntHEADER[i] !== bin[i]) {
      console.error("Invalid Header");
      process.exit(1);
    }
  }

  const base64 = decoder.decode(bin.subarray(uIntHEADER.length));

  if (args.dump) {
    const byteCode = base64ToArrayBuffer(base64);
    dumpByteArray(byteCode);
    process.exit(0);
  }

  const bigCode = Engine.fromBase64(base64);

  if (args.hlir) {
    const ir = bigCodeToIr(bigCode);
    printHighLevelIr(ir);
    process.exit(0);
  }

  if (args.ir) {
    printBigCodeIr(bigCode);
    process.exit(0);
  }

  if (args.disassemble) {
    const ir = bigCodeToIr(bigCode);
    disassembleIr(ir);
    process.exit(0);
  }

  interpreter.loadBigIntCode(bigCode);
  interpreter.traceOn = !!args.trace;
  interpreter.traceFormat = args["trace-format"] === "jsonl" ? "jsonl" : "human";
  interpreter.traceVerbose = !!args["trace-verbose"];
  interpreter.traceQueueMax = Number(args["trace-queue-max"] ?? interpreter.traceQueueMax);
  interpreter.traceStackMax = Number(args["trace-stack-max"] ?? interpreter.traceStackMax);
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
  const { values, positionals } = parseArgs({
    args: process.argv.slice(2),
    options: {
      file: { type: "string", short: "f" },
      base: { type: "string", short: "b" },
      dump: { type: "boolean", short: "d", default: false },
      hlir: { type: "boolean", short: "h", default: false },
      ir: { type: "boolean", short: "i", default: false },
      disassemble: { type: "boolean", short: "D", default: false },
      trace: { type: "boolean", short: "t", default: false },
      "trace-format": { type: "string", default: "human" },
      "trace-verbose": { type: "boolean", default: false },
      "trace-queue-max": { type: "string" },
      "trace-stack-max": { type: "string" },
      stats: { type: "boolean", short: "s", default: false },
      profile: { type: "boolean", short: "p", default: false },
    },
    allowPositionals: true,
    allowNegative: true,
  });

  const argv: ExecuteArgs = {
    ...values,
    file: values.file || (typeof positionals[0] === "string" ? positionals[0] : "-"),
    base: values.base ? Number(values.base) : undefined,
    "trace-queue-max": values["trace-queue-max"] ? Number(values["trace-queue-max"]) : undefined,
    "trace-stack-max": values["trace-stack-max"] ? Number(values["trace-stack-max"]) : undefined,
  };

  run(argv);
}
