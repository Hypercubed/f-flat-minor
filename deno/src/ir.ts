import { IrInstruction } from "./compile.ts";

export function printIr(ir: Array<IrInstruction>) {
  ir.forEach((i) => {
    const o = "." + i.op.padEnd(6, " ");
    const n = ("" + i.value).padEnd(5, " ");
    const c = i.comment ? `/* ${i.comment} */` : "";
    console.log(o, n, c);
  });
}