#!/usr/bin/env deno
import { blue, green, cyan } from "https://deno.land/std@0.139.0/fmt/colors.ts";

import { IrInstruction, IROp } from "./ir.ts";
import { OpCodes, systemWords } from "./opcodes.ts";
import { unescapeString } from "./strings.ts";
import { encode } from "./vlq.ts";

const COMMENT_START = "/*";
const COMMENT_END = "*/";

function toNumber(str: string) {
  try {
    str = str.replaceAll('_', '');
    if (str.includes('e') || str.includes('E')) {
      return BigInt(+str);
    }
    return BigInt(str);
  } catch (_e) {
    return undefined;
  }
}

export class Compiler {
  static tokenize(s: string) {
    return s.split(/\s+/).filter(Boolean).map(x => {
      const n = toNumber(x);
      if (n !== undefined) {
        return n;
      }
      return x;
    });
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

  compileToIR(s: Array<string | bigint>, filename = ""): IrInstruction[] {
    let i = 0;
    const l = s.length;
    let ss: string | bigint = "";
    const ret: IrInstruction[] = [];
    while (i < l) {
      ss = s[i++];

      if (typeof ss === "bigint") {
        push(ss);
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
          case ".unsafe":
            ret[ret.length - 1].meta ||= {};
            ret[ret.length - 1].meta!.unsafe = true;
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
      } else if (ss[0] === "'" && ss.length > 1) { // String
        unescapeString(ss)
          .replace(/^'/, "") // TODO: use backtick?
          .replace(/'$/, "")
          .split("")
          .reverse()
          .forEach((c, i) => {
            push(c.charCodeAt(0), i === 0 ? { comment: ss } : {});
          });
      } else if (ss.endsWith(":") && ss.length > 1) { // Definition
        if (ss.length > 1) {
          const name = ss.replace(/:$/, "");
          push(this.getSymbol(name), { name: `${name}`, pointer: true });
        }
        call(OpCodes.MARK, { name: ":" });
      } else if (ss === COMMENT_START) { // Comment
        const comment = [];
        while (i < s.length) {
          ss = s[i++];
          if (ss === COMMENT_END) {
            break;
          }
          comment.push(ss);
        }
        call(0n, { comment: comment.join(" ") });
      } else if (ss.startsWith("[") && ss.endsWith("]")) { // Symbol
        const name = ss.replace(/^\[/, "").replace(/\]$/, "");
        push(this.getSymbol(name), { name, pointer: true });
      } else {
        call(this.getSymbol(ss), { name: ss });
      }
    }
    return ret;

    function push(value: bigint | number, meta = {}) {
      ret.push({ value: BigInt(value), op: IROp.push, meta: { ...meta, filename } });
    }

    function call(value: bigint | number, meta = {}) {
      ret.push({ value: BigInt(value), op: IROp.call, meta:{ ...meta, filename } });
    }
  }

  validate(ir: IrInstruction[]): string[] {
    const _ir = ir.slice();

    const issues: string[] = [];

    let ip = 0;
    while (ip < _ir.length) {
      const _i = _ir[ip];

      if (_i.op === IROp.call && _i.value === BigInt(OpCodes.DEF)) {
        let j = 0;
        for (j = ip; j > 0; j--) {
          if (_ir[j].op === IROp.call && _ir[j].value === BigInt(OpCodes.MARK)) {
            break;
          }
        }
        const def = _ir.splice(j-1, ip-j+2);
        if (!def.at(-1)?.meta?.unsafe) {
          issues.push(...this.validateDef(def));
        }
        ip = j-1;
      }

      ip++;
    }

    issues.push(...this.validateDef(_ir, 'main'))

    return issues;
  }

  private validateDef(ir: IrInstruction[], name?: string): string[] {
    const issues: string[] = [];
    let ip = 0;

    let def = 0;
    let braket = 0;
    let q = 0;

    if (!ir[0]) return [];

    name = green(name || ir[0].meta?.name?.replace(/^&/, '') || "main");
    const filename = blue(ir[0].meta?.filename! || "-");

    while (ip < ir.length) {
      const _i = ir[ip];

      if (_i.op === IROp.call) {
        if (_i.op === IROp.call && _i.value === BigInt(OpCodes.MARK)) def++;
        if (_i.op === IROp.call && _i.value === BigInt(OpCodes.DEF)) def--;

        if (_i.op === IROp.call && _i.value === BigInt(OpCodes.BRA)) braket++;
        if (_i.op === IROp.call && _i.value === BigInt(OpCodes.KET)) braket--;

        if (_i.op === IROp.call && _i.value === BigInt(OpCodes.PUSHR)) q++;
        if (_i.op === IROp.call && _i.value === BigInt(OpCodes.PULLR)) q--;

        // TODO: stash/fetch

        if (braket < 0) issues.push(`${filename}: Bracket ( ${cyan('[ ]')} ) mismatch in ${name}`);
        if (q < 0) issues.push(`${filename}: Queue push ( ${cyan('q< q>')} ) mismatch in ${name}`);
        if (def < 0) issues.push(`${filename}: Definition ( ${cyan(': ;')} ) mismatch in ${name}`);
      }

      ip++;
    }

    if (braket !== 0) issues.push(`${filename}: Unbalanced brackets ( ${cyan('[ ]')} ) in ${name}`);
    if (q !== 0) issues.push(`${filename}: Unbalanced queue push ( ${cyan('q< q>')} ) in ${name}`);
    if (def !== 0) issues.push(`${filename}: Unbalanced definition ( ${cyan(': ;')} ) in ${name}`);

    return issues;
  }
}


