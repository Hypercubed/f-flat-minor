#!/usr/bin/env -S deno run --allow-read --unstable --allow-env

import yargs from "https://deno.land/x/yargs@v17.5.1-deno/deno.ts";
import { Arguments } from "https://deno.land/x/yargs@v17.5.1-deno/deno-types.ts";
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
  const compiler = new Compiler();
  const interpreter = new Engine();
  const preprocessor = new Preprocessor();

  console.log();
  console.log(GREETINGS);

  if (!("core" in args) || args.core) {
    run(`.load ${core}`);
  }

  while (true) {
    Deno.stdout.writeSync(PROMPT);
    for await (const line of readLines(Deno.stdin)) {
      run(line);
      interpreter.print();
      console.log("");
      break;
    }
  }

  function run(line: string) {
    const code = preprocessor.preprocess([line]);
    const ir = compiler.compileToIR(Compiler.tokenize(code));
    interpreter.loadIR(ir);
    interpreter.run();
  }
}

if (import.meta.main) {
  // @ts-ignore error
  const argv = yargs(Deno.args).argv;
  await run(argv);
}
