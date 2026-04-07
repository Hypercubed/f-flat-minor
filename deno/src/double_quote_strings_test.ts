import { assertEquals } from "std/assert/mod.ts";

import { Compiler } from "./compiler.ts";
import { IROp } from "../../typescript/core/src/ir.ts";

function pushCodes(source: string): bigint[] {
  const ir = new Compiler().compileToIR(Compiler.tokenize(source), "test.ff");
  return ir.filter((i) => i.op === IROp.push).map((i) => i.value);
}

Deno.test("double-quoted strings compile like single-quoted (per-char pushes)", () => {
  assertEquals(pushCodes('"hi"'), pushCodes("'hi'"));
  assertEquals(pushCodes('"hi"'), [104n, 105n]);
});

Deno.test("double-quoted empty string emits no push literals", () => {
  assertEquals(pushCodes('""'), []);
});

Deno.test("double-quoted strings use same escapes as single-quoted", () => {
  assertEquals(pushCodes('"\\n"'), pushCodes("'\\n'"));
  assertEquals(pushCodes('"\\n"'), [10n]);
  assertEquals(pushCodes('"\\""'), [34n]);
  assertEquals(pushCodes("'\\''"), [39n]);
});
