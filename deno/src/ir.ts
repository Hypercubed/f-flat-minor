import { blue, green, red, cyan } from "https://deno.land/std@0.139.0/fmt/colors.ts";

interface Meta {
  comment: string;
  name: string;
  inline: boolean;
  pointer: boolean;
  unsafe: boolean;
  filename: string;
  line: number;
}

export interface IrInstruction {
  value: bigint;
  op: IROp;
  meta?: Partial<Meta>;
}

export enum IROp {
  call = "call",
  push = "push",
}

const OP_WIDTH = 6;
const VALUE_WIDTH = 10;

export function printHighLevelIr(ir: Array<IrInstruction>) {
  ir.forEach((i) => {
    const c = i.meta?.comment?.trim() ? `; ${i.meta?.comment}` : "";
    const n = ("" + i.meta?.name?.toUpperCase()).padEnd(VALUE_WIDTH, " ");
    const v = ("" + i.value).padEnd(VALUE_WIDTH, " ");
    const o = i.op.toUpperCase();

    let m = '';
    m = i.meta?.inline ? ".inline" : "";
    m = i.meta?.pointer ? ".pointer" : m;
    m = m.trim();

    if (i.op === IROp.call && i.meta?.name) {
      console.log(blue(o), green(n), red(m), c);
      return;
    } else if (i.op === IROp.push && i.meta?.pointer) {
      console.log(blue(o), green(n), red(m), c);
      return;
    } else if (i.op === IROp.push) {
      console.log(blue(o), cyan(v), red(m), c);
      return;
    } else if (i.op === IROp.call && i.value === 0n) {
      console.log("    ", red(m), c);
      return;
    } else {
      console.log(blue(o), cyan(v), green(n), red(m), c);
    }
  });
}

export function disassembleIr(ir: Array<IrInstruction>) {
  ir.forEach((i) => {
    const c = i.meta?.comment?.trim() ? `/* ${i.meta?.comment} */` : "";
    const n = ("" + i.meta?.name).padEnd(VALUE_WIDTH, " ");
    const v = ("" + i.value).padEnd(VALUE_WIDTH, " ");
    // const o = i.op.toUpperCase();

    // let m = '';
    // m = i.meta?.inline ? ".inline" : "";
    // m = i.meta?.pointer ? ".pointer" : m;
    // m = m.trim();

    if (i.op === IROp.push) {
      console.log(v, c);
      return;
    } else if (i.op === IROp.call && i.value === 0n) {
      console.log("    ", c);
      return;
    } else if (i.op === IROp.call && i.value >= 0n) {
      console.log(n, c);
      return;
    } else if (i.op === IROp.call) {
      console.log(v, 'eval', c);
      return;
    }
  });
}

export function printLowLevelIr(ir: Array<IrInstruction>) {
  ir.forEach((i) => {
    const o = i.op.toUpperCase().padEnd(OP_WIDTH, " ");
    const n = i.meta?.name?.toUpperCase() || "";
    const v = ("" + i.value).padEnd(VALUE_WIDTH, " ");
    const c = [n, i.meta?.comment || ""].join(" ").trim();
    console.log(blue(o), cyan(v), c ? `; ${c}` : "");
  });
}

export function bigCodeToIr(bc: Array<bigint>): Array<IrInstruction> {
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
  return ir;
}

export function printBigCodeIr(bc: Array<bigint>) {
  printLowLevelIr(bigCodeToIr(bc));
}
