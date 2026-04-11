#!/usr/bin/env -S node --experimental-transform-types --disable-warning=ExperimentalWarning

import fs from "node:fs";
import path from "node:path";
import { parseArgs } from "node:util";

import { Compiler } from "../src/compiler.ts";
import { HEADER } from "../src/constants.ts";
import { Engine } from "../src/engine.ts";
import { disassembleIr, printFfCompatibleIr, printHighLevelIr, printLowLevelIr } from "../src/ir.ts";
import { Optimizer } from "../src/optimizer.ts";
import { Preprocessor } from "../src/preprocess.ts";
import { readStdin } from "../src/read.ts";
import type { RunArgs } from "../src/ff-run-args.ts";
import { buildParseArgsConfig, normalizeRunArgs } from "../src/ff-run-args.ts";
import { buildStdlibRootList, FBM_STDLIB_PATH_ENV } from "../src/args.ts";
import { resolveDefaultStdlibRoot } from "../src/stdlib-roots.ts";

const STDLIB_ROOT = resolveDefaultStdlibRoot(import.meta.url);
const PRELUDE = "<prelude>";

function getStdlibRoots(argv: RunArgs): string[] {
  return buildStdlibRootList({
    defaultRoot: STDLIB_ROOT,
    delimiter: path.delimiter,
    envValue: process.env[FBM_STDLIB_PATH_ENV],
    cliRoots: argv["stdlib-root"],
  });
}

function red(text: string) {
  return process.stderr.isTTY ? `\x1b[31m${text}\x1b[0m` : text;
}

export function run(argv: RunArgs) {
  const textDecoder = new TextDecoder();
  const textEncoder = new TextEncoder();
  const filename = argv.file || "-";

  let code =
    filename === "-"
      ? textDecoder.decode(readStdin())
      : fs.readFileSync(filename, "utf8");

  if (argv.preprocess !== false) {
    const loadPreprocessorPrelude = !!(argv["preprocessor-prelude"] || argv.prelude);
    const preprocessor = new Preprocessor(
      {
        stdlibRoots: getStdlibRoots(argv),
        ...(loadPreprocessorPrelude ? { macroEngineBootstrapFile: PRELUDE } : {}),
      },
    );
    code = preprocessor.preprocess(Preprocessor.tokenize(code), filename);
  }

  const compiler = new Compiler();

  let start = Date.now();
  let ir = compiler.compileToIR(Compiler.tokenize(code), filename);
  let end = Date.now();

  if (argv.stats) {
    console.log(`Compiled in ${end - start}ms`);
  }

  if (argv.validate !== false) {
    const issues = compiler.validate(ir);

    if (issues.length > 0) {
      console.error();
      console.error(red(`${issues.length} compiler issues found:`));
      console.error();
      issues.forEach((issue) => {
        console.error(`  ${issue}`);
      });
      console.error();
      console.error("Use --no-validate to bypass compiler errors");
      console.error();
      process.exit(1);
    }
  }

  if (argv.hlir) {
    printHighLevelIr(ir);
    process.exit(0);
  }

  if (argv.opt) {
    const optimizer = new Optimizer();
    start = Date.now();
    ir = optimizer.optimize(ir);
    end = Date.now();
    if (argv.stats) {
      console.log();
      console.log("Optimizer stats:");
      console.log(optimizer.stats);
      console.log();
      console.log(`Optimized in ${end - start}ms`);
    }
  }

  if (argv.llir) {
    printLowLevelIr(ir);
    process.exit(0);
  }

  if (argv.ir) {
    printFfCompatibleIr(ir);
    process.exit(0);
  }

  if (argv.disassemble) {
    disassembleIr(ir);
    process.exit(0);
  }

  if (argv.enc) {
    const base64Encoded = Compiler.compileToBase64(ir);
    process.stdout.write(Buffer.from(textEncoder.encode(HEADER)));
    process.stdout.write(base64Encoded);
    process.exit(0);
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
    const ops =
      interpreter.stats.system_instructions_called +
      interpreter.stats.user_instructions_called;
    interpreter.printStats();
    console.log();
    console.log(
      `Executed in ${(end - start).toFixed(4)}ms, ${Math.round(
        ops / (end - start),
      )} ops/ms`,
    );
    console.log();
  }

  if (argv.profile) {
    interpreter.printProfile();
  }
}

if (import.meta.main) {
  const options = buildParseArgsConfig();
  const { values, positionals } = parseArgs({
    args: process.argv.slice(2),
    options,
    allowPositionals: true,
    allowNegative: true,
  });

  const argv = normalizeRunArgs(values, positionals);
  run(argv);
}
