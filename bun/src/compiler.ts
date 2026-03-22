import { Compiler as CoreCompiler } from "../../typescript/core/src/compiler.ts";
import { createBunCompilerHost } from "./runtime.ts";

export class Compiler extends CoreCompiler {
  constructor() {
    super(createBunCompilerHost());
  }
}

export { CoreCompiler };
