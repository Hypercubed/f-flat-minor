import { blue } from "https://deno.land/std@0.139.0/fmt/colors.ts";

export interface IrInstruction {
  value: bigint;
  op: IROp;
  comment?: string;
  name?: string;
}

export enum IROp {
  call = "call",
  push = "push",
}

const OP_WIDTH = 6;
const VALUE_WIDTH = 10;

export function printIr(ir: Array<IrInstruction>) {
  ir.forEach((i) => {
    const o = '.' + i.op.padEnd(OP_WIDTH, ' ');
    const n = ('' + i.value).padEnd(VALUE_WIDTH, ' ');
    const c = i.comment?.trim() ? `/* ${i.comment} */` : '';
    console.log(blue(n), o, c);
  });
}

export function printBigCodeIr(bc: Array<bigint>) {
  const ir: Array<IrInstruction> = [];
  let ip = 0;
  while (ip < bc.length) {
    const value = bc[ip++];
    if (value === 0n) {
      ir.push({ op: IROp.push, value: bc[ip++] });
    } else {
      ir.push({ op: IROp.call, value });
    }
  }

  printIr(ir);
}
