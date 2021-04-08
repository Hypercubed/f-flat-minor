import { assertEquals } from "https://deno.land/std@0.92.0/testing/asserts.ts";

import {
  compileToByteArray,
  compileToIR,
  setup as setupCompiler,
  tokenize,
} from "./compile.ts";
import {
  executeBigIntCode,
  fromByteArray,
  setup as setupVM,
} from "./execute.ts";

setupCompiler();
setupVM();

function run(code: string): bigint[] {
  const ir = compileToIR(tokenize(code));
  const byteCode = compileToByteArray(ir);
  const bigCode = fromByteArray(byteCode);
  return executeBigIntCode(bigCode);
}

const { test } = Deno;

test("clr", () => {
  assertEquals(run(`clr 1 2 clr`), []);
});

test("add", () => {
  assertEquals(run(`clr 1 2 +`), [3n]);
});

test("sub", () => {
  assertEquals(run(`clr 1 2 -`), [-1n]);
});

test("mul", () => {
  assertEquals(run(`clr 3 7 *`), [21n]);
});

test("div", () => {
  assertEquals(run(`clr 7 3 /`), [2n]);
});

test("dup", () => {
  assertEquals(run(`clr 7 3 dup`), [7n, 3n, 3n]);
});

test("drop", () => {
  assertEquals(run(`clr 7 3 drop`), [7n]);
});

test("swap", () => {
  assertEquals(run(`clr 7 3 swap`), [3n, 7n]);
});

test("=", () => {
  assertEquals(run(`clr 7 3 =`), [0n]);
  assertEquals(run(`clr 7 7 =`), [1n]);
});

test("&", () => {
  assertEquals(run(`clr &+`), [43n]);
});

test("string", () => {
  assertEquals(run(`clr 'ABC`), [67n, 66n, 65n]);
});
