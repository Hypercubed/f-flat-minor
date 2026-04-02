import { assertEquals, assertExists } from "std/assert/mod.ts";

import { compileSource } from "../../typescript/compile-service/src/mod.ts";
import { Compiler } from "./compiler.ts";

Deno.test("tokenizeWithSpans tracks line and character offsets", () => {
  const tokens = Compiler.tokenizeWithSpans("alpha:\n  10 eval\n");

  assertEquals(tokens.map((token) => token.raw), ["alpha:", "10", "eval"]);
  assertEquals(tokens[0]?.line, 0);
  assertEquals(tokens[0]?.character, 0);
  assertEquals(tokens[1]?.line, 1);
  assertEquals(tokens[1]?.character, 2);
  assertEquals(tokens[2]?.line, 1);
  assertEquals(tokens[2]?.character, 5);
});

Deno.test("compileSource extracts user definitions with source ranges", () => {
  const result = compileSource("square: dup * ;\n5 square", "/main.ffp");
  const square = result.definitions.get("square");

  assertExists(square);
  assertEquals(square!.body, "dup *");
  assertEquals(square!.nameRange.start, { line: 0, character: 0 });
  assertEquals(square!.bodyRange?.start, { line: 0, character: 8 });
  assertEquals(square!.bodyRange?.end, { line: 0, character: 13 });
  assertEquals(result.sourceMap.wordAt({ line: 1, character: 3 }), "square");
});

Deno.test("compileSource reports analyzer diagnostics with ranges", () => {
  const result = compileSource("10 eval", "/main.ffp");

  assertEquals(result.diagnostics.length, 1);
  assertEquals(result.diagnostics[0]?.severity, "error");
  assertEquals(result.diagnostics[0]?.range.start, { line: 0, character: 3 });
  assertEquals(result.diagnostics[0]?.range.end, { line: 0, character: 7 });
});
