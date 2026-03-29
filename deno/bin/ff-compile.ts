#!/usr/bin/env -S deno run --allow-read --allow-env --no-check
import { red } from "https://deno.land/std@0.224.0/fmt/colors.ts";
import { parseArgs } from "https://deno.land/std@0.224.0/cli/parse_args.ts";
import * as path from "https://deno.land/std@0.224.0/path/mod.ts";

import { base64ToArrayBuffer, dumpByteArray } from "../src/dump.ts";

import { readStdin } from "../src/read.ts";
import { disassembleIr, printDecimalCode, printFfCompatibleIr, printHighLevelIr, printLowLevelIr } from "../src/ir.ts";
import { Compiler } from "../src/compiler.ts";
import { HEADER } from "../src/constants.ts";
import { Optimizer } from "../src/optimizer.ts";
import { Preprocessor } from "../src/preprocess.ts";
import { dec2hex } from "../src/strings.ts";
import { red as coreRed } from "../src/colors.ts";
import type { CompileArgs } from "../src/args.ts";

const __dirname = path.dirname(path.fromFileUrl(import.meta.url));
const PRELUDE = path.resolve(__dirname, "../../ff/lib/prelude.ffp");

export function run(argv: CompileArgs) {
  const filename = argv.file || "-";
  let code = filename == "-"
    ? new TextDecoder().decode(readStdin())
    : Deno.readTextFileSync(filename);

  if (!('preprocess' in argv) || argv.preprocess) {
    const loadPreprocessorPrelude = !!(argv["preprocessor-prelude"] || argv.prelude);
    const preprocessor = new Preprocessor(
      loadPreprocessorPrelude ? { macroEngineBootstrapFile: PRELUDE } : undefined,
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
      Deno.exit(1);
    }
  }

  if (argv.hlir) {
    printHighLevelIr(ir);
    Deno.exit(0);
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
    Deno.exit(0);
  }

  if (argv.ir) {
    printFfCompatibleIr(ir);
    Deno.exit(0);
  }

  if (argv.disassemble) {
    disassembleIr(ir);
    Deno.exit(0);
  }

  if (argv.dc) {
    printDecimalCode(ir);
    Deno.exit(0);
  }
  
  const base64Encoded = Compiler.compileToBase64(ir);

  if (argv.bc) {
    const byteCode = base64ToArrayBuffer(base64Encoded);
    const s = [...byteCode].map(decimalToHexString).join(' ');
    console.log(s);
    Deno.exit(0);
  }

  if (argv.dump) {
    const byteCode = base64ToArrayBuffer(base64Encoded);
    dumpByteArray(byteCode);
    Deno.exit(0);
  }

  const encoder = new TextEncoder();
  Deno.stdout.writeSync(encoder.encode(HEADER));
  Deno.stdout.writeSync(encoder.encode(base64Encoded));
}

function decimalToHexString(n: number) {
  const s = dec2hex(n);
  if (s.length % 2 == 1) {
    return '0' + s;
  }
  return s;
}

if (import.meta.main) {
  const parsed = parseArgs(Deno.args, {
    boolean: [
      "preprocess",
      "stats",
      "validate",
      "hlir",
      "opt",
      "ir",
      "llir",
      "disassemble",
      "dc",
      "bc",
      "dump",
      "preprocessor-prelude",
      "prelude",
    ],
    string: ["file"],
    default: {
      preprocess: true,
      stats: false,
      validate: true,
      hlir: false,
      opt: false,
      ir: false,
      llir: false,
      disassemble: false,
      dc: false,
      bc: false,
      dump: false,
      "preprocessor-prelude": false,
      prelude: false,
      file: "-",
    },
    alias: {
      f: "file",
      E: "preprocess",
      s: "stats",
      V: "validate",
      h: "hlir",
      O: "opt",
      i: "ir",
      l: "llir",
      d: "disassemble",
      c: "dc",
      b: "bc",
      P: "preprocessor-prelude",
    },
  });

  const argv: CompileArgs = {
    ...parsed,
    file: (parsed._?.[0] as string) || parsed.file || "-",
  };

  run(argv);
}
