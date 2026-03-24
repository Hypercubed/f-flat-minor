import { Preprocessor as CorePreprocessor } from "../../typescript/core/src/preprocess.ts";
import { Compiler } from "./compiler.ts";
import { Engine } from "./engine.ts";
import { createNodePreprocessHost } from "./runtime.ts";

export class Preprocessor extends CorePreprocessor {
  constructor(options?: { macroEngineBootstrapFile?: string }) {
    super(createNodePreprocessHost(), {
      engine: new Engine(),
      compiler: new Compiler(),
    }, options);
  }
}

export { CorePreprocessor };
