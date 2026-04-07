import { assertEquals } from "std/assert/mod.ts";

import { Compiler } from "./compiler.ts";
import { IROp } from "../../typescript/core/src/ir.ts";
import { OpCodes } from "../../typescript/core/src/opcodes.ts";

function irSnapshot(source: string) {
  const ir = new Compiler().compileToIR(Compiler.tokenize(source), "test.ff");
  return ir.map((i) => ({
    op: i.op,
    value: i.value,
  }));
}

Deno.test('double-quoted string compiles like bracketed single-quoted', () => {
  assertEquals(
    irSnapshot('"hi"'),
    irSnapshot("[ 'hi' ]"),
  );
});

Deno.test("double-quoted string IR: BRA, character pushes, KET", () => {
  const ir = new Compiler().compileToIR(Compiler.tokenize('"hi"'), "test.ff");
  assertEquals(ir.length, 4);
  assertEquals(ir[0]?.op, IROp.call);
  assertEquals(ir[0]?.value, BigInt(OpCodes.BRA));
  assertEquals(ir[1]?.op, IROp.push);
  assertEquals(ir[1]?.value, 104n);
  assertEquals(ir[2]?.op, IROp.push);
  assertEquals(ir[2]?.value, 105n);
  assertEquals(ir[3]?.op, IROp.call);
  assertEquals(ir[3]?.value, BigInt(OpCodes.KET));
});

Deno.test('double-quoted empty string is empty quotation', () => {
  const ir = new Compiler().compileToIR(Compiler.tokenize('""'), "test.ff");
  assertEquals(ir.length, 2);
  assertEquals(ir[0]?.op, IROp.call);
  assertEquals(ir[0]?.value, BigInt(OpCodes.BRA));
  assertEquals(ir[1]?.op, IROp.call);
  assertEquals(ir[1]?.value, BigInt(OpCodes.KET));
});

Deno.test("double-quoted escapes match [ '...' ] form", () => {
  assertEquals(irSnapshot('"\\n"'), irSnapshot("[ '\\n' ]"));
  // \" in double quotes is ASCII 34; '\'' in single quotes is ASCII 39 — same rules, different payload.
  assertEquals(irSnapshot('"\\""'), irSnapshot("[ 34 ]"));
});
