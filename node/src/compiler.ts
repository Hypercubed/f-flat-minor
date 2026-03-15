import { Compiler as CoreCompiler } from "../../typescript/core/src/compiler.ts";
import { createNodeCompilerHost } from "./runtime.ts";

export class Compiler extends CoreCompiler {
  constructor() {
    super(createNodeCompilerHost());
  }
}

export { CoreCompiler };
