#!/usr/bin/env deno

import { encodeBigIntArray } from "./leb128.ts";
import { OpCodes, systemWords } from "./opcodes.ts";

const COMMENT_START = "/*";
const COMMENT_END = "*/";

enum IROp {
  call = "call",
  push = "push",
}

export interface IrInstruction {
  value: bigint;
  op: IROp;
  comment: string;
}

export const symbols = new Map<string, bigint>();

// interpretor
let _nextCode = 0x80;

function nextCode(): bigint {
  return BigInt(_nextCode++);
}

function getSymbol(name: string): bigint {
  name = name.toLowerCase();
  let code = symbols.get(name);
  if (code === undefined) {
    code = nextCode();
    symbols.set(name, code);
  }
  return code;
}

//

export function compileToIR(s: string[]): IrInstruction[] {
  let compileMode = false;
  let i = 0;
  const l = s.length;
  let ss = "";
  const ret: IrInstruction[] = [];
  while (i < l) {
    ss = s[i++];

    if (ss === ";") {
      compileMode = false;
    }

    if (compileMode) {
      const ir = compileToIR([ss]);
      const bc = ir.flatMap(toBigIntIR).map(String);
      const c = compileToIR(bc);
      c.forEach((cc) => cc.comment = "");
      c[0].comment = ss;
      ret.push(...c);
      continue;
    }

    const maybeNumber = parseInt(ss, 10);
    const isNumber = !isNaN(maybeNumber);

    if (isNumber) {
      ret.push({ value: BigInt(maybeNumber), op: IROp.push, comment: ss });
    } else if (ss[0] === "'") { // String
      const chars = ss.replace(/^'/, "")  // TODO: use backtick?
        .split("")
        .map((c) => String(c.charCodeAt(0)))
        .reverse();
      const ir = compileToIR(chars);
      ir.forEach((cc) => cc.comment = "");
      ir[0].comment = ss;
      ret.push(...ir);
    } else if (ss.endsWith(":")) { // Definition
      if (ss.length > 1) {
        const name = ss.replace(/:$/, "");
        ret.push({ value: getSymbol(name), op: IROp.push, comment: ss });        
      }
      ret.push({ value: getSymbol(':'), op: IROp.call, comment: ss });
      compileMode = true;
    } else if (ss === COMMENT_START) { // Comment
      const comment = ["/*"];
      while (i < s.length && ss !== COMMENT_END) {
        ss = s[i++];
        comment.push(ss);
      }
      ret.push({ value: 0n, op: IROp.call, comment: comment.join(" ") });
    } else if (ss[0] === "&") { // Symbol
      const name = ss.replace(/^&/, "");
      const code = getSymbol(name);
      ret.push({ value: code, op: IROp.push, comment: ss });
    } else {
      const value = getSymbol(ss);
      ret.push({ value, op: IROp.call, comment: ss });
    }
  }
  return ret;
}

function toBigIntIR(i: IrInstruction) {
  if (i.op !== IROp.push) {
    if (i.op === IROp.call && i.value === 0n) return []; // Remove NOPS
    return [i.value];
  }
  return [0n, i.value];
}

export function compileToByteArray(ir: Array<IrInstruction>): Uint8Array {
  const arr = ir.flatMap((i) => {
    if (i.op === IROp.call && i.value === 0n) return []; // Remove NOPS
    const vv = i.value << 1n;
    return [i.op === IROp.push ? vv : (vv | 1n)];
  });

  return Uint8Array.from(encodeBigIntArray(arr));
}

export function tokenize(s: string) {
  return s.split(/\s+/).filter(Boolean);
}

// Definitions

export function setup() {
  let name: keyof typeof systemWords;
  for (name in systemWords) {
    symbols.set(name, BigInt(systemWords[name]));
  }
}
