import { Preprocessor as CorePreprocessor } from "../../typescript/core/src/preprocess.ts";
import { Compiler } from "./compiler.ts";
import { Engine } from "./engine.ts";
import { createBunPreprocessHost } from "./runtime.ts";

export class Preprocessor extends CorePreprocessor {
  constructor(options?: { bootstrapFile?: string }) {
    super(createBunPreprocessHost(), {
      engine: new Engine(),
      compiler: new Compiler(),
    }, options);
  }
}

export { CorePreprocessor };
