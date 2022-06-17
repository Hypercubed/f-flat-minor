#!/usr/bin/env deno

import { IrInstruction, IROp } from "./ir.ts";
import { OpCodes, systemWords } from "./opcodes.ts";
import { encode } from "./vlq.ts";

const COMMENT_START = "/*";
const COMMENT_END = "*/";

export class Compiler {
  static tokenize(s: string) {
    return s.split(/\s+/).filter(Boolean);
  }

  /**
   * Takes an array of IR instructions and returns a base64 encoded string
   * @param ir - Array<IrInstruction>
   * @returns A base64 encoded string of the IR instructions.
   */
  static compileToBase64(ir: Array<IrInstruction>): string {
    const arr = ir.flatMap((i) => {
      if (i.op === IROp.call && i.value === 0n) return []; // Remove NO OPS
      const vv = i.value << 1n;
      return [i.op === IROp.push ? vv : (vv | 1n)];
    });

    return encode(arr);
  }

  private readonly symbols = new Map<string, bigint>();
  private _nextCode = -1;

  constructor() {
    let name: keyof typeof systemWords;

    for (name in systemWords) {
      this.symbols.set(name, BigInt(systemWords[name]));
    }
  }

  private nextCode(): bigint {
    return BigInt(this._nextCode--);
  }

  private getSymbol(name: string): bigint {
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
          case ".inline":
            ret[ret.length - 1].meta ||= {};
            ret[ret.length - 1].meta!.inline = true;
            break;
          case ".pointer":
            ret[ret.length - 1].meta ||= {};
            ret[ret.length - 1].meta!.pointer = true;
            break;
          case ".exit":
            Deno.exit();
            break;
          case ".symbols":
            this.symbols.forEach((value, key) => {
              console.log(key, value);
            });
            break;
          case ".words": {
            const words = Array.from(this.symbols, ([word]) => word).join(" ");
            console.log(words);
            break;            
          }
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
        call(OpCodes.MARK, ":");
      } else if (ss === COMMENT_START) { // Comment
        const comment = ["/*"];
        while (i < s.length && ss !== COMMENT_END) {
          ss = s[i++];
          comment.push(ss);
        }
        call(0n, comment.join(" "));
      } else if (ss === "[") {
        const code = this.nextCode();
        push(code, `$_${code}`);
        call(OpCodes.BRA, ss);
      } else if (ss[0] === "&" && ss.length > 1) { // Symbol
        push(this.getSymbol(ss.replace(/^&/, "")), ss);
        ret[ret.length - 1].meta ||= {};
        ret[ret.length - 1].meta!.pointer = true;
      } else {
        call(this.getSymbol(ss), ss);
      }
    }
    return ret;

    function push(value: bigint | number, comment = "") {
      ret.push({ value: BigInt(value), op: IROp.push, comment });
    }

    function call(value: bigint | number, name = "") {
      ret.push({ value: BigInt(value), op: IROp.call, comment: name, name });
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
