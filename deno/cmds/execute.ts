import { dumpByteArray } from '../src/dump.ts';
import { decodeByteArray } from '../src/leb128.ts';
import { OpCodes } from '../src/opcodes.ts';

enum IROp {
  call = 'call',
  push = 'push'
}

interface IrInstruction {
  value: bigint;
  op: IROp;
  comment: string;
}

const stack: bigint[] = [];

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
    if (typeof r === 'function') {
      r();
      return;
    } else if (r) {
      return executeBigIntCode(r);
    }
  }
}

// 

function fromByteArray(byteArray: Uint8Array): bigint[] {
  return decodeByteArray(Array.from(byteArray))
    .flatMap(value => {
      const op = value & 1n;
      const val = value >> 1n;
      if (op) {
        return [val];
      } else {
        return [0n, val];
      }
    });
}

function executeBigIntCode(bc: bigint[]) {
  let ip = 0;
  while (ip < bc.length) {
    const op = bc[ip++];
    if (op === 0n) {
      stack.push(bc[ip++]);
    } else {
      callOp(op);
    }
  }
}

// Definitions

function setup() {
  defineSystem(() => {}, OpCodes.NOP);

  defineSystem(() => {
    callOp(pop());
  }, OpCodes.CALL);

  defineSystem(() => {
    const s: bigint[] = stack.splice(0, stack.length) || [];
    const n = s.shift() || 0n;
    defs.set(n, s);
  }, OpCodes.DEF);

  defineSystem(() => {
    stack.splice(0, stack.length);
  }, OpCodes.CLS);

  defineSystem(() => {
    console.log(`[${stack}]`);
  }, OpCodes.PRN);

  const encoder = new TextEncoder();

  defineSystem(() => {
    const data = encoder.encode(String.fromCharCode(Number(pop())));
    Deno.stdout.writeSync(data);
  }, OpCodes.PUTC);

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
    stack[stack.length - 1] += a;
  }, OpCodes.ADD);

  defineSystem(() => {
    const a = pop();
    stack[stack.length - 1] -= a;
  }, OpCodes.SUB);

  defineSystem(() => {
    const a = pop();
    stack[stack.length - 1] *= a;
  }, OpCodes.MUL);

  defineSystem(() => {
    const a = pop();
    stack[stack.length - 1] /= a;
  }, OpCodes.DIV);

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
    const a = pop()
    const b = pop()
    callOp(a)
    stack.push(b);
  }, OpCodes.DIP);
}

// Run
setup();

const buf = new Uint8Array(1024);
const n = <number>await Deno.stdin.read(buf);
const byteCode = buf.subarray(0, n);

if (Deno.args.includes('--dump')) {
  dumpByteArray(byteCode);
  Deno.exit();
}

const bigCode = fromByteArray(byteCode);

executeBigIntCode(bigCode);