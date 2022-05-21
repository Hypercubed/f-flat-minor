import { decodeByteArray } from "../src/leb128.ts";
import { OpCodes } from "../src/opcodes.ts";

export class Engine {
  static fromByteArray(byteArray: Uint8Array): bigint[] {
    return decodeByteArray(Array.from(byteArray))
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
  private readonly defs = new Map<bigint, (() => void) | bigint[]>();

  constructor() {
    this.setup();
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

  defineSystem(fn: () => void, code: number) {
    this.defs.set(BigInt(code), fn);
  }

  callOp(code: bigint): void {
    if (this.defs.has(code)) {
      const r = this.defs.get(code);
      if (typeof r === "function") {
        r();
        return;
      } else if (r) {
        this.executeBigIntCode(r);
        return;
      }
    }
    throw new Error(`illegal call op ${code}`)
  }

  executeBigIntCode(bc: bigint[]): bigint[] {
    let ip = 0;
    while (ip < bc.length) {
      const op = bc[ip++];
      if (op === 0n) {
        this.push(bc[ip++]);
      } else {
        this.callOp(op);
      }
    }
    return this.stack;
  }

  print() {
    const s = this.stack.map(String).join(" ");
    console.log(`[${s}]`);
  }

  private setup() {
    this.defineSystem(() => {}, OpCodes.NOP);
  
    this.defineSystem(() => {
      this.callOp(this.pop());
    }, OpCodes.CALL);
  
    this.defineSystem(() => {
      const m = this.rStack.pop() || 0n;
      const s: bigint[] = this.stack.splice(Number(m), this.stack.length) || [];
      const n = this.pop();
      this.defs.set(n, s);
    }, OpCodes.DEF);
  
    this.defineSystem(() => {
      const m = this.stack.length;
      this.rStack.push(BigInt(m));
    }, OpCodes.MARK);
  
    this.defineSystem(() => this.clear(), OpCodes.CLR);
  
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
  
    this.defineSystem(() => this.pop(), OpCodes.DROP);
  
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
      this.push(this.pop() === this.pop() ? 1n : 0n);
    }, OpCodes.EQ);
  
    this.defineSystem(() => {
      const t = this.pop();
      if (this.pop() !== 0n) {
        this.callOp(t);
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
  }
}