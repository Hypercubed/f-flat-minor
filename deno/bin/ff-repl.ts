#!/usr/bin/env -S deno run --allow-read --allow-env --no-check

import { parseArgs } from "https://deno.land/std@0.224.0/cli/parse_args.ts";
import * as path from "https://deno.land/std@0.224.0/path/mod.ts";

// Simple readLines implementation (std/io/read_lines was removed in newer std)
async function* readLines(reader: Deno.Reader): AsyncIterableIterator<string> {
  const decoder = new TextDecoder();
  let buffer = "";
  
  while (true) {
    const chunk = new Uint8Array(1024);
    const n = await reader.read(chunk);
    
    if (n === null) {
      if (buffer.length > 0) {
        yield buffer;
      }
      break;
    }
    
    const text = decoder.decode(chunk.subarray(0, n), { stream: n === 0 });
    buffer += text;
    
    const lines = buffer.split("\n");
    buffer = lines.pop() || "";
    
    for (const line of lines) {
      yield line;
    }
  }
}

interface Arguments {
  core?: boolean;
  [key: string]: unknown;
}

import { Compiler } from "../src/compiler.ts";
import { Engine } from "../src/engine.ts";
import { Preprocessor } from "../src/preprocess.ts";
import { GREETINGS, SHORT } from "../src/constants.ts";

const PROMPT = new TextEncoder().encode(`${SHORT}> `);
const core = path.fromFileUrl(
  path.join(import.meta.url, "../../../ff/lib/core.ff"),
);

export async function run(args: Arguments) {
  let compiler = new Compiler();
  let interpreter = new Engine();
  let preprocessor = new Preprocessor();

  console.log();
  console.log(GREETINGS);

  if (!("core" in args) || args.core) {
    runLine(`.load ${core}`);
  }

  // Read lines one at a time manually to properly handle EOF
  const reader = readLines(Deno.stdin);
  
  while (true) {
    Deno.stdout.writeSync(PROMPT);
    
    const result = await reader.next();
    
    // Handle EOF (stdin closed)
    if (result.done || result.value === undefined) {
      console.log("\nGoodbye!");
      Deno.exit(0);
    }
    
    const line = result.value;
    runLine(line);
    interpreter.print();
    console.log("");
  }

  function runLine(line: string) {
    if (line.trim() === '.reset') {
      compiler = new Compiler();
      interpreter = new Engine();
      preprocessor = new Preprocessor();
      return;
    }
    if (line.trim() === '.exit' || line.trim() === '.quit') {
      console.log("Goodbye!");
      Deno.exit(0);
    }
    const code = preprocessor.preprocess([line]);
    const ir = compiler.compileToIR(Compiler.tokenize(code));
    interpreter.loadIR(ir);

    try {
      interpreter.run();
    } catch(err) {
      console.error(err);
    }
  }
}

if (import.meta.main) {
  const argv = parseArgs(Deno.args, {
    boolean: ["core", "no-core"],
    default: { core: true },
    alias: {
      "no-core": ["nc"],
    },
  });
  // Handle --no-core by setting core to false
  if (argv["no-core"]) {
    argv.core = false;
  }
  await run(argv as Arguments);
}
