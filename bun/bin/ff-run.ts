#!/usr/bin/env bun

import fs from "node:fs";
import path from "node:path";
import { parseArgs } from "node:util";
import { fileURLToPath } from "node:url";

import { Compiler } from "../src/compiler.ts";
import { HEADER } from "../src/constants.ts";
import { Engine } from "../src/engine.ts";
import {
  disassembleIr,
  printFfCompatibleIr,
  printHighLevelIr,
  printLowLevelIr,
} from "../src/ir.ts";
import { Optimizer } from "../src/optimizer.ts";
import { Preprocessor } from "../src/preprocess.ts";
import { readStdin } from "../src/read.ts";

const PRELUDE = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../../ff/lib/prelude.ffp",
);

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
  base?: number;
  profile?: boolean;
  prelude?: boolean;
  "preprocessor-prelude"?: boolean;
}

function getRuntimeArgs() {
  // Bun exposes its canonical argv via `Bun.argv`; relying on `process.argv`
  // can drop the source file argument under `bun run`.
  if (process.versions.bun) {
    const bunGlobal = globalThis as { Bun?: { argv?: string[] } };
    if (Array.isArray(bunGlobal.Bun?.argv)) {
      return bunGlobal.Bun.argv.slice(2);
    }
  }
  return process.argv.slice(2);
}

function red(text: string) {
  return process.stderr.isTTY ? `\x1b[31m${text}\x1b[0m` : text;
}

export function run(argv: Arguments) {
  const textDecoder = new TextDecoder();
  const textEncoder = new TextEncoder();
  const filename = argv.file || "-";

  let code =
    filename === "-"
      ? textDecoder.decode(readStdin())
      : fs.readFileSync(filename, "utf8");

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
  const { values, positionals } = parseArgs({
    args: getRuntimeArgs(),
    options: {
      file: { type: "string", short: "f" },
      stats: { type: "boolean", short: "s", default: false },
      validate: { type: "boolean", short: "V", default: true },
      hlir: { type: "boolean", short: "h", default: false },
      llir: { type: "boolean", short: "l", default: false },
      opt: { type: "boolean", short: "O", default: false },
      ir: { type: "boolean", short: "i", default: false },
      disassemble: { type: "boolean", short: "d", default: false },
      enc: { type: "boolean", short: "e", default: false },
      trace: { type: "boolean", short: "t", default: false },
      profile: { type: "boolean", short: "p", default: false },
      "preprocessor-prelude": { type: "boolean", short: "P", default: false },
      prelude: { type: "boolean", default: false },
      base: { type: "string" },
    },
    allowPositionals: true,
    allowNegative: true,
  });

  const argv: Arguments = {
    ...values,
    file: values.file || (typeof positionals[0] === "string" ? positionals[0] : "-"),
    base: values.base ? Number(values.base) : undefined,
  };

  run(argv);
}
