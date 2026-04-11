import { Preprocessor as CorePreprocessor } from "../../typescript/core/src/preprocess.ts";
import { Compiler } from "./compiler.ts";
import { Engine } from "./engine.ts";
import { createBunPreprocessHost } from "./runtime.ts";
import path from "node:path";
import { fileURLToPath } from "node:url";

const DEFAULT_STDLIB_ROOT = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../../ff/lib",
);

export class Preprocessor extends CorePreprocessor {
  constructor(options?: { macroEngineBootstrapFile?: string; stdlibRoots?: string[] }) {
    super(createBunPreprocessHost(), {
      engine: new Engine(),
      compiler: new Compiler(),
    }, {
      ...options,
      stdlibRoots: options?.stdlibRoots ?? [DEFAULT_STDLIB_ROOT],
    });
  }
}

export { CorePreprocessor };
