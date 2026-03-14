#!/usr/bin/env -S deno run --allow-read --unstable --allow-env

import yargs from "https://deno.land/x/yargs@v17.5.1-deno/deno.ts";
import { Arguments } from "https://deno.land/x/yargs@v17.5.1-deno/deno_types.ts";
import { readLines } from "https://deno.land/std@0.92.0/io/bufio.ts";
import * as path from "https://deno.land/std@0.57.0/path/mod.ts";

import { Compiler } from "../src/compiler.ts";
import { Engine } from "../src/engine.ts";
import { Preprocessor } from "../src/preprocess.ts";
import { GREETINGS, SHORT } from "../src/constants.ts";

const PROMPT = new TextEncoder().encode(`${SHORT}> `);
const core = path.fromFileUrl(
  path.join(import.meta.url, "../../../ff/lib/core.ff"),
);

export async function run(args: Arguments) {
  let compiler = new Compiler();
  let interpreter = new Engine();
  let preprocessor = new Preprocessor();

  console.log();
  console.log(GREETINGS);

  if (!("core" in args) || args.core) {
    runLine(`.load ${core}`);
  }

  // Read lines one at a time manually to properly handle EOF
  const reader = readLines(Deno.stdin);
  
  while (true) {
    Deno.stdout.writeSync(PROMPT);
    
    const result = await reader.next();
    
    // Handle EOF (stdin closed)
    if (result.done || result.value === undefined) {
      console.log("\nGoodbye!");
      Deno.exit(0);
    }
    
    const line = result.value;
    runLine(line);
    interpreter.print();
    console.log("");
  }

  function runLine(line: string) {
    if (line.trim() === '.reset') {
      compiler = new Compiler();
      interpreter = new Engine();
      preprocessor = new Preprocessor();
      return;
    }
    if (line.trim() === '.exit' || line.trim() === '.quit') {
      console.log("Goodbye!");
      Deno.exit(0);
    }
    const code = preprocessor.preprocess([line]);
    const ir = compiler.compileToIR(Compiler.tokenize(code));
    interpreter.loadIR(ir);

    try {
      interpreter.run();
    } catch(err) {
      console.error(err);
    }
  }
}

if (import.meta.main) {
  // @ts-ignore error
  const argv = yargs(Deno.args).argv;
  await run(argv);
}
