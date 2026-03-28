import { describe, expect, it } from "vitest";

import { Compiler } from "../../typescript/core/src/compiler.ts";

function validate(source: string) {
  const compiler = new Compiler();
  const ir = compiler.compileToIR(Compiler.tokenize(source), "queued-validator.test.ff");
  return compiler.validate(ir);
}

describe("Compiler queued validator", () => {
  it("accepts balanced ( ) operations in a definition", () => {
    expect(validate("foo: ( ) ;")).toEqual([]);
  });

  it("rejects unmatched ) with an unsafe-borrow diagnostic", () => {
    expect(validate("foo: ) ;")).toEqual([
      "queued-validator.test.ff: Queue borrow ( ) ) requires .unsafe in foo (including quotes)",
      "queued-validator.test.ff: Unbalanced queue push ( q< q> ( ) ) in foo",
    ]);
  });

  it("rejects leftover ( at definition end", () => {
    expect(validate("foo: ( ;")).toEqual([
      "queued-validator.test.ff: Unbalanced queue push ( q< q> ( ) ) in foo",
    ]);
  });

  it("rejects nested quote imbalance involving ( )", () => {
    expect(validate("foo: [ ( ] ;")).toEqual([
      "queued-validator.test.ff: Unbalanced queue push ( q< q> ) in quote in foo",
      "queued-validator.test.ff: Unbalanced queue push ( q< q> ( ) ) in foo",
    ]);
  });

  it("accounts for mixed q< and ( operations within a quote", () => {
    expect(validate("foo: [ q< ) ] ;")).toEqual([]);
  });
});
