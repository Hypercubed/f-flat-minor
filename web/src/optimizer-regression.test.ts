import { describe, expect, it } from "vitest";

import { Compiler, Engine, Optimizer } from "../../typescript/core/src/mod.ts";
import type { CorePlatform } from "../../typescript/core/src/platform.ts";

function createTestPlatform(): CorePlatform {
  return {
    io: {
      write(_data) {
        // noop
      },
      readByte() {
        return null;
      },
    },
    exit(_code) {
      // noop
    },
    now() {
      return Date.now();
    },
  };
}

describe("optimizer regression", () => {
  it("handles expressions that end with an opcode", () => {
    const compiler = new Compiler();
    const ir = compiler.compileToIR(Compiler.tokenize("1 2 +"), "/main.ffp");

    const optimized = new Optimizer().optimize(ir);

    const engine = new Engine(createTestPlatform());
    engine.loadIR(optimized);
    engine.run();

    expect(engine.getStack()).toEqual([3n]);
  });
});
