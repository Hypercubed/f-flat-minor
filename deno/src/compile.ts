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
  let i = 0;
  const l = s.length;
  let ss = "";
  const ret: IrInstruction[] = [];
  while (i < l) {
    ss = s[i++];

    const maybeNumber = parseInt(ss, 10);

    if (!isNaN(maybeNumber)) {
      push(maybeNumber, ss);
    } else if (ss.length > 1 && ss.startsWith(".")) { // macro?
      switch (ss) {
        case ".push":
          ret[ret.length - 1].op = IROp.push
          break;
        case ".call":
          ret[ret.length - 1].op = IROp.call
          break;
        case ".load": {
          const filename = s[i++];
          const code = Deno.readTextFileSync(filename);
          const ir = compileToIR(tokenize(code))
          ret.push(...ir);
          break;          
        }
      }
    } else if (ss[0] === "'") { // String
      convertEsc2Char(ss)
        .replace(/^'/, "") // TODO: use backtick?
        .replace(/'$/, '\0')
        .split("")
        .reverse()
        .forEach((c, i) => {
          push(c.charCodeAt(0), i === 0 ? ss : "");
        });
    } else if (ss.endsWith(":")) { // Definition
      if (ss.length > 1) {
        const name = ss.replace(/:$/, "");
        push(getSymbol(name), ss);
      }
      call(OpCodes.SDEF);
    } else if (ss === "[") { // Anon Definition
      push(nextCode(), ss);
      call(OpCodes.MARK);
    } else if (ss === COMMENT_START) { // Comment
      const comment = [];
      while (i < s.length) {
        ss = s[i++];
        if (ss === COMMENT_END) {
          break;
        }
        comment.push(ss);
      }
      call(0n, comment.join(" "));
    } else if (ss[0] === "&") { // Symbol
      const name = ss.replace(/^&/, "");
      push(getSymbol(name), ss);
    } else {
      call(getSymbol(ss), ss);
    }
  }
  return ret;

  function push(value: bigint | number, comment = "") {
    ret.push({ value: BigInt(value), op: IROp.push, comment });
  }

  function call(value: bigint | number, comment = "") {
    ret.push({ value: BigInt(value), op: IROp.call, comment });
  }
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

function convertEsc2Char(str: string): string {
  return str
    .replace(/\\0/g, '\0')
    .replace(/\\b/g, '\b')
    .replace(/\\t/g, '\t')
    .replace(/\\n/g, '\n')
    .replace(/\\v/g, '\v')
    .replace(/\\f/g, '\f')
    .replace(/\\r/g, '\r')
    .replace(/\\'/g, `'`)
    .replace(/\\"/g, '"')
    .replace(/\\s/g, ' ')
    .replace(/\\\\/g, '\\');
}
