#!/usr/bin/env deno run
import { assertEquals } from "https://deno.land/std@0.92.0/testing/asserts.ts";

import { dumpByteArray } from "../src/dump.ts";
import * as interpreter from "../src/execute.ts";

// Run
interpreter.setup();

const buf = new Uint8Array(1024);
const n = <number> await Deno.stdin.read(buf);

const header = new TextEncoder().encode("F♭A𝄫C♭");

for (let i = 0; i < header.length; i++ ) {
  assertEquals(header[i], buf[i], 'Invalid Header')
}

const byteCode = buf.subarray(header.length, n);

if (Deno.args.includes("--dump")) {
  dumpByteArray(byteCode);
  Deno.exit();
}

const bigCode = interpreter.fromByteArray(byteCode);

interpreter.executeBigIntCode(bigCode);

