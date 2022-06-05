#!/usr/bin/env -S deno run --allow-read --unstable --allow-env

import yargs from "https://deno.land/x/yargs@v17.5.1-deno/deno.ts";
import { Arguments } from "https://deno.land/x/yargs@v17.5.1-deno/deno-types.ts";
import { assertEquals } from "https://deno.land/std@0.92.0/testing/asserts.ts";

import { HEADER } from "../src/constants.ts";
import { base64ToArrayBuffer, dumpByteArray } from "../src/dump.ts";
import { Engine } from "../src/engine.ts";
import { printBigCodeIr } from "../src/ir.ts";
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

  if (Deno.args.includes("--dump")) {
    const byteCode = base64ToArrayBuffer(base64);
    dumpByteArray(byteCode);
    Deno.exit();
  }

  const bigCode = Engine.fromBase64(base64);

  if (Deno.args.includes("--ir")) {
    printBigCodeIr(bigCode);
    Deno.exit();
  }

  interpreter.loadBigIntCode(bigCode);
  interpreter.run();
}

if (import.meta.main) {
  // @ts-ignore error
  const argv = yargs(Deno.args).argv;
  run(argv);
}
