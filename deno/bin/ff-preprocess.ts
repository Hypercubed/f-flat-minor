#!/usr/bin/env -S deno run --allow-read --allow-env --no-check
import { parseArgs } from "https://deno.land/std@0.224.0/cli/parse_args.ts";
import * as path from "https://deno.land/std@0.224.0/path/mod.ts";

import { readStdin } from "../src/read.ts";
import { Preprocessor } from "../src/preprocess.ts";
import type { PreprocessArgs } from "../src/args.ts";
import { buildStdlibRootList, FBM_STDLIB_PATH_ENV } from "../src/args.ts";
import { resolveDefaultStdlibRoot } from "../src/stdlib-roots.ts";

const STDLIB_ROOT = resolveDefaultStdlibRoot(import.meta.url);
const PRELUDE = "<prelude>";

function getStdlibRoots(argv: PreprocessArgs): string[] {
  return buildStdlibRootList({
    defaultRoot: STDLIB_ROOT,
    delimiter: path.DELIMITER,
    envValue: Deno.env.get(FBM_STDLIB_PATH_ENV),
    cliRoots: argv["stdlib-root"],
  });
}

export function run(argv: PreprocessArgs) {
  const filename = argv.file || "-";
  const code = filename == "-"
    ? new TextDecoder().decode(readStdin())
    : Deno.readTextFileSync(filename);

  const loadPreprocessorPrelude = !!(argv["preprocessor-prelude"] || argv.prelude);
  const preprocessor = new Preprocessor(
    {
      stdlibRoots: getStdlibRoots(argv),
      ...(loadPreprocessorPrelude ? { macroEngineBootstrapFile: PRELUDE } : {}),
    },
  );
  const processed = preprocessor.preprocess(Preprocessor.tokenize(code), filename);
  console.log(processed);
}

if (import.meta.main) {
  const parsed = parseArgs(Deno.args, {
    boolean: ["prelude", "preprocessor-prelude"],
    string: ["stdlib-root"],
    collect: ["stdlib-root"],
    default: { prelude: false, "preprocessor-prelude": false },
    alias: {
      "preprocessor-prelude": ["P", "prelude"],
    },
  });

  const argv: PreprocessArgs = {
    ...parsed,
    file: (parsed._?.[0] as string) || "-",
  };

  run(argv);
}
