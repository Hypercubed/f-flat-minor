import { Preprocessor as CorePreprocessor } from "../../typescript/core/src/preprocess.ts";
import { createDenoPreprocessHost } from "./runtime.ts";
import { Compiler } from "./compiler.ts";
import { Engine } from "./engine.ts";

export class Preprocessor extends CorePreprocessor {
  constructor(options?: { bootstrapFile?: string }) {
    super(createDenoPreprocessHost(), {
      engine: new Engine(),
      compiler: new Compiler()
    }, options);
  }
}

export { CorePreprocessor };
