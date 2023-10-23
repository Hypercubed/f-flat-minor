// import "wasi";

type Base = i64;

const stack: Base[] = [];
const rstack: Base[] = [];

const symbols = new Map<string, Base>();
const core_defs = new Map<Base, () => void>();
const user_defs = new Map<Base, string[]>();

let output = '';

function peek(): Base {
  if (stack.length === 0) {
    throw 'err';
  }
  return stack[stack.length - 1] as Base;
}

function pop(): Base {
  if (stack.length === 0) {
    throw 'err';
  }
  return stack.pop() as Base;
}

// interpreter
let _nextCode = 0;

function nextCode(): Base {
  return _nextCode++;
}

function getSymbol(name: string): Base {
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

function callOp(code: Base): void {
  if (core_defs.has(code)) {
    return core_defs.get(code)();
  }
  if (user_defs.has(code)) {
    return ev(user_defs.get(code));
  }
  throw 'err';
}

function setup(): void {
  defineCore('nop', () => {});

  defineCore('cls', () => {
    stack.splice(0, stack.length);
  });

  defineCore('eval', () => {;
    callOp(pop());
  });

  defineCore('.', () => {  // print stack
    console.log(`[${stack}]`);
  });

  defineCore('putc', () => {
    process.stdout.write(String.fromCharCode(pop() as i32));
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
    stack[stack.length - 2] += pop();
  });

  defineCore('-', () => {
    stack[stack.length - 2] -= pop();
  });

  defineCore('*', () => {
    stack[stack.length - 2] *= pop();
  });

  defineCore('/', () => {
    stack[stack.length - 2] /= pop();
  });

  defineCore('=', () => {
    stack.push(pop() === pop() ? 1 : 0);
  });

  defineCore('?', () => {
    const t = pop();
    if (pop() !== 0) {
      callOp(t);
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
      stack.push(I64.parseInt(token, 10));
    } else if (token.startsWith('\'')) { // String
      token.replaceAll('\'', '')
        .split('')
        .forEach(c => stack.push(c.charCodeAt(0)));
    } else if (token.startsWith('&')) { // Symbol
      const name = token.replace('&', '');
      stack.push(getSymbol(name));
    } else if (symbols.has(token))  {  // Definition
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

ev(tokenize(`

(fact): dup 1 - fact * ;
fact: dup 1 - &(fact) ? ;

(prints): q< prints_ q> putc ;
prints_: dup &(prints) ? ;
prints: prints_ drop ;

0 'Factorial 32 '10: 10 prints

10 fact .

`));