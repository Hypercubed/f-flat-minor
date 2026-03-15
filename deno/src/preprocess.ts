import { Preprocessor as CorePreprocessor } from "../../typescript/core/src/preprocess.ts";
import { createDenoPreprocessHost } from "./runtime.ts";
import { Compiler } from "./compiler.ts";
import { Engine } from "./engine.ts";

export class Preprocessor extends CorePreprocessor {
  constructor() {
    super(createDenoPreprocessHost(), {
      engine: new Engine(),
      compiler: new Compiler()
    });
  }
}

export { CorePreprocessor };
