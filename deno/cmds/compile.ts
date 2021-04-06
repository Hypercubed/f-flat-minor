import { dumpByteArray } from '../src/dump.ts';
import { encodeBigIntArray } from '../src/leb128.ts';
import { OpCodes } from '../src/opcodes.ts';

const COMMENT_START = '/*';
const COMMENT_END = '*/';

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

function defineSystem(name: string, code: number) {
  symbols.set(name, BigInt(code));
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
    } else if (ss[0] === '\'') { // String
      const chars = ss.replace(/^'/, '')
        .split('')
        .map(c => String(c.charCodeAt(0)))
        .reverse();
      const ir = compileToIR(chars);
      ir.forEach(cc => cc.comment = '');
      ir[0].comment = ss;
      ret.push(...ir);
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
    } else {
      const code = getSymbol(ss);
      ret.push({ value: code, op: IROp.call, comment: ss });
    }
  }
  return ret;
}

function toBigIntIR(i: IrInstruction) {
  if (i.op !== IROp.push) {
    if (i.op === IROp.call && i.value === 0n) return []; // Remove NOPS
    return [i.value];
  }
  return [0n, i.value];
}

function compileToByteArray(ir: Array<IrInstruction>): Uint8Array {
  const arr = ir.flatMap(i => {
    if (i.op === IROp.call && i.value === 0n) return []; // Remove NOPS
    const vv = i.value << 1n;
    return [i.op === IROp.push ? vv : (vv | 1n)];
  });

  return Uint8Array.from(encodeBigIntArray(arr));
}

function tokenize(s: string) {
  return s.split(/\s+/).filter(Boolean);
}

function printIr(ir: Array<IrInstruction>) {
  ir.forEach(i => {
    const n = (i.value + 'n').padEnd(5, ' ');
    const o = i.op.toUpperCase().padEnd(6, ' ');
    console.log(n, o, ';', i.comment)
  });
}

// Definitions

function setup() {
  defineSystem('nop',  OpCodes.NOP);
  defineSystem('call', OpCodes.CALL);
  defineSystem(';',    OpCodes.DEF);
  defineSystem('cls',  OpCodes.CLS);
  defineSystem('.',    OpCodes.PRN);
  defineSystem('putc', OpCodes.PUTC);
  defineSystem('drop', OpCodes.DROP);
  defineSystem('swap', OpCodes.SWAP);
  defineSystem('dup',  OpCodes.DUP);
  defineSystem('+',    OpCodes.ADD);
  defineSystem('-',    OpCodes.SUB);
  defineSystem('*',    OpCodes.MUL);
  defineSystem('/',    OpCodes.DIV);
  defineSystem('=',    OpCodes.EQ);
  defineSystem('?',    OpCodes.IF);
  defineSystem('dip',  OpCodes.DIP);
}

// Run
setup();

const buf = new Uint8Array(1024);
const n = <number>await Deno.stdin.read(buf);
const code = new TextDecoder().decode(buf.subarray(0, n));
const ir = compileToIR(tokenize(code));

if (Deno.args.includes('--ir')) {
  printIr(ir);
  Deno.exit();
}

const byteCode = compileToByteArray(ir);

if (Deno.args.includes('--dump')) {
  dumpByteArray(byteCode);
  Deno.exit();
}

Deno.stdout.writeSync(byteCode);
