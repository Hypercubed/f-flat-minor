import { setIrWriter } from "../../typescript/core/src/ir.ts";

setIrWriter((text: string) => {
  process.stdout.write(text);
});

export * from "../../typescript/core/src/ir.ts";
