import { describe, expect, it } from "vitest";

import { Compiler, Engine } from "../../typescript/core/src/mod.ts";
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

function compileSource(source: string) {
  return new Compiler().compileToIR(Compiler.tokenize(source), "/main.ffp");
}

describe("Engine.runAsync", () => {
  it("matches synchronous run() output", async () => {
    const source = "1 2 + 3 *";
    const ir = compileSource(source);

    const syncEngine = new Engine(createTestPlatform());
    syncEngine.loadIR(ir);
    syncEngine.run();

    const asyncEngine = new Engine(createTestPlatform());
    asyncEngine.loadIR(ir);
    await asyncEngine.runAsync({ yieldEvery: 2 });

    expect(asyncEngine.getStack()).toEqual(syncEngine.getStack());
  });

  it("yields between chunks when work remains", async () => {
    const source = Array.from({ length: 200 }, (_, index) => String(index)).join(" ");
    const ir = compileSource(source);
    const engine = new Engine(createTestPlatform());
    engine.loadIR(ir);

    let schedulerCalls = 0;
    await engine.runAsync({
      yieldEvery: 1,
      scheduler: () => {
        schedulerCalls++;
      },
    });

    expect(engine.getStack().length).toBe(200);
    expect(engine.getStack()[0]).toBe(0n);
    expect(engine.getStack()[199]).toBe(199n);
    expect(schedulerCalls).toBeGreaterThan(0);
  });

  it("rejects invalid chunk sizes", async () => {
    const engine = new Engine(createTestPlatform());
    engine.loadIR(compileSource("1"));

    await expect(engine.runAsync({ yieldEvery: 0 })).rejects.toThrow(
      "runAsync: yieldEvery must be a positive finite number",
    );
  });
});
