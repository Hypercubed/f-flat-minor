import { setIrWriter } from "../../typescript/core/src/ir.ts";

const encoder = new TextEncoder();

setIrWriter((text: string) => {
  Deno.stdout.writeSync(encoder.encode(text));
});

export * from "../../typescript/core/src/ir.ts";
