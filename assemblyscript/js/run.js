#!/usr/bin/env -S node --no-warnings

import { createInterface } from 'readline';
import createPlugin from "@extism/extism";

const plugin = await createPlugin("./build/assembly/plugin.wasm", { useWasi: true });
await plugin.call("_start");

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

for await (const line of rl) {
  await plugin.call("run", line);
}

process.exit();