#!/usr/bin/env -S deno run --allow-read --unstable

import { assertEquals } from "https://deno.land/std@0.92.0/testing/asserts.ts";
import { dumpByteArray } from "../src/dump.ts";
import { Engine } from "../src/engine.ts";
import { readStdin } from "../src/read.ts";

export function execute(filename = '-') {
  const HEADER = new TextEncoder().encode("F♭A𝄫C♭");

  const interpreter = new Engine();

  const bin = filename == '-' ? readStdin() : Deno.readFileSync(filename);

  for (let i = 0; i < HEADER.length; i++) {
    assertEquals(HEADER[i], bin[i], "Invalid Header");
  }

  const byteCode = bin.subarray(HEADER.length);

  if (Deno.args.includes("--dump")) {
    dumpByteArray(byteCode);
    Deno.exit();
  }

  const bigCode = Engine.fromByteArray(byteCode);
  interpreter.executeBigIntCode(bigCode);
}

if (import.meta.main) {
  execute(Deno.args[0]);
}