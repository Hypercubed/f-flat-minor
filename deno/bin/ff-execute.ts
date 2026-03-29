#!/usr/bin/env -S deno run --allow-read --allow-env --no-check
import { parseArgs } from "https://deno.land/std@0.224.0/cli/parse_args.ts";
import { assertEquals } from "https://deno.land/std@0.224.0/assert/assert_equals.ts";

import { HEADER } from "../src/constants.ts";
import { base64ToArrayBuffer, dumpByteArray } from "../src/dump.ts";
import { Engine } from "../src/engine.ts";
import { bigCodeToIr, disassembleIr, printBigCodeIr, printHighLevelIr } from "../src/ir.ts";
import { readStdin } from "../src/read.ts";
import type { ExecuteArgs } from "../src/args.ts";

export function run(args: ExecuteArgs) {
  const filename = args.file || "-";
  const bin = filename == "-" ? readStdin() : Deno.readFileSync(filename);
  const decoder = new TextDecoder();

  assertEquals(
    HEADER,
    decoder.decode(bin.slice(0, HEADER.length)),
  );

  const base64 = decoder.decode(bin.subarray(HEADER.length));

  if (args.dump) {
    const byteCode = base64ToArrayBuffer(base64);
    dumpByteArray(byteCode);
    Deno.exit(0);
  }

  const bigCode = Engine.fromBase64(base64);

  if (args.hlir) {
    const ir = bigCodeToIr(bigCode);
    printHighLevelIr(ir);
    Deno.exit(0);
  }

  if (args.ir) {
    printBigCodeIr(bigCode);
    Deno.exit(0);
  }

  if (args.disassemble) {
    const ir = bigCodeToIr(bigCode);
    disassembleIr(ir);
    Deno.exit(0);
  }

  const interpreter = new Engine();
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
  const parsed = parseArgs(Deno.args, {
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
  });

  const argv: ExecuteArgs = {
    ...parsed,
    file: parsed.file || (parsed._?.[0] as string) || "-",
    base: parsed.base ? Number(parsed.base) : undefined,
    "trace-queue-max": parsed["trace-queue-max"] ? Number(parsed["trace-queue-max"]) : undefined,
    "trace-stack-max": parsed["trace-stack-max"] ? Number(parsed["trace-stack-max"]) : undefined,
  };

  run(argv);
}
