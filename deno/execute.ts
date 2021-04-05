import { decodeByteArray } from "./leb128.ts";

const encoder = new TextEncoder();

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

const defs = new Map<bigint, () => void | bigint[]>();

function peek(): bigint {
  if (stack.length === 0) {
    throw 'err';
  }
  return stack[stack.length - 1] as bigint;
}

function pop(): bigint {
  if (stack.length === 0) {
    throw 'err';
  }
  return stack.pop() as bigint;
}

function defineSystem(name: string, fn: () => void, char: string | number) {
  const code = BigInt(typeof char === 'number' ? char : char.charCodeAt(0));
  defs.set(code, fn);
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
  throw `Unknown code ${code}`;
}

// 

function fromByteArray(byteArray: Uint8Array): bigint[] {
  const arr = decodeByteArray(Array.from(byteArray));

  return arr.flatMap(value => {
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

// function toPrintableCharacter(n: number) {
//   if (n < 32 || (n > 126 && n < 161)) {
//     return '.';
//   }
//   return String.fromCharCode(n);
// }

// function dumpByteArray(byteArray: Uint8Array) {
//   for (let i = 0; i < byteArray.length; i += 16) {
//     const c = [...byteArray.slice(i, i+16)];
//     const s: string[] = c.map(toPrintableCharacter);
//     const h = c.map(cc => cc.toString(16).toUpperCase().padStart(2, '0'));
//     console.log(h.join(' ').padEnd(48, ' '), s.join(''));
//   }

//   console.log(byteArray.length, 'bytes');
//   console.log();
// }

// Definitions

function setup() {
  defineSystem('nop', () => {}, 0);

  defineSystem('call', () => {
    callOp(pop());
  }, 1);

  defineSystem(';', () => {
    const s: bigint[] = stack.splice(0, stack.length) || [];
    const n = s.shift() || 0n;
    defs.set(n, s as any);
  }, ';');

  defineSystem('cls', () => {
    stack.splice(0, stack.length);
  }, '~');

  defineSystem('.', () => {  // print stack
    console.log(`[${stack}]`);
  }, '.');

  defineSystem('putc', () => {
    const data = encoder.encode(String.fromCharCode(Number(pop())));
    Deno.stdout.writeSync(data);
  }, '@');

  defineSystem('drop', () => stack.pop(), '$');

  defineSystem('swap', () => {  // swap
    const a = pop();
    const b = pop();
    stack.push(a);
    stack.push(b);
  }, '%');

  defineSystem('dup', () => {
    stack.push(peek());
  }, '!');

  defineSystem('+', () => {
    const a = pop();
    stack[stack.length - 1] += a;
  }, '+');

  defineSystem('-', () => {
    const a = pop();
    stack[stack.length - 1] -= a;
  }, '-');

  defineSystem('*', () => {
    const a = pop();
    stack[stack.length - 1] *= a;
  }, '*');

  defineSystem('/', () => {
    const a = pop();
    stack[stack.length - 1] /= a;
  }, '/');

  defineSystem('=', () => {
    stack.push(pop() === pop() ? 1n : 0n);
  }, '=');

  defineSystem('?', () => {
    const t = pop();
    if (pop() !== 0n) {
      callOp(t);
    }
  }, '?');

  defineSystem('dip', () => {
    const a = pop()
    const b = pop()
    callOp(a)
    stack.push(b);
  }, '^');
}

// Run
setup();

const byteCode = new Uint8Array(1024);
await Deno.stdin.read(byteCode);

const bigCode = fromByteArray(byteCode);

executeBigIntCode(bigCode);