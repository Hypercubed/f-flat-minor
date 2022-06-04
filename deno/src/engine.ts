import { OpCodes } from "../src/opcodes.ts";
import { IrInstruction, IROp } from "./ir.ts";
import { SourceMap } from "./source-maps.ts";
import { decode } from "./vlq.ts";

const DEF = BigInt(OpCodes.DEF);
const KET = BigInt(OpCodes.KET);
const MARK = BigInt(OpCodes.MARK);
const BRA = BigInt(OpCodes.BRA);

export class Engine {
  static fromBase64(encoded: string): bigint[] {
    return decode(encoded)
      .flatMap((value) => {
        const op = value & 1n;
        const val = value >> 1n;
        if (op) {
          return [val];
        } else {
          return [0n, val];
        }
      });
  }

  private readonly stack: bigint[] = [];
  private readonly rStack: bigint[] = [];
  private readonly defs = new Map<bigint, (() => void | bigint) | bigint[]>();

  private symbols = new  Map<bigint,string>();

  private depth = 0;

  constructor() {
    this.setup();
  }

  getStack() {
    return this.stack.slice();
  }

  peek(): bigint {
    return this.stack[this.stack.length - 1] || 0n;
  }
  
  pop(): bigint {
    return this.stack.pop() || 0n;
  }

  push(n: bigint): void {
    this.stack.push(n);
  }

  clear(): void {
    this.stack.splice(0, this.stack.length);
  }

  defineSystem(fn: () => void | bigint, code: number) {
    this.defs.set(BigInt(code), fn);
  }

  callOp(code: bigint): void {
    const r = this.tcoCallOp(code);
    if (Array.isArray(r) && r.length > 0) {
      this.executeBigIntCode(r);
    }
  }

  private tcoCallOp(code: bigint): undefined | bigint[] {
    if (this.defs.has(code)) {
      const r = this.defs.get(code);
      if (typeof r === "function") {
        const rr = r();
        if (rr !== undefined) {
          return [rr];
        }
        return [];
      } else if (r) {
        return r;
      }
    }
    if (this.symbols?.has(code)) {
      throw new Error(`illegal call op ${code} ("${this.symbols.get(code)}")`)
    }
    throw new Error(`illegal call op ${code}`)
  }

  executeIr(ir: IrInstruction[]): bigint[] {
    let ip = 0;
    while (ip < ir.length) {
      const i = ir[ip++];

      if (i.op === IROp.call) {
        if (i.value === 0n) continue;  // no-op

        // Keep symbols
        if (i.name && !this.symbols.has(i.value)) {
          this.symbols.set(i.value, i.name);
        }

        if (i.value === DEF || i.value === KET) this.depth--;

        if (this.depth) {
          this.push(i.value);
        } else {
          this.callOp(i.value);
        }

        if (i.value === MARK || i.value === BRA) this.depth++;
      } else {
        if (this.depth) this.push(0n);
        this.push(i.value);
      }
    }
    return this.stack;
  }

  executeBigIntCode(bigCode: bigint[]): bigint[] {
    const queue = bigCode.slice();

    while (queue.length > 0) {
      const op = queue.shift() || 0n;

      if (op === DEF || op === KET) this.depth--;

      if (this.depth) this.push(op);

      if (op === 0n) {
        this.push(queue.shift() || 0n);
      } else if (!this.depth) {
        const q = this.tcoCallOp(op) || [];
        queue.unshift(...q);
      }

      if (op === MARK || op === BRA) this.depth++;
    }
    return this.stack;
  }

  print() {
    const s = this.stack.map(String).join(" ");
    console.log(`[ ${s} ]`);
  }

  addSourceMap(sourceMap: SourceMap) {
    Object.keys(sourceMap.symbols).forEach(value => {
      this.symbols.set(BigInt(value), sourceMap.symbols[value]);
    });
  }

  private setup() {
    this.defineSystem(() => {}, OpCodes.NOP);
  
    this.defineSystem(() => {
      return this.pop();
    }, OpCodes.CALL);
  
    this.defineSystem(() => {
      const m = this.rStack.pop() || 0n;
      const s: bigint[] = this.stack.splice(Number(m), this.stack.length) || [];
      const n = this.pop();
      if (n < 0x80n) {
        throw new Error(`cannot redefine system word ${n}`);
      }
      this.defs.set(n, s);
    }, OpCodes.DEF);

    this.defineSystem(() => {
      const m = this.rStack.pop() || 0n;
      const s: bigint[] = this.stack.splice(Number(m), this.stack.length) || [];
      const n = this.peek();
      this.defs.set(n, s);
    }, OpCodes.KET);

    this.defineSystem(() => {
      const m = this.stack.length;
      this.rStack.push(BigInt(m));
    }, OpCodes.BRA);
  
    this.defineSystem(() => {
      const m = this.stack.length;
      this.rStack.push(BigInt(m));
    }, OpCodes.MARK);
  
    this.defineSystem(() => this.clear(), OpCodes.CLR);

    this.defineSystem(() => {
      const n = this.pop();
      Deno.exit(Number(n));
    }, OpCodes.EXIT);

    this.defineSystem(() => {
      const max = this.pop();
      this.push(generateRandomBigInt(max));
    }, OpCodes.RND);
  
    this.defineSystem(() => this.print(), OpCodes.PRN);
  
    const encoder = new TextEncoder();
  
    this.defineSystem(() => {
      const data = encoder.encode(String.fromCharCode(Number(this.pop())));
      Deno.stdout.writeSync(data);
    }, OpCodes.PUTC);
  
    this.defineSystem(() => {
      const input = new Uint8Array(1);
      Deno.setRaw(0, true);
      Deno.stdin.readSync(input);
      Deno.setRaw(0, false);
      this.push(BigInt(input[0]));
    }, OpCodes.GETC);

    this.defineSystem(() => {
      const data = encoder.encode(String(this.pop()));
      Deno.stdout.writeSync(data);
    }, OpCodes.PRNN);
  
    this.defineSystem(() => {
      this.pop();
    }, OpCodes.DROP);
  
    this.defineSystem(() => {
      const a = this.pop();
      const b = this.pop();
      this.push(a);
      this.push(b);
    }, OpCodes.SWAP);
  
    this.defineSystem(() => {
      this.push(this.peek());
    }, OpCodes.DUP);
  
    this.defineSystem(() => {
      const a = this.pop();
      const b = this.pop();
      this.push(b + a);
    }, OpCodes.ADD);
  
    this.defineSystem(() => {
      const a = this.pop();
      const b = this.pop();
      this.push(b - a);
    }, OpCodes.SUB);
  
    this.defineSystem(() => {
      const a = this.pop();
      const b = this.pop();
      this.push(b * a);
    }, OpCodes.MUL);
  
    this.defineSystem(() => {
      const a = this.pop();
      const b = this.pop();
      this.push(b / a);
    }, OpCodes.DIV);
  
    this.defineSystem(() => {
      const a = this.pop();
      const b = this.pop();
      this.push(b % a);
    }, OpCodes.MOD);

    this.defineSystem(() => {
      const a = this.pop();
      const b = this.pop();
      this.push(b & a);
    }, OpCodes.AND);

    this.defineSystem(() => {
      const a = this.pop();
      const b = this.pop();
      this.push(b ** a);
    }, OpCodes.POW);

    this.defineSystem(() => {
      // NOTE: Pop order requires opposite operation
      this.push(this.pop() > this.pop() ? 1n : 0n);
    }, OpCodes.LT);
  
    this.defineSystem(() => {
      this.push(this.pop() === this.pop() ? 1n : 0n);
    }, OpCodes.EQ);

    this.defineSystem(() => {
      // NOTE: Pop order requires opposite operation
      this.push(this.pop() < this.pop() ? 1n : 0n);
    }, OpCodes.GT);
  
    this.defineSystem(() => {
      const t = this.pop();
      if (this.pop() !== 0n) {
        return t;
      }
    }, OpCodes.IF);
  
    this.defineSystem(() => {
      this.rStack.push(this.pop());
    }, OpCodes.PUSHR);
  
    this.defineSystem(() => {
      const a = this.rStack.pop() || 0n;
      this.push(a);
    }, OpCodes.PULLR);
  
    this.defineSystem(() => {
      this.push(BigInt(this.stack.length));
    }, OpCodes.DEPTH);

    this.defineSystem(() => {
      const len = this.stack.length;
      this.rStack.push(...this.stack.splice(0, len));
      this.rStack.push(BigInt(len));
    }, OpCodes.STASH);

    this.defineSystem(() => {
      const len = Number(this.rStack.pop());
      this.stack.unshift(...this.rStack.splice(-len));
    }, OpCodes.FETCH);

    this.defineSystem(() => {
      const a = this.pop();
      const b = this.pop();
      this.push(b | a);
    }, OpCodes.OR);

    this.defineSystem(() => {
      const a = this.pop();
      this.push(~a);
    }, OpCodes.NOT);
  }
}

/** Generates BigInts between 0 (inclusive) and high (exclusive) */
function generateRandomBigInt(highBigInt: bigint) {
  const difference = highBigInt;
  const differenceLength = difference.toString().length;
  let multiplier = '';
  while (multiplier.length < differenceLength) {
    multiplier += Math.random()
      .toString()
      .split('.')[1];
  }
  multiplier = multiplier.slice(0, differenceLength);
  const divisor = '1' + '0'.repeat(differenceLength);

  return (difference * BigInt(multiplier)) / BigInt(divisor);
}