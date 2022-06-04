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
  private readonly queue: bigint[] = [];
  private readonly defs = new Map<bigint, (() => void) | bigint[]>();

  private symbols = new  Map<bigint,string>();

  private depth = 0;

  constructor() {
    this.setup();
  }

  getStack() {
    return this.stack.slice();
  }

  private peek(): bigint {
    return this.stack[this.stack.length - 1] || 0n;
  }
  
  private pop(): bigint {
    return this.stack.pop() || 0n;
  }

  private push(n: bigint): void {
    this.stack.push(n);
  }

  clear(): void {
    this.stack.splice(0, this.stack.length);
  }

  private defineSystem(fn: () => void, code: number) {
    this.defs.set(BigInt(code), fn);
  }

  private callOp(code: bigint): void {
    if (this.defs.has(code)) {
      const r = this.defs.get(code);
      if (typeof r === "function") {
        return r();
      } else if (r) {
        this.queue.unshift(...r);
        return;
      }
    }
    if (this.symbols?.has(code)) {
      throw new Error(`illegal call op ${code} ("${this.symbols.get(code)}")`)
    }
    throw new Error(`illegal call op ${code}`)
  }

  loadBigIntCode(bigCode: bigint[]) {
    this.queue.push(...bigCode);
  }

  loadIR(ir: IrInstruction[]) {
    let ip = 0;
    while (ip < ir.length) {
      const i = ir[ip++];

      if (i.op === IROp.call) {
        if (i.value === 0n) continue;  // no-op

        // Keep symbols
        if (i.name && !this.symbols.has(i.value)) {
          this.symbols.set(i.value, i.name);
        }

        this.queue.push(i.value);
      } else {
        this.queue.push(0n);
        this.queue.push(i.value);
      }
    }
    return this.stack;
  }

  run() {
    const queue = this.queue;

    while (queue.length > 0) {
      const op = queue.shift() || 0n;

      if (op === DEF || op === KET) this.depth--;

      if (this.depth) this.push(op);

      if (op === 0n) {
        this.push(queue.shift() || 0n);
      } else if (!this.depth) {
        this.callOp(op)
      }

      if (op === MARK || op === BRA) this.depth++;
    }
    return this.stack;
  }

  print() {
    const s = this.stack.map(String).join(" ");
    console.log(`[ ${s} ]`);
  }

  loadSourceMap(sourceMap: SourceMap) {
    Object.keys(sourceMap.symbols).forEach(value => {
      this.symbols.set(BigInt(value), sourceMap.symbols[value]);
    });
  }

  private setup() {
    const encoder = new TextEncoder();

    this.defineSystem(() => {}, OpCodes.NOP);
  
    this.defineSystem(() => {
      const x = this.pop();
      this.queue.unshift(x)
    }, OpCodes.CALL);
  
    this.defineSystem(() => {
      const m = this.queue.pop() || 0n;
      const s: bigint[] = this.stack.splice(Number(m), this.stack.length) || [];
      const n = this.pop();
      if (n < 0x80n) {
        throw new Error(`cannot redefine system word ${n}`);
      }
      this.defs.set(n, s);
    }, OpCodes.DEF);

    this.defineSystem(() => {
      const m = this.queue.pop() || 0n;
      const s: bigint[] = this.stack.splice(Number(m), this.stack.length) || [];
      const n = this.peek();
      this.defs.set(n, s);
    }, OpCodes.KET);

    this.defineSystem(() => {
      const m = this.stack.length;
      this.queue.push(BigInt(m));
    }, OpCodes.BRA);
  
    this.defineSystem(() => {
      const m = this.stack.length;
      this.queue.push(BigInt(m));
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
  
    this.defineSystem(() => {
      this.print()
    }, OpCodes.PRN);
  
  
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
        this.queue.unshift(t)
      }
    }, OpCodes.IF);
  
    this.defineSystem(() => {
      this.queue.push(this.pop());
    }, OpCodes.PUSHR);
  
    this.defineSystem(() => {
      const a = this.queue.pop() || 0n;
      this.push(a);
    }, OpCodes.PULLR);
  
    this.defineSystem(() => {
      this.push(BigInt(this.stack.length));
    }, OpCodes.DEPTH);

    this.defineSystem(() => {
      const len = this.stack.length;
      this.queue.push(...this.stack.splice(0, len));
      this.queue.push(BigInt(len));
    }, OpCodes.STASH);

    this.defineSystem(() => {
      const len = Number(this.queue.pop());
      this.stack.unshift(...this.queue.splice(-len));
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
  const diff = highBigInt;
  const len = diff.toString().length;
  let m = '';
  while (m.length < len) {
    m += Math.random()
      .toString()
      .split('.')[1];
  }
  m = m.slice(0, len);
  const divisor = '1' + '0'.repeat(len);

  return (diff * BigInt(m)) / BigInt(divisor);
}