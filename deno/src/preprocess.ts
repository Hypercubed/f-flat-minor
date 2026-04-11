import { Preprocessor as CorePreprocessor } from "../../typescript/core/src/preprocess.ts";
import { createDenoPreprocessHost } from "./runtime.ts";
import { Compiler } from "./compiler.ts";
import { Engine } from "./engine.ts";
import { resolveDefaultStdlibRoot } from "./stdlib-roots.ts";

const DEFAULT_STDLIB_ROOT = resolveDefaultStdlibRoot(import.meta.url);

export class Preprocessor extends CorePreprocessor {
  constructor(options?: { macroEngineBootstrapFile?: string; stdlibRoots?: string[] }) {
    super(createDenoPreprocessHost(), {
      engine: new Engine(),
      compiler: new Compiler()
    }, {
      ...options,
      stdlibRoots: options?.stdlibRoots ?? [DEFAULT_STDLIB_ROOT],
    });
  }
}

export { CorePreprocessor };
