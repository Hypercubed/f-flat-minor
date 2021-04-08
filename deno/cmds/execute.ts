#!/usr/bin/env deno run

import { dumpByteArray } from "../src/dump.ts";
import * as interpreter from "../src/execute.ts";

// Run
interpreter.setup();

const buf = new Uint8Array(1024);
const n = <number> await Deno.stdin.read(buf);
const byteCode = buf.subarray(0, n);

if (Deno.args.includes("--dump")) {
  dumpByteArray(byteCode);
  Deno.exit();
}

const bigCode = interpreter.fromByteArray(byteCode);

interpreter.executeBigIntCode(bigCode);
