#!/usr/bin/env -S deno run --allow-net --allow-read --unstable --allow-env

import yargs from "https://deno.land/x/yargs@v17.5.1-deno/deno.ts";
import { Arguments } from "https://deno.land/x/yargs@v17.5.1-deno/deno-types.ts";

import { base64ToArrayBuffer, dumpByteArray } from "../src/dump.ts";

import { readStdin } from "../src/read.ts";
import { printIr } from "../src/ir.ts";
import { Compiler } from "../src/compiler.ts";
import { HEADER } from "../src/constants.ts";

export function run(argv: Arguments) {
  const textEncoder = new TextEncoder();

  const uIntHEADER = textEncoder.encode(HEADER);

  const filename = argv.file || "-";
  const code = filename == "-"
    ? new TextDecoder().decode(readStdin())
    : Deno.readTextFileSync(filename);

  const compiler = new Compiler();

  const ir = compiler.compileToIR(Compiler.tokenize(code));

  if (argv.ir) {
    printIr(ir);
    Deno.exit();
  }

  const base64Encoded = Compiler.compileToBase64(ir);

  if (argv.dump) {
    const byteCode = base64ToArrayBuffer(base64Encoded);
    dumpByteArray(byteCode);
    Deno.exit();
  }

  Deno.stdout.writeSync(uIntHEADER);
  Deno.stdout.writeSync(textEncoder.encode(base64Encoded));
}

if (import.meta.main) {
  // @ts-ignore error
  const argv = yargs(Deno.args).argv;
  argv.file = argv._[0] || "-";
  run(argv);
}
