#!/usr/bin/env -S deno run --allow-read --unstable --allow-env

import yargs from "https://deno.land/x/yargs@v17.5.1-deno/deno.ts";
import { Arguments } from "https://deno.land/x/yargs@v17.5.1-deno/deno-types.ts";

import { Compiler } from "../src/compiler.ts";
import { Engine } from "../src/engine.ts";
import { Preprocessor } from "../src/preprocess.ts";
import { readStdin } from "../src/read.ts";

export function run(argv: Arguments) {
  const textDecoder = new TextDecoder();

  const filename = String(argv._.shift() || "-");
  let code = filename == "-"
    ? textDecoder.decode(readStdin())
    : Deno.readTextFileSync(filename);

  const preprocessor = new Preprocessor();
  const compiler = new Compiler();
  const interpreter = new Engine();

  code = preprocessor.preprocess(Preprocessor.tokenize(code));
  const ir = compiler.compileToIR(Compiler.tokenize(code));

  interpreter.loadIR(ir);
  interpreter.run();
}

if (import.meta.main) {
  // @ts-ignore error
  const argv = yargs(Deno.args).argv;
  run(argv);
}
