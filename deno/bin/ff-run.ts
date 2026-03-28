#!/usr/bin/env -S deno run --allow-read --allow-env --no-check
import { red } from "https://deno.land/std@0.224.0/fmt/colors.ts";
import { parseArgs } from "https://deno.land/std@0.224.0/cli/parse_args.ts";
import * as path from "https://deno.land/std@0.224.0/path/mod.ts";

interface Arguments {
  file?: string;
  stats?: boolean;
  validate?: boolean;
  hlir?: boolean;
  llir?: boolean;
  opt?: boolean;
  ir?: boolean;
  disassemble?: boolean;
  enc?: boolean;
  trace?: boolean;
  "trace-format"?: string;
  "trace-verbose"?: boolean;
  "trace-queue-max"?: number;
  "trace-stack-max"?: number;
  base?: number;
  profile?: boolean;
  prelude?: boolean;
  "preprocessor-prelude"?: boolean;
  [key: string]: unknown;
}

import { Compiler } from "../src/compiler.ts";
import { Engine } from "../src/engine.ts";
import { Preprocessor } from "../src/preprocess.ts";
import { readStdin } from "../src/read.ts";
import { disassembleIr, printFfCompatibleIr, printHighLevelIr, printLowLevelIr } from "../src/ir.ts";
import { Optimizer } from "../src/optimizer.ts";
import { HEADER } from "../src/constants.ts";

const PRELUDE = path.fromFileUrl(
  new URL("../../ff/lib/prelude.ffp", import.meta.url),
);

export function run(argv: Arguments) {
  const textDecoder = new TextDecoder();
  const textEncoder = new TextEncoder();
  
  const filename = argv.file || "-";

  let code = filename == "-"
    ? textDecoder.decode(readStdin())
    : Deno.readTextFileSync(filename);

  const loadPreprocessorPrelude = !!(argv["preprocessor-prelude"] || argv.prelude);
  const preprocessor = new Preprocessor(
    loadPreprocessorPrelude ? { macroEngineBootstrapFile: PRELUDE } : undefined,
  );
  code = preprocessor.preprocess(Preprocessor.tokenize(code), filename);

  const compiler = new Compiler();

  let start = Date.now();
  let ir = compiler.compileToIR(Compiler.tokenize(code), filename);
  let end = Date.now();
  
  if (argv.stats) {
    console.log(`Compiled in ${end - start}ms`);
  }

  if (!('validate' in argv) || argv.validate) {
    const issues = compiler.validate(ir);

    if (issues.length > 0) {
      console.error();
      console.error(red(`${issues.length} compiler issues found:`));
      console.error();
      issues.forEach((issue) => {
        console.error(`  ${issue}`);
      });
      console.error();
      console.error(`Use --no-validate to bypass compiler errors`);
      console.error();
      Deno.exit(1);
    }
  }

  if (argv.hlir) {
    printHighLevelIr(ir);
    Deno.exit();
  }
  
  if (argv.opt) {
    const optimizer = new Optimizer();
    start = Date.now();
    ir = optimizer.optimize(ir);
    end = Date.now();
    if (argv.stats) {
      console.log();
      console.log('Optimizer stats:');
      console.log(optimizer.stats);
      console.log();
      console.log(`Optimized in ${end - start}ms`);
    }
  }
  
  if (argv.llir) {
    printLowLevelIr(ir);
    Deno.exit();
  }

  if (argv.ir) {
    printFfCompatibleIr(ir);
    Deno.exit();
  }

  if (argv.disassemble) {
    disassembleIr(ir);
    Deno.exit();
  }

  if (argv.enc) {
    const base64Encoded = Compiler.compileToBase64(ir);
    const uIntHEADER = textEncoder.encode(HEADER);
    Deno.stdout.writeSync(uIntHEADER);
    Deno.stdout.writeSync(textEncoder.encode(base64Encoded));
    Deno.exit();
  }
  
  const interpreter = new Engine();
  interpreter.traceOn = !!argv.trace;
  interpreter.traceFormat = argv["trace-format"] === "jsonl" ? "jsonl" : "human";
  interpreter.traceVerbose = !!argv["trace-verbose"];
  interpreter.traceQueueMax = Number(argv["trace-queue-max"] ?? interpreter.traceQueueMax);
  interpreter.traceStackMax = Number(argv["trace-stack-max"] ?? interpreter.traceStackMax);
  interpreter.base = argv.base || 10;
  interpreter.statsOn = argv.stats || false;
  interpreter.profileOn = argv.profile || false;

  interpreter.loadIR(ir);

  start = performance.now();
  interpreter.run();
  end = performance.now();

  if (argv.stats) {
    const ops = interpreter.stats.system_instructions_called + interpreter.stats.user_instructions_called;
    interpreter.printStats();
    console.log();
    console.log(`Executed in ${(end - start).toFixed(4)}ms, `, Math.round(ops / (end - start)) + " ops/ms");
    console.log();
  }

  if (argv.profile) {
    interpreter.printProfile();
  }
}

if (import.meta.main) {
  const argv = parseArgs(Deno.args, {
    string: ["file", "base", "trace-format", "trace-queue-max", "trace-stack-max"],
    boolean: ["stats", "validate", "hlir", "llir", "opt", "ir", "disassemble", "enc", "trace", "trace-verbose", "profile", "preprocessor-prelude", "prelude"],
    default: { file: "-" },
    alias: {
      file: ["f"],
      stats: ["s"],
      validate: ["V"],
      hlir: ["h"],
      llir: ["l"],
      opt: ["O", "opt"],
      ir: ["i"],
      disassemble: ["d"],
      enc: ["e"],
      trace: ["t"],
      "trace-format": ["T"],
      profile: ["p"],
      "preprocessor-prelude": ["P", "prelude"],
    },
  });
  // Map first positional argument to file (parseArgs puts them in _)
  if (argv._ && argv._.length > 0 && typeof argv._[0] === "string") {
    argv.file = argv._[0] as string;
  }
  run(argv as Arguments);
}
