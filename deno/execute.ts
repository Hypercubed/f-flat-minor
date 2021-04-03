const COMMENT_START = '/*';
const COMMENT_END = '*/';
const SIGNIFICANT_BITS = 7n;
const CONTINUE = 1n << SIGNIFICANT_BITS;
const REST_MASK = CONTINUE - 1n;

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

const symbols = new Map<string, bigint>();
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

// interpretor
let _nextCode = 0x80;

function nextCode(): bigint {
  return BigInt(_nextCode++);
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

function decodeWithOffset(byteArray: Uint8Array, startingOffset = 0) {
  let finalOffset = startingOffset;
  while (finalOffset < byteArray.length - 1 && (byteArray[finalOffset] & 0x80) === 0x80) {
    ++finalOffset;
  }

  let value = -1n;
  for (let offset = finalOffset; offset >= startingOffset; --offset) {
    ++value;
    value <<= SIGNIFICANT_BITS;
    value |= BigInt(byteArray[offset]) & REST_MASK;
  }

  if ((value & 1n) === 1n) {
    value >>= 1n;
    ++value;
    value = -value;
  } else {
    value >>= 1n;
  }

  return {
    value,
    followingOffset: finalOffset + 1,
  };
}

function fromByteArray(byteArray: Uint8Array): bigint[] {
  const ret = [];
  let offset = 0;
  while (offset < byteArray.length) {
    const { value, followingOffset } = decodeWithOffset(byteArray, offset);
    const op = value & 1n;
    const val = value >> 1n;
    if (op) {
      ret.push(val);
    } else {
      ret.push(0n);
      ret.push(val);
    }
    offset = followingOffset;
  }
  return ret;
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

const byteCode = Deno.readFileSync('./output.bin');

const bigCode = fromByteArray(byteCode);

executeBigIntCode(bigCode);