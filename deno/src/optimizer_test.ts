import { assertEquals } from "std/assert/mod.ts";

import { Engine } from "./engine.ts";
import { Compiler } from "./compiler.ts";
import { IROp } from "./ir.ts";
import { OpCodes } from "./opcodes.ts";
import { Optimizer } from "./optimizer.ts";

function optimizeSource(source: string) {
  const compiler = new Compiler();
  const ir = compiler.compileToIR(Compiler.tokenize(source), "/optimizer-test.ffp");
  return new Optimizer().optimize(ir);
}

function optimizedValues(source: string) {
  return optimizeSource(source).map((inst) => inst.value);
}

Deno.test("optimizer folds safe constant primitive operations", () => {
  assertEquals(optimizedValues("10 3 %"), [1n]);
  assertEquals(optimizedValues("8 2 <<"), [32n]);
  assertEquals(optimizedValues("8 1 >>"), [4n]);
  assertEquals(optimizedValues("6 3 &"), [2n]);
  assertEquals(optimizedValues("6 3 |"), [7n]);
  assertEquals(optimizedValues("5 ~"), [-6n]);
  assertEquals(optimizedValues("2 3 <"), [1n]);
  assertEquals(optimizedValues("3 3 ="), [1n]);
  assertEquals(optimizedValues("4 3 >"), [1n]);
  assertEquals(optimizedValues("2 10 ^"), [1024n]);
});

Deno.test("optimizer keeps guarded constant folds for runtime errors", () => {
  assertEquals(optimizedValues("10 0 %"), [10n, 0n, BigInt(OpCodes.MOD)]);
  assertEquals(optimizedValues("2 -1 ^"), [2n, -1n, BigInt(OpCodes.POW)]);
});

Deno.test("optimizer folds constants before conditional pruning", () => {
  const optimized = optimizeSource("2 3 < [dup] ?");

  assertEquals(optimized, [
    { op: IROp.call, value: BigInt(OpCodes.DUP), meta: { name: "dup" } },
  ]);
});

Deno.test("optimizer removes algebraic identities for neutral operands", () => {
  assertEquals(optimizedValues("rand 0 |"), [BigInt(OpCodes.RAND)]);
  assertEquals(optimizedValues("rand 0 <<"), [BigInt(OpCodes.RAND)]);
  assertEquals(optimizedValues("rand 0 >>"), [BigInt(OpCodes.RAND)]);
  assertEquals(optimizedValues("rand 1 ^"), [BigInt(OpCodes.RAND)]);
});

Deno.test("optimizer removes commutative swaps for symmetric operations", () => {
  assertEquals(optimizedValues("6 3 swap &"), [2n]);
  assertEquals(optimizedValues("6 3 swap |"), [7n]);
  assertEquals(optimizedValues("6 6 swap ="), [1n]);
});

Deno.test("optimizer compacts a single-word quote to a word pointer", () => {
  const optimized = optimizeSource("[ dup ]");

  assertEquals(optimized, [
    {
      op: IROp.push,
      value: BigInt(OpCodes.DUP),
      meta: { pointer: true, name: "dup" },
    },
  ]);
});

Deno.test("optimizer preserves behavior of compacted single-word quotes", () => {
  const optimized = optimizeSource("5 [ dup ] eval *");
  const engine = new Engine();

  engine.loadIR(optimized);
  engine.run();

  assertEquals(engine.getStack().map(String), ["25"]);
});

Deno.test("optimizer does not compact numeric single-item quotes", () => {
  const optimized = optimizeSource("[ 1 ]");

  assertEquals(optimized.map((inst) => inst.op), [
    IROp.push,
    IROp.call,
    IROp.push,
    IROp.call,
    IROp.push,
  ]);
  assertEquals(optimized[0]?.meta?.pointer, true);
  assertEquals(optimized[1]?.value, BigInt(OpCodes.MARK));
  assertEquals(optimized[2]?.value, 1n);
  assertEquals(optimized[3]?.value, BigInt(OpCodes.DEF));
  assertEquals(optimized[4]?.value, optimized[0]?.value);
  assertEquals(optimized[4]?.meta?.pointer, true);
});
