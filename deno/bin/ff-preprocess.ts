#!/usr/bin/env -S deno run --allow-read --allow-env --no-check
import { parseArgs } from "https://deno.land/std@0.224.0/cli/parse_args.ts";
import * as path from "https://deno.land/std@0.224.0/path/mod.ts";

import { readStdin } from "../src/read.ts";
import { Preprocessor } from "../src/preprocess.ts";
import type { PreprocessArgs } from "../src/args.ts";

const __dirname = path.dirname(path.fromFileUrl(import.meta.url));
const PRELUDE = path.resolve(__dirname, "../../ff/lib/prelude.ffp");

export function run(argv: PreprocessArgs) {
  const filename = argv.file || "-";
  const code = filename == "-"
    ? new TextDecoder().decode(readStdin())
    : Deno.readTextFileSync(filename);

  const loadPreprocessorPrelude = !!(argv["preprocessor-prelude"] || argv.prelude);
  const preprocessor = new Preprocessor(
    loadPreprocessorPrelude ? { macroEngineBootstrapFile: PRELUDE } : undefined,
  );
  const processed = preprocessor.preprocess(Preprocessor.tokenize(code), filename);
  console.log(processed);
}

if (import.meta.main) {
  const parsed = parseArgs(Deno.args, {
    boolean: ["prelude", "preprocessor-prelude"],
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
