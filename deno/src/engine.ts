import { Engine as CoreEngine } from "../../typescript/core/src/engine.ts";
import { createDenoPlatform } from "./runtime.ts";

export class Engine extends CoreEngine {
  constructor() {
    super(createDenoPlatform());
  }
}

export { CoreEngine };
