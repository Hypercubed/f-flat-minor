import { describe, expect, it } from "vitest";

import {
  Compiler,
  Engine,
  Preprocessor,
} from "../../typescript/core/src/mod.ts";
import type {
  CorePlatform,
  PreprocessHost,
} from "../../typescript/core/src/platform.ts";
import { createPreprocessHost } from "./runtime.ts";

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

describe("preprocessor bootstrap regression", () => {
  it("does not leak bootstrap .import state into the main preprocess pass", () => {
    const files = {
      "/lib/core.ff": "inc: 1 + ;",
      "/lib/prelude.ffp": ".import ./core.ff",
      "/main.ffp": ".import /lib/prelude.ffp\n1 inc",
    };

    const preprocessHost: PreprocessHost = createPreprocessHost(files);
    const macroCompiler = new Compiler();
    const macroEngine = new Engine(createTestPlatform());
    const preprocessor = new Preprocessor(
      preprocessHost,
      { engine: macroEngine, compiler: macroCompiler },
      { macroEngineBootstrapFile: "/lib/prelude.ffp" },
    );

    const preprocessed = preprocessor.preprocess(
      Preprocessor.tokenize(files["/main.ffp"]),
      "/main.ffp",
    );

    const runtimeCompiler = new Compiler();
    const runtimeEngine = new Engine(createTestPlatform());
    const ir = runtimeCompiler.compileToIR(
      Compiler.tokenize(preprocessed),
      "/main.ffp",
    );

    runtimeEngine.loadIR(ir);
    runtimeEngine.run();

    expect(runtimeEngine.getStack()).toEqual([2n]);
  });

  it("keeps .ffp macros disabled while bootstrapping the prelude", () => {
    const files = {
      "/lib/prelude.ffp": ".ffp 1 2 +",
    };

    const preprocessHost: PreprocessHost = createPreprocessHost(files);
    const macroCompiler = new Compiler();
    const macroEngine = new Engine(createTestPlatform());

    expect(() => new Preprocessor(
      preprocessHost,
      { engine: macroEngine, compiler: macroCompiler },
      { macroEngineBootstrapFile: "/lib/prelude.ffp" },
    )).toThrowError(
      "Preprocessor: .ffp requires prelude-enabled macro context",
    );
  });
});
