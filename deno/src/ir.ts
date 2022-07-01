import { blue, green, red, cyan } from "https://deno.land/std@0.139.0/fmt/colors.ts";
import { OpCodes } from "./opcodes.ts";

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

const encoder = new TextEncoder()

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

function print(...args: string[]) {
  Deno.stdout.writeSync(encoder.encode(args.join(' ')));
}

function printCall(i: IrInstruction) {
  const n = i.meta?.name || `$_${i.value}:`;
  print(`${n} `);
  if (i.meta?.comment?.trim()) {
    print(`/* ${i.meta?.comment} */`, "\n");
  }
}

function printPush(i: IrInstruction) {
  const v = String(i.value);
  print(`${v} `);
  if (i.meta?.comment?.trim()) {
    print(`/* ${i.meta?.comment} */`, "\n");
  }
}

function printPointer(i: IrInstruction) {
  const n = i.meta?.name || `$_${i.value}`;
  print(`&${n} `);
  if (i.meta?.comment?.trim()) {
    print(`/* ${i.meta?.comment} */`, "\n");
  }
}

function defWord(i: IrInstruction) {
  const n = i.meta?.name || `$_${i.value}`;
  print(`${n}: `);
  if (i.meta?.comment?.trim()) {
    print(`/* ${i.meta?.comment} */`, "\n");
  }
}

export function disassembleIr(ir: Array<IrInstruction>) {
  for (let ip = 0; ip < ir.length; ip++) {
    const i = ir[ip];

    if (i.op === IROp.push && i.meta?.pointer) {
      if (ir[ip + 1].op === IROp.call && ir[ip + 1].value === BigInt(OpCodes.MARK)) {
        defWord(i);
        ip++;
      } else {
        printPointer(i);
      }
    } else if (i.op === IROp.push) {
      if (ir[ip + 1].op === IROp.call && ir[ip + 1].value === BigInt(OpCodes.BRA)) {
        continue;
      } else {
        printPush(i);
      }
    } else if (i.op === IROp.call) {
      printCall(i);
    }    
  }
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
