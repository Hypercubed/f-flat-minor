#!/usr/bin/env deno

import { Engine } from "./engine.ts";
import { OpCodes, systemWords } from "./opcodes.ts";
import { encode } from "./vlq.ts";

const COMMENT_START = "/*";
const COMMENT_END = "*/";

export enum IROp {
  call = "call",
  push = "push",
}

export interface IrInstruction {
  value: bigint;
  op: IROp;
  comment?: string;
}

export class Compiler {
  static tokenize(s: string) {
    return s.split(/\s+/).filter(Boolean);
  }

  static compileToBigArray(ir: Array<IrInstruction>): bigint[] {
    return ir.flatMap((i) => {
      if (i.op === IROp.call && i.value === 0n) return []; // Remove NOPS
      if (i.op === IROp.call) {
        return [i.value];
      } else {
        return [0n, i.value];
      }
    });
  }

  static compileToBase64(ir: Array<IrInstruction>): string {
    const arr = ir.flatMap((i) => {
      if (i.op === IROp.call && i.value === 0n) return []; // Remove NO OPS
      const vv = i.value << 1n;
      return [i.op === IROp.push ? vv : (vv | 1n)];
    });

    return encode(arr);
  }

  private readonly engine = new Engine();
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
    let i = 0;
    const l = s.length;
    let ss = "";
    const ret: IrInstruction[] = [];
    while (i < l) {
      ss = s[i++];

      let maybeNumber: bigint | undefined;

      try {
        maybeNumber = BigInt(ss);
      } catch (_e) {
        maybeNumber = undefined;
      }

      if (maybeNumber !== undefined) {
        ret.push({ value: maybeNumber, op: IROp.push, comment: ss });
      } else if (ss.length > 1 && ss.startsWith(".")) {
        const [cmd] = ss.split(" ");
        switch (cmd) {
          case ".push":
            ret[ret.length - 1].op = IROp.push;
            break;
          case ".call":
            ret[ret.length - 1].op = IROp.call;
            break;
          case ".exit":
            Deno.exit();
            break;
          case ".symbols":
            this.symbols.forEach((value, key) => {
              console.log(key, value);
            });
            break;
        }
      } else if (ss[0] === "'") { // String
        convertEsc2Char(ss)
          .replace(/^'/, "") // TODO: use backtick?
          .replace(/'$/, "")
          .split("")
          .reverse()
          .forEach((c, i) => {
            push(c.charCodeAt(0), i === 0 ? ss : "");
          });
      } else if (ss.endsWith(":")) { // Definition
        if (ss.length > 1) {
          const name = ss.replace(/:$/, "");
          push(this.getSymbol(name), `&${name}`);
        }
        call(OpCodes.MARK, ':');
      } else if (ss === COMMENT_START) { // Comment
        const comment = ["/*"];
        while (i < s.length && ss !== COMMENT_END) {
          ss = s[i++];
          comment.push(ss);
        }
        call(0n, comment.join(" "));
      } else if (ss === '[') {
        push(this.nextCode(), ss);
        call(OpCodes.BRA, '[');
      } else if (ss[0] === "&" && ss.length > 1) { // Symbol
        push(this.getSymbol(ss.replace(/^&/, "")), ss);
      } else {
        call(this.getSymbol(ss), ss);
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
}

function convertEsc2Char(str: string): string {
  return str
    .replace(/\\0/g, "\0")
    .replace(/\\b/g, "\b")
    .replace(/\\t/g, "\t")
    .replace(/\\n/g, "\n")
    .replace(/\\v/g, "\v")
    .replace(/\\f/g, "\f")
    .replace(/\\r/g, "\r")
    .replace(/\\'/g, `'`)
    .replace(/\\"/g, '"')
    .replace(/\\s/g, " ")
    .replace(/\\\\/g, "\\");
}
