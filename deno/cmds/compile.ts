#!/usr/bin/env -S deno run --allow-net --allow-read

import { dumpByteArray } from "../src/dump.ts";
import { Compiler, IrInstruction } from "../src/compile.ts";

const compiler = new Compiler();

function printIr(ir: Array<IrInstruction>) {
  ir.forEach((i) => {
    const n = (i.value + "n").padEnd(5, " ");
    const o = i.op.toUpperCase().padEnd(6, " ");
    console.log(n, o, ";", i.comment);
  });
}

const buf = new Uint8Array(1024);
const n = <number> await Deno.stdin.read(buf);
const code = new TextDecoder().decode(buf.subarray(0, n));
const ir = compiler.compileToIR(Compiler.tokenize(code));

if (Deno.args.includes("--ir")) {
  printIr(ir);
  Deno.exit();
}

const byteCode = Compiler.compileToByteArray(ir);

if (Deno.args.includes("--dump")) {
  dumpByteArray(byteCode);
  Deno.exit();
}

const header = new TextEncoder().encode("F♭A𝄫C♭");

Deno.stdout.writeSync(header);
Deno.stdout.writeSync(byteCode);
