import { Engine as CoreEngine } from "../../typescript/core/src/engine.ts";
import { createNodePlatform } from "./runtime.ts";

export class Engine extends CoreEngine {
  constructor() {
    super(createNodePlatform());
  }
}

export { CoreEngine };
