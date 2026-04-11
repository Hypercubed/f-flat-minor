import { Preprocessor as CorePreprocessor } from "../../typescript/core/src/preprocess.ts";
import { Compiler } from "./compiler.ts";
import { Engine } from "./engine.ts";
import { createNodePreprocessHost } from "./runtime.ts";
import { resolveDefaultStdlibRoot } from "./stdlib-roots.ts";

const DEFAULT_STDLIB_ROOT = resolveDefaultStdlibRoot(import.meta.url);

export class Preprocessor extends CorePreprocessor {
  constructor(options?: { macroEngineBootstrapFile?: string; stdlibRoots?: string[] }) {
    super(createNodePreprocessHost(), {
      engine: new Engine(),
      compiler: new Compiler(),
    }, {
      ...options,
      stdlibRoots: options?.stdlibRoots ?? [DEFAULT_STDLIB_ROOT],
    });
  }
}

export { CorePreprocessor };
