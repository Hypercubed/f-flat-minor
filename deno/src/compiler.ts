import { Compiler as CoreCompiler } from "../../typescript/core/src/compiler.ts";
import { createDenoCompilerHost } from "./runtime.ts";

export class Compiler extends CoreCompiler {
  constructor() {
    super(createDenoCompilerHost());
  }
}

export { CoreCompiler };
