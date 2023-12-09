import { Host } from '@extism/as-pdk';
import * as core from './core';

export function run(): i32 {
  const r = Host.inputString();
  core.ev(core.tokenize(r));
  return 0;
}

export function peek(): i32 {
  Host.outputString(`${core.peek()}`);
  return 0;
}

export function reset(): i32 {
  core.reset();
  return 0;
}


