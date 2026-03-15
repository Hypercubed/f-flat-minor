import { OpCodes, systemWords } from "./opcodes.ts";

const blue = (s: string) => s;
const green = (s: string) => s;
const red = (s: string) => s;
const cyan = (s: string) => s;

interface Meta {
  comment: string;
  name: string;
  inline: boolean;
  pointer: boolean;
  unsafe: boolean;
  filename: string;
  line: number;
  uid: number;
}

export interface IrInstruction {
  value: bigint;
  op: IROp;
  meta?: Partial<Meta>;
}

export const IROp = {
  call: "call",
  push: "push",
} as const;

export type IROp = (typeof IROp)[keyof typeof IROp];

const OP_WIDTH = 6;
const VALUE_WIDTH = 10;

export type IrWriter = (text: string) => void;

let writer: IrWriter = (text: string) => {
  const maybeProcess = (globalThis as { process?: { stdout?: { write?: (data: string) => void } } }).process;
  if (maybeProcess?.stdout?.write) {
    maybeProcess.stdout.write(text);
    return;
  }
  console.log(text);
};

export function setIrWriter(nextWriter: IrWriter) {
  writer = nextWriter;
}

function getMetaComment(i: IrInstruction) {
  let m = '';
  if (i.meta?.inline) m += ".inline "
  if (i.meta?.pointer) m += ".pointer ";
  if (i.meta?.unsafe) m += ".unsafe ";
  return m.trim();
}

function formatOp(i: IrInstruction) {
  return i.op.toUpperCase().padEnd(OP_WIDTH, " ");
}

function formatValue(i: IrInstruction) {
  return ("" + i.value).padEnd(VALUE_WIDTH, " ");
}

function formatComment(i: IrInstruction) {
  return i.meta?.comment?.trim() ? `; ${i.meta?.comment}` : "";
}

export function printHighLevelIr(ir: Array<IrInstruction>) {
  ir.forEach((i) => {
    const c = formatComment(i);
    const n = getName(i)?.toUpperCase().padEnd(VALUE_WIDTH, " ") || "";
    const v = formatValue(i);
    const o = formatOp(i);
    const m = getMetaComment(i);

    if (i.op === IROp.call && n) {
      console.log(blue(o), green(n), red(m), c);
      return;
    } else if (i.op === IROp.push && n && i.meta?.pointer) {
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
  writer(args.join(" "));
}

function findSystemWord(v: number): string {
  for (const k in systemWords) {
    if (systemWords[k] === v) {
      return k;
    }
  }
  return "";
}

function getName(i: IrInstruction) {
  if (i.op === IROp.call || (i.op === IROp.push && i.meta?.pointer)) {
    return i.meta?.name || findSystemWord(Number(i.value)) || "";
  }
}

export function disassembleIr(ir: Array<IrInstruction>) {
  for (let ip = 0; ip < ir.length; ip++) {
    const i = ir[ip];

    if (i.op === IROp.push && i.meta?.pointer) {
      const n = i.meta?.name || `$_${i.value}`;
      print(`[${n}] `);
    } else if (i.op === IROp.push) {
      const v = String(i.value);
      print(`${v} `);
    } else if (i.op === IROp.call) {
      if (i.value !== 0n) {
        const n = getName(i) || `$_${i.value}`;
        print(`${n} `);
      }
    }    
  }
}

export function printLowLevelIr(ir: Array<IrInstruction>) {
  ir.forEach((i) => {
    const o = formatOp(i);
    const n = getName(i)?.toUpperCase() || "";
    const v = formatValue(i);
    const c = [n, i.meta?.comment || ""].join(" ").trim();
    console.log(blue(o), cyan(v), c ? `; ${c}` : "");
  });
}

export function printDecimalCode(ir: Array<IrInstruction>) {
  const bc = ir.map(i => {
    const o = i.op === IROp.call ? OpCodes.CALL : OpCodes.NOP;
    const v = i.value;
 
    return `${v} ${o}`;
  });

  console.log(bc.join(' '));
}

export function bigCodeToIr(bc: Array<bigint>): Array<IrInstruction> {
  const ir: Array<IrInstruction> = [];
  let ip = 0;
  while (ip < bc.length) {
    const tag = bc[ip++] ?? 0n;
    const value = bc[ip++] ?? 0n;
    if (tag === 0n) {
      ir.push({ op: IROp.push, value });
    } else {
      ir.push({ op: IROp.call, value });
    }
  }
  return ir;
}

export function printBigCodeIr(bc: Array<bigint>) {
  printLowLevelIr(bigCodeToIr(bc));
}
