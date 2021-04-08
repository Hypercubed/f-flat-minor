import { decodeByteArray } from "../src/leb128.ts";
import { OpCodes } from "../src/opcodes.ts";

enum IROp {
  call = "call",
  push = "push",
}

export const stack: bigint[] = [];

const defs = new Map<bigint, (() => void) | bigint[]>();

function peek(): bigint {
  return stack[stack.length - 1] || 0n;
}

function pop(): bigint {
  return stack.pop() || 0n;
}

function defineSystem(fn: () => void, code: number) {
  defs.set(BigInt(code), fn);
}

function callOp(code: bigint): void {
  if (defs.has(code)) {
    const r = defs.get(code);
    if (typeof r === "function") {
      r();
      return;
    } else if (r) {
      executeBigIntCode(r);
      return;
    }
  }
}

//

export function fromByteArray(byteArray: Uint8Array): bigint[] {
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

export function executeBigIntCode(bc: bigint[]): bigint[] {
  let ip = 0;
  while (ip < bc.length) {
    const op = bc[ip++];
    if (op === 0n) {
      stack.push(bc[ip++]);
    } else {
      callOp(op);
    }
  }
  return stack;
}

export function clear() {
  stack.splice(0, stack.length);
}

export function print() {
  const s = stack.map(String).join(" ");
  console.log(`[${s}]`);
}

// Definitions

export function setup() {
  defineSystem(() => {}, OpCodes.NOP);

  defineSystem(() => {
    callOp(pop());
  }, OpCodes.CALL);

  defineSystem(() => {
    const s: bigint[] = stack.splice(0, stack.length) || [];
    const n = s.shift() || 0n;
    defs.set(n, s);
  }, OpCodes.DEF);

  defineSystem(clear, OpCodes.CLR);

  defineSystem(print, OpCodes.PRN);

  const encoder = new TextEncoder();

  defineSystem(() => {
    const data = encoder.encode(String.fromCharCode(Number(pop())));
    Deno.stdout.writeSync(data);
  }, OpCodes.PUTC);

  defineSystem(() => {
    const input = new Uint8Array(1);
    Deno.stdin.readSync(input);
    stack.push(BigInt(input[0]));
  }, OpCodes.GETC);

  defineSystem(() => stack.pop(), OpCodes.DROP);

  defineSystem(() => {
    const a = pop();
    const b = pop();
    stack.push(a);
    stack.push(b);
  }, OpCodes.SWAP);

  defineSystem(() => {
    stack.push(peek());
  }, OpCodes.DUP);

  defineSystem(() => {
    const a = pop();
    const b = pop();
    stack.push(b + a);
  }, OpCodes.ADD);

  defineSystem(() => {
    const a = pop();
    const b = pop();
    stack.push(b - a);
  }, OpCodes.SUB);

  defineSystem(() => {
    const a = pop();
    const b = pop();
    stack.push(b * a);
  }, OpCodes.MUL);

  defineSystem(() => {
    const a = pop();
    const b = pop();
    stack.push(b / a);
  }, OpCodes.DIV);

  defineSystem(() => {
    const a = pop();
    const b = pop();
    stack.push(b % a);
  }, OpCodes.MOD);

  defineSystem(() => {
    stack.push(pop() === pop() ? 1n : 0n);
  }, OpCodes.EQ);

  defineSystem(() => {
    const t = pop();
    if (pop() !== 0n) {
      callOp(t);
    }
  }, OpCodes.IF);

  defineSystem(() => {
    const a = pop();
    const b = pop();
    callOp(a);
    stack.push(b);
  }, OpCodes.DIP);
}
