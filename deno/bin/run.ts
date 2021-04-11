#!/usr/bin/env -S deno run --allow-read

import { readStdin } from "../src/read.ts";
import * as compiler from "../src/compile.ts";
import * as interpreter from "../src/execute.ts";

export function run() {
  const code = new TextDecoder().decode(readStdin());

  compiler.setup();
  const ir = compiler.compileToIR(compiler.tokenize(code));
  const byteCode = compiler.compileToByteArray(ir);

  interpreter.setup();
  const bigCode = interpreter.fromByteArray(byteCode);
  interpreter.executeBigIntCode(bigCode);
}

if (import.meta.main) {
  run();
}
