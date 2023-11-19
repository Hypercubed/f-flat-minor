// import "wasi";

import { MpInt } from "./mp";

const stack: MpInt[] = [];
const rstack: MpInt[] = [];

const symbols = new Map<string, u32>();
const core_defs = new Map<u32, () => void>();
const user_defs = new Map<u32, string[]>();

function peek(): MpInt {
  if (stack.length === 0) {
    throw 'err';
  }
  return stack[stack.length - 1];
}

function pop(): MpInt {
  if (stack.length === 0) {
    throw 'err';
  }
  return stack.pop();
}

// interpreter
let _nextCode = 0;

function nextCode(): u32 {
  return _nextCode++;
}

function getSymbol(name: string): u32 {
  name = name.toLowerCase();
  if (!symbols.has(name)) {
    const code = nextCode();
    symbols.set(name, code);
  }
  return symbols.get(name);
}

function defineCore(name: string, fn: () => void): void {
  const code = getSymbol(name);
  core_defs.set(code, fn);
}

function callOp(code: u32): void {
  if (core_defs.has(code)) {
    return core_defs.get(code)();
  }
  if (user_defs.has(code)) {
    return ev(user_defs.get(code));
  }
  throw 'err';
}

function setup(): void {
  defineCore('nop', () => { });

  defineCore('cls', () => {
    stack.splice(0, stack.length);
  });

  defineCore('eval', () => {
    callOp(pop().toU32());
  });

  defineCore('.', () => {  // print stack
    const s = stack.map((v: MpInt) => v.toString()).join(' ');
    console.log(`[ ${s} ]`);
  });

  defineCore('putc', () => {
    process.stdout.write(String.fromCharCode(pop().toU32()));
  });

  defineCore('drop', () => stack.pop());

  defineCore('swap', () => {  // swap
    const a = pop();
    const b = pop();
    stack.push(a);
    stack.push(b);
  });

  defineCore('dup', () => {
    stack.push(peek());
  });

  defineCore('+', () => {
    const lhs = stack[stack.length - 2];
    const rhs = pop();
    stack[stack.length - 2] = lhs.add(rhs);
  });

  defineCore('-', () => {
    const rhs = pop();
    const lhs = pop();
    stack.push(lhs.sub(rhs));
  });

  defineCore('*', () => {
    const rhs = pop();
    const lhs = pop();
    stack.push(lhs.mul(rhs));
  });

  defineCore('/', () => {
    throw 'err';
  });

  defineCore('=', () => {
    const lhs = pop();
    const rhs = pop();
    stack.push(lhs.cmp(rhs) === 0 ? MpInt.ONE : MpInt.ZERO);
    throw 'err';
  });

  defineCore('?', () => {
    const t = pop();
    if (!pop().eqz()) {
      callOp(t.toU32());
    }
  });

  defineCore('q<', () => {
    rstack.push(pop());
  });

  defineCore('q>', () => {
    stack.push(rstack.pop());
  });
}

function ev(tokens: string[]): void {
  let i = 0;
  const l = tokens.length;
  let token = '';
  while (i < l) {
    token = tokens[i++];

    if (!isNaN(parseInt(token))) {
      stack.push(MpInt.from(token));
    } else if (token.startsWith('\'')) { // String
      token.replaceAll('\'', '')
        .split('')
        .forEach(c => stack.push(MpInt.from(c.charCodeAt(0))));
    } else if (token.startsWith('&')) { // Symbol
      const name = token.replace('&', '');
      stack.push(MpInt.from(getSymbol(name)));
    } else if (symbols.has(token)) {  // Definition
      const code = symbols.get(token);
      callOp(code);
    } else if (token.endsWith(':')) { // Definition
      const name = token.replace(':', '');
      let code = getSymbol(name);
      token = tokens[i++];
      let def: string[] = [];
      while (token != ';' && i < l) {
        def.push(token);
        token = tokens[i++];
      }
      user_defs.set(code, def);
    } else if (token.startsWith('/*')) {  // Comment
      while (!token.endsWith('*/') && i < tokens.length && token !== '*/') {
        token = tokens[i++];
      }
    } else {
      throw new Error(`Undefined ${token}`);
    }
  }
}

function tokenize(s: string): string[] {
  s = s.replaceAll('\n', ' ').replaceAll('\r', ' ');

  return s.split(' ')
    .map<string>(s => s.trim())
    .filter(s => s !== '');
}

// RUN

setup();

// ev(tokenize(`1 2 3 4 5 6 7 8 9 10 * * * * * * * * * .`));

ev(tokenize(`

  /* define factorial */
  (fact): dup 1 - fact * ;
  fact: dup 1 - &(fact) ? ;

  /* string printing */
  ((prints)): q< (prints) q> putc ;
  (prints): dup &((prints)) ? ;
  prints: (prints) drop ;

  0 'Factorial 32 '100: 10 prints

  100 fact .

`));