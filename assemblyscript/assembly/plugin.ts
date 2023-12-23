import { Host } from '@extism/as-pdk';
import * as core from './core';

core.reset();

export function run(): i32 {
  core.run(Host.inputString());
  return 0;
}

export function peek(): i32 {
  Host.outputString(`${core.peek()}`);
  return 0;
}

export function dump(): i32 {
  core.dump();
  return 0;
}

export function reset(): i32 {
  core.reset();
  return 0;
}
