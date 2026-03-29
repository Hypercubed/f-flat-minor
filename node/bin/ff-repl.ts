#!/usr/bin/env -S node --experimental-transform-types --disable-warning=ExperimentalWarning

import path from "node:path";
import { parseArgs } from "node:util";
import { fileURLToPath } from "node:url";
import { createInterface } from "node:readline";

import { Compiler } from "../src/compiler.ts";
import { Engine } from "../src/engine.ts";
import { Preprocessor } from "../src/preprocess.ts";
import { GREETINGS, SHORT } from "../src/constants.ts";
import type { ReplArgs } from "../src/args.ts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CORE = path.resolve(__dirname, "../../ff/lib/core.ff");
const PRELUDE = path.resolve(__dirname, "../../ff/lib/prelude.ffp");

export function run(args: ReplArgs) {
  const loadPreprocessorPrelude = !!(args["preprocessor-prelude"] || args.prelude);
  let compiler = new Compiler();
  let interpreter = new Engine();
  let preprocessor = new Preprocessor(
    loadPreprocessorPrelude ? { macroEngineBootstrapFile: PRELUDE } : undefined,
  );

  console.log();
  console.log(GREETINGS);

  if (!("core" in args) || args.core) {
    runLine(`.load ${CORE}`);
  }

  const PROMPT = `${SHORT}> `;

  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: PROMPT,
  });

  rl.prompt();

  rl.on("line", (line: string) => {
    runLine(line);
    interpreter.print();
    console.log();
    rl.prompt();
  });

  rl.on("close", () => {
    console.log("\nGoodbye!");
    process.exit(0);
  });

  function runLine(line: string) {
    if (line.trim() === ".reset") {
      compiler = new Compiler();
      interpreter = new Engine();
      preprocessor = new Preprocessor(
        loadPreprocessorPrelude ? { macroEngineBootstrapFile: PRELUDE } : undefined,
      );
      return;
    }
    if (line.trim() === ".exit" || line.trim() === ".quit") {
      console.log("Goodbye!");
      process.exit(0);
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
  const { values } = parseArgs({
    args: process.argv.slice(2),
    options: {
      core: { type: "boolean", default: true },
      "no-core": { type: "boolean", default: false },
      "preprocessor-prelude": { type: "boolean", short: "P", default: false },
      prelude: { type: "boolean", default: false },
    },
    allowPositionals: true,
    allowNegative: true,
  });

  const argv: ReplArgs = {
    ...values,
    core: values["no-core"] ? false : values.core,
  };

  run(argv);
}
