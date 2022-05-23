// import "wasi";

type Base = i64;

const stack: Base[] = [];

const symbols = new Map<string, Base>();
const core_defs = new Map<Base, () => void>();
const user_defs = new Map<Base, string[]>();

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

// interpretor
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

  defineCore('call', () => {;
    callOp(pop());
  });

  defineCore('.', () => {  // print stack
    log(`[${stack}]`);
  });

  defineCore('putc', () => {
    output += String.fromCharCode(pop() as i32);
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
    const a = pop();
    stack[stack.length - 1] += a;
  });

  defineCore('-', () => {
    const a = pop();
    stack[stack.length - 1] -= a;
  });

  defineCore('*', () => {
    const a = pop();
    stack[stack.length - 1] *= a;
  });

  defineCore('/', () => {
    const a = pop();
    stack[stack.length - 1] /= a;
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

  defineCore('dip', () => {
    const a = pop()
    const b = pop()
    callOp(a)
    stack.push(b);
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
      token.replace('\'', '')
        .split('')
        .reverse()
        .forEach(c => stack.push(c.charCodeAt(0)));
    } else if (token.startsWith('&')) { // Symbol
      const name = token.replace('&', '');
      stack.push(getSymbol(name));
    } else if (symbols.has(token))  {  // Defintition
      const code = symbols.get(token);
      callOp(code);
    } else if (token.endsWith(':')) { // Defintition
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
      while (!token.endsWith('*/') && i < tokens.length) {
        token = tokens[i++];
      }
    } else {
      throw new Error(`Undefined ${token}`);
    }
  }
}

function tokenize(s: string): string[] {
  return s.split(' ')
    .map<string>(s => s.trim())
    .filter(s => s !== '');
}

let output = '';

function log(line: string): void {
  output += line + '\n';
}

export function main(): string {
  setup();

  ev(tokenize(`
  
    /* common definitions */
    --: 1 - ;
    not: 0 = ;
    rot: &swap dip swap ;
    choose: &swap ? drop ;
    ifte: rot choose call ;

    /* factorial */
    fact_t: drop 1 ;
    fact_f: dup -- fact * ;
    fact: dup &fact_t &fact_f ifte ;

    /* string printing */
    print_f: putc print ;
    print: dup &drop &print_f ifte ;
    println: print 10 putc ;

    0 32 'Factorial print
    0 '15: println

    15 fact .
  
  `));

  return output;
}
