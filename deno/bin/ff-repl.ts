#!/usr/bin/env -S deno run --allow-read --allow-env --no-check
import { parseArgs } from "https://deno.land/std@0.224.0/cli/parse_args.ts";
import * as path from "https://deno.land/std@0.224.0/path/mod.ts";

import { Compiler } from "../src/compiler.ts";
import { Engine } from "../src/engine.ts";
import { Preprocessor } from "../src/preprocess.ts";
import { GREETINGS, SHORT } from "../src/constants.ts";
import type { ReplArgs } from "../src/args.ts";
import { buildStdlibRootList, FBM_STDLIB_PATH_ENV, normalizeStdlibRootArgs } from "../src/args.ts";
import { resolveDefaultStdlibRoot } from "../src/stdlib-roots.ts";

const STDLIB_ROOT = resolveDefaultStdlibRoot(import.meta.url);
const CORE = "<core>";
const PRELUDE = "<prelude>";

function getStdlibRoots(argv: ReplArgs): string[] {
  return buildStdlibRootList({
    defaultRoot: STDLIB_ROOT,
    delimiter: path.DELIMITER,
    envValue: Deno.env.get(FBM_STDLIB_PATH_ENV),
    cliRoots: argv["stdlib-root"],
  });
}

export async function run(args: ReplArgs) {
  const loadPreprocessorPrelude = !!(args["preprocessor-prelude"] || args.prelude);
  const stdlibRoots = getStdlibRoots(args);
  let compiler = new Compiler();
  let interpreter = new Engine();
  let preprocessor = new Preprocessor(
    {
      stdlibRoots,
      ...(loadPreprocessorPrelude ? { macroEngineBootstrapFile: PRELUDE } : {}),
    },
  );

  console.log();
  console.log(GREETINGS);

  if (!("core" in args) || args.core) {
    runLine(`.load ${CORE}`);
  }

  const PROMPT = `${SHORT}> `;
  const bufSize = 1024;
  const buf = new Uint8Array(bufSize);

  Deno.stdout.writeSync(new TextEncoder().encode(PROMPT));

  for (;;) {
    const n = await Deno.stdin.read(buf);
    if (n === null) break;
    
    const line = new TextDecoder().decode(buf.slice(0, n)).trim();
    if (line.length === 0) continue;

    runLine(line);
    interpreter.print();
    console.log();
    Deno.stdout.writeSync(new TextEncoder().encode(PROMPT));
  }

  function runLine(line: string) {
    if (line.trim() === ".reset") {
      compiler = new Compiler();
      interpreter = new Engine();
      preprocessor = new Preprocessor(
        {
          stdlibRoots,
          ...(loadPreprocessorPrelude ? { macroEngineBootstrapFile: PRELUDE } : {}),
        },
      );
      return;
    }
    if (line.trim() === ".exit" || line.trim() === ".quit") {
      console.log("Goodbye!");
      Deno.exit(0);
    }
    const code = preprocessor.preprocess([line]);
    const ir = compiler.compileToIR(Compiler.tokenize(code));
    interpreter.loadIR(ir);

    try {
      interpreter.run();
    } catch (err) {
      console.error(err);
    }
  }
}

if (import.meta.main) {
  const parsed = parseArgs(Deno.args, {
    boolean: ["core", "no-core", "preprocessor-prelude", "prelude"],
    string: ["stdlib-root"],
    collect: ["stdlib-root"],
    default: {
      core: true,
      "no-core": false,
      "preprocessor-prelude": false,
      prelude: false,
    },
    alias: {
      "preprocessor-prelude": ["P", "prelude"],
    },
  });

  const argv: ReplArgs = {
    ...parsed,
    core: parsed["no-core"] ? false : parsed.core,
    "stdlib-root": normalizeStdlibRootArgs(parsed["stdlib-root"]),
  };

  await run(argv);
}
