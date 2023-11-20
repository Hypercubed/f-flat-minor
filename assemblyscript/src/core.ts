import { MpZ } from "./mp";

export const stack: MpZ[] = [];
export const rstack: MpZ[] = [];

export const symbols = new Map<string, u32>();
export const core_defs = new Map<u32, () => void>();
export const user_defs = new Map<u32, string[]>();

function peek(): MpZ {
  if (stack.length === 0) {
    throw 'err';
  }
  return stack[stack.length - 1];
}

function pop(): MpZ {
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

export function getSymbol(name: string): u32 {
  name = name.toLowerCase();
  if (!symbols.has(name)) {
    const code = nextCode();
    symbols.set(name, code);
  }
  return symbols.get(name);
}

export function defineCore(name: string, fn: () => void): void {
  const code = getSymbol(name);
  core_defs.set(code, fn);
}

export function callOp(code: u32): void {
  if (core_defs.has(code)) {
    return core_defs.get(code)();
  }
  if (user_defs.has(code)) {
    return ev(user_defs.get(code));
  }
  throw 'err';
}

defineCore('nop', () => { });

defineCore('clr', () => {
  stack.splice(0, stack.length);
});

defineCore('eval', () => {
  callOp(pop().toU32());
});

defineCore('.', () => {  // print stack
  const s = stack.map((v: MpZ) => v.toString()).join(' ');
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
  const rhs = pop();
  const lhs = pop();
  stack.push(lhs.div(rhs));
});

defineCore('=', () => {
  const lhs = pop();
  const rhs = pop();
  stack.push(lhs.cmp(rhs) === 0 ? MpZ.ONE : MpZ.ZERO);
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

export function ev(tokens: string[]): void {
  let i = 0;
  const l = tokens.length;
  let token = '';
  while (i < l) {
    token = tokens[i++];

    if (!isNaN(parseInt(token))) {
      stack.push(MpZ.from(token));
    } else if (token.startsWith('\'')) { // String
      token.replaceAll('\'', '')
        .split('')
        .forEach(c => stack.push(MpZ.from(c.charCodeAt(0))));
    } else if (token.startsWith('&')) { // Symbol
      const name = token.replace('&', '');
      stack.push(MpZ.from(getSymbol(name)));
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

export function tokenize(s: string): string[] {
  s = s.replaceAll('\n', ' ').replaceAll('\r', ' ');

  return s.split(' ')
    .map<string>(s => s.trim())
    .filter(s => s !== '');
}
