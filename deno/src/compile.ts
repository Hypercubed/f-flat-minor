#!/usr/bin/env deno

import { encodeBigIntArray } from "./leb128.ts";
import { systemWords } from "./opcodes.ts";

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

export class Compiler {
  static tokenize(s: string) {
    return s.split(/\s+/).filter(Boolean);
  }

  static compileToByteArray(ir: Array<IrInstruction>): Uint8Array {
    const arr = ir.flatMap((i) => {
      if (i.op === IROp.call && i.value === 0n) return []; // Remove NOPS
      const vv = i.value << 1n;
      return [i.op === IROp.push ? vv : (vv | 1n)];
    });

    return Uint8Array.from(encodeBigIntArray(arr));
  }

  private readonly symbols = new Map<string, bigint>();
  private _nextCode = 0x80;

  constructor() {
    let name: keyof typeof systemWords;
    for (name in systemWords) {
      this.symbols.set(name, BigInt(systemWords[name]));
    }
  }

  nextCode(): bigint {
    return BigInt(this._nextCode++);
  }

  getSymbol(name: string): bigint {
    name = name.toLowerCase();
    let code = this.symbols.get(name);
    if (code === undefined) {
      code = this.nextCode();
      this.symbols.set(name, code);
    }
    return code;
  }

  compileToIR(s: string[]): IrInstruction[] {
    let defMode = false;
    let i = 0;
    const l = s.length;
    let ss = "";
    const ret: IrInstruction[] = [];
    while (i < l) {
      ss = s[i++];

      if (ss === ";") {
        defMode = false;
      }

      if (defMode) {
        const ir = this.compileToIR([ss]);
        const bc = ir.flatMap(this.toBigIntIR).map(String);
        const c = this.compileToIR(bc);
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
        const ir = this.compileToIR(chars);
        ir.forEach((cc) => cc.comment = "");
        ir[0].comment = ss;
        ret.push(...ir);
      } else if (ss.endsWith(":")) { // Definition
        if (ss.length > 1) {
          const name = ss.replace(/:$/, "");
          ret.push({ value: this.getSymbol(name), op: IROp.push, comment: ss });        
        }
        ret.push({ value: this.getSymbol(':'), op: IROp.call, comment: ss });
        defMode = true;
      } else if (ss === COMMENT_START) { // Comment
        const comment = ["/*"];
        while (i < s.length && ss !== COMMENT_END) {
          ss = s[i++];
          comment.push(ss);
        }
        ret.push({ value: 0n, op: IROp.call, comment: comment.join(" ") });
      } else if (ss[0] === "&") { // Symbol
        const name = ss.replace(/^&/, "");
        const code = this.getSymbol(name);
        ret.push({ value: code, op: IROp.push, comment: ss });
      } else {
        const value = this.getSymbol(ss);
        ret.push({ value, op: IROp.call, comment: ss });
      }
    }
    return ret;
  }

  private toBigIntIR(i: IrInstruction) {
    if (i.op !== IROp.push) {
      if (i.op === IROp.call && i.value === 0n) return []; // Remove NOPS
      return [i.value];
    }
    return [0n, i.value];
  }
}
