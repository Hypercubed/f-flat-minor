const COMMENT_START = '/*';
const COMMENT_END = '*/';
const SIGNIFICANT_BITS = 7n;
const CONTINUE = 1n << SIGNIFICANT_BITS;
const REST_MASK = CONTINUE - 1n;

enum IROp {
  call = 'call',
  push = 'push'
}

interface IrInstruction {
  value: bigint;
  op: IROp;
  comment: string;
}

const symbols = new Map<string, bigint>();

// interpretor
let _nextCode = 0x80;

function nextCode(): bigint {
  return BigInt(_nextCode++);
}

function defineSystem(name: string, char: string | number) {
  const code = BigInt((typeof char === 'string') ? char.charCodeAt(0) : char);
  symbols.set(name, code);
}

function getSymbol(name: string): bigint {
  name = name.toLowerCase();
  let code = symbols.get(name);
  if (code === undefined) {
    code = nextCode();
    symbols.set(name, code);
  }
  return code;
}

// 

function encodeInto<U>(value: bigint, byteArray: Array<number>, offset = 0) {
  value = BigInt(value);

  if (value < 0) {
    value = -value;
    --value;
    value <<= 1n;
    value |= 1n;
  } else {
    value <<= 1n;
  }

  while (value >= CONTINUE && offset < byteArray.length) {
    byteArray[offset] = Number((value & REST_MASK) | CONTINUE);
    value >>= SIGNIFICANT_BITS;
    --value;
    ++offset;
  }

  if (offset >= byteArray.length) {
    throw new Error('insufficient space');
  }

  byteArray[offset] = Number(value);
  ++offset;

  return offset;
}

function compileToIR(s: string[]): IrInstruction[] {
  let compileMode = false;
  let i = 0;
  const l = s.length;
  let ss = '';
  const ret: IrInstruction[] = [];
  while (i < l) {
    ss = s[i++];

    if (ss === ';') {
      compileMode = false;
    }

    if (compileMode) {
      const ir = compileToIR([ss]);
      const bc = ir.flatMap(toBigIntIR).map(String);
      const c = compileToIR(bc);
      c.forEach(cc => cc.comment = '');
      c[0].comment = ss;
      ret.push(...c);
      continue;
    }

    const maybeNumber = parseInt(ss, 10);
    const isNumber = !isNaN(maybeNumber);

    if (isNumber) {
      ret.push({ value: BigInt(maybeNumber), op: IROp.push, comment: ss });
    } else if (ss.endsWith(':')) { // Definition
      const name = ss.replace(/:$/, '');
      ret.push({ value: getSymbol(name), op: IROp.push, comment: ss });
      compileMode = true;
    } else if (ss === COMMENT_START) {  // Comment
      const comment = ['/*'];
      while (i < s.length && ss !== COMMENT_END) {
        ss = s[i++];
        comment.push(ss);
      }
      ret.push({ value: 0n, op: IROp.call, comment: comment.join(' ') });
    } else if (ss[0] === '&') { // Symbol
      const name = ss.replace(/^&/, '');
      const code = getSymbol(name);
      ret.push({ value: code, op: IROp.push, comment: ss });
    } else if (ss[0] === '\'') { // String
      const chars = ss.replace(/^'/, '')
        .split('')
        .map(c => String(c.charCodeAt(0)))
        .reverse();
      const ir = compileToIR(chars);
      ir.forEach(cc => cc.comment = '');
      ir[0].comment = ss;
      ret.push(...ir);
    } else {
      const code = getSymbol(ss);
      ret.push({ value: code, op: IROp.call, comment: ss });
    }
  }
  return ret;
}

function toBigIntIR(i: IrInstruction) {
  if (i.op !== IROp.push) {
    if (i.op === IROp.call && i.value === 0n) return [];
    return [i.value];
  }
  return [0n, i.value];
}

function compileToByteArray(ir: Array<IrInstruction>): Uint8Array {
  const out = { length: Infinity };
  let offset = 0;
  ir.forEach(i => {
    if (i.op === IROp.call && i.value === 0n) return; 
    const vv = i.value << 1n;
    const v = i.op === IROp.push ? vv : (vv | 1n);
    offset = encodeInto(v, out as number[], offset);
  });

  out.length = offset;
  return Uint8Array.from(out);
}

function tokenize(s: string) {
  return s.split(/\s+/).filter(Boolean);
}

// Definitions

function setup() {
  defineSystem('nop',    0);
  defineSystem('call',   1);
  defineSystem(';',    ';');
  defineSystem('cls',  '~');
  defineSystem('.',    '.');
  defineSystem('putc', '@');
  defineSystem('drop', '$');
  defineSystem('swap', '%');
  defineSystem('dup',  '!');
  defineSystem('+',    '+');
  defineSystem('-',    '-');
  defineSystem('*',    '*');
  defineSystem('/',    '/');
  defineSystem('=',    '=');
  defineSystem('?',    '?');
  defineSystem('dip',  '^');
}

// Run
setup();

const code = Deno.readTextFileSync('../input.ff');

const tokens = tokenize(code);
const ir = compileToIR(tokens);
const byteCode = compileToByteArray(ir);

Deno.stdout.writeSync(byteCode);
