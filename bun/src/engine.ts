import { Engine as CoreEngine } from "../../typescript/core/src/engine.ts";
import { createBunPlatform } from "./runtime.ts";

export class Engine extends CoreEngine {
  constructor() {
    super(createBunPlatform());
  }
}

export { CoreEngine };
