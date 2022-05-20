#!/usr/bin/env -S rlwrap -c deno run --allow-net --allow-read


import { readLines } from "https://deno.land/std/io/bufio.ts";
import { Compiler } from "../src/compiler.ts";
import { Engine } from "../src/engine.ts";

const compiler = new Compiler();
const interpreter = new Engine();

async function read() {
  // Listen to stdin input, once a new line is entered return
  for await (let line of readLines(Deno.stdin)) {
    if (line.startsWith('.load ')) {
      const [,filename] = line.split(' ');
      line = await Deno.readTextFile(filename);
    }
    const ir = compiler.compileToIR(Compiler.tokenize(line));
    const byteCode = Compiler.compileToByteArray(ir);
    const bigCode = Engine.fromByteArray(byteCode);
    interpreter.executeBigIntCode(bigCode);
    interpreter.print();
    console.log("");
    return;
  }
}

const prompt = new TextEncoder().encode("F♭> ");

console.log("\nF♭ minor");
while (true) {
  Deno.stdout.writeSync(prompt);
  await read();
}
