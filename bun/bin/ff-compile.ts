#!/usr/bin/env bun

import { Buffer } from "node:buffer";
import fs from "node:fs";
import path from "node:path";
import { parseArgs } from "node:util";
import { fileURLToPath } from "node:url";

import { base64ToArrayBuffer, dumpByteArray } from "../src/dump.ts";
import { readStdin } from "../src/read.ts";
import { disassembleIr, printDecimalCode, printFfCompatibleIr, printHighLevelIr, printLowLevelIr } from "../src/ir.ts";
import { Compiler } from "../src/compiler.ts";
import { HEADER } from "../src/constants.ts";
import { Optimizer } from "../src/optimizer.ts";
import { Preprocessor } from "../src/preprocess.ts";
import { dec2hex } from "../src/strings.ts";
import { red } from "../src/colors.ts";
import { CompileArgs } from "../src/args.ts";
import { buildStdlibRootList, FBM_STDLIB_PATH_ENV, normalizeStdlibRootArgs } from "../src/args.ts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const STDLIB_ROOT = path.resolve(__dirname, "../../ff/lib");
const PRELUDE = "<prelude>";

function getStdlibRoots(argv: CompileArgs): string[] {
  return buildStdlibRootList({
    defaultRoot: STDLIB_ROOT,
    delimiter: path.delimiter,
    envValue: process.env[FBM_STDLIB_PATH_ENV],
    cliRoots: argv["stdlib-root"],
  });
}

function getRuntimeArgs() {
  if (process.versions.bun) {
    const bunGlobal = globalThis as { Bun?: { argv?: string[] } };
    if (Array.isArray(bunGlobal.Bun?.argv)) {
      return bunGlobal.Bun.argv.slice(2);
    }
  }
  return process.argv.slice(2);
}

export function run(argv: CompileArgs) {
  const textEncoder = new TextEncoder();

  const filename = argv.file || "-";
  let code = filename == "-"
    ? new TextDecoder().decode(readStdin())
    : fs.readFileSync(filename, "utf-8");

  if (!('preprocess' in argv) || argv.preprocess) {
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
      console.log('Optimizer stats:');
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

  if (argv.dc) {
    printDecimalCode(ir);
    process.exit(0);
  }
  
  const base64Encoded = Compiler.compileToBase64(ir);

  if (argv.bc) {
    const byteCode = base64ToArrayBuffer(base64Encoded);
    const s = [...byteCode].map(decimalToHexString).join(' ');
    console.log(s);
    process.exit(0);
  }

  if (argv.dump) {
    const byteCode = base64ToArrayBuffer(base64Encoded);
    dumpByteArray(byteCode);
    process.exit(0);
  }

  process.stdout.write(Buffer.from(textEncoder.encode(HEADER)));
  process.stdout.write(base64Encoded);
}

function decimalToHexString(n: number) {
  const s = dec2hex(n);
  if (s.length % 2 == 1) {
    return '0' + s;
  }
  return s;
}

if (import.meta.main) {
  const { values, positionals } = parseArgs({
    args: getRuntimeArgs(),
    options: {
      file: { type: "string", short: "f" },
      preprocess: { type: "boolean", short: "E", default: true },
      stats: { type: "boolean", short: "s", default: false },
      validate: { type: "boolean", short: "V", default: true },
      hlir: { type: "boolean", short: "h", default: false },
      opt: { type: "boolean", short: "O", default: false },
      ir: { type: "boolean", short: "i", default: false },
      llir: { type: "boolean", short: "l", default: false },
      disassemble: { type: "boolean", short: "d", default: false },
      dc: { type: "boolean", short: "c", default: false },
      bc: { type: "boolean", short: "b", default: false },
      dump: { type: "boolean", default: false },
      "preprocessor-prelude": { type: "boolean", short: "P", default: false },
      prelude: { type: "boolean", default: false },
      "stdlib-root": { type: "string", multiple: true },
    },
    allowPositionals: true,
    allowNegative: true,
  });

  const argv: CompileArgs = {
    ...values,
    file: values.file || (typeof positionals[0] === "string" ? positionals[0] : "-"),
    "stdlib-root": normalizeStdlibRootArgs(values["stdlib-root"]),
  };

  run(argv);
}
