import { MpZ } from "./mp";
import { Op } from "./consts";
import * as vm from "./vm";

let _nextCode = -1;

const symbols = new Map<string, u32>();

function getSymbol(name: string): u32 {
  name = name.toLowerCase();
  if (!symbols.has(name)) {
    const code = _nextCode--;
    symbols.set(name, code);
  }
  return symbols.get(name);
}

export function reset(): void {
  vm.reset();

  _nextCode = -1;
  symbols.clear();

  symbols.set('nop', Op.NOP);
  symbols.set('eval', Op.CALL);
  symbols.set('putc', Op.PUTC);
  symbols.set('putn', Op.PUTN);
  symbols.set('drop', Op.DROP);
  symbols.set('q<', Op.PUSHR);
  symbols.set('q>', Op.PULLR);
  symbols.set('dup', Op.DUP);
  symbols.set('clr', Op.CLR);
  symbols.set('exit', Op.EXIT);
  symbols.set('depth', Op.DEPTH);
  symbols.set('swap', Op.SWAP);
  symbols.set('*', Op.MUL);
  symbols.set('+', Op.ADD);
  symbols.set('-', Op.SUB);
  symbols.set('.', Op.DUMP);
  symbols.set('/', Op.DIV);
  symbols.set(':', Op.MARK);
  symbols.set(';', Op.DEF);
  symbols.set('<', Op.LT);
  symbols.set('=', Op.EQ);
  symbols.set('>', Op.GT);
  symbols.set('?', Op.WHEN);
  symbols.set('[', Op.BRA);
  symbols.set(']', Op.KET);
}

function tokenize(s: string): string[] {
  return s.split(' ')
    .map<string>(s => s.trim())
    .filter(s => s !== '');
}

export function run(s: string): void {
  s = s.replaceAll('\r', '\n');
  const lines = s.split('\n');

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const tokens = tokenize(line);

    for (let j = 0; j < tokens.length; j++) {
      const token = tokens[j];

      if (!isNaN(parseInt(token))) {
        vm.PUSH(MpZ.from(token));
      } else if (token.startsWith('.') && token.length > 1) { // compile-time command
        continue;
      } else if (token.startsWith('\'')) { // String
        token.replaceAll('\'', '')
          .split('')
          .forEach(c => vm.PUSH(MpZ.from(c.charCodeAt(0))));
      } else if (token.startsWith('/*')) {  // Comment
        let t = tokens[j++];
        while (!t.endsWith('*/') && j < tokens.length) {
          t = tokens[j++];
        }
      } else if (token.endsWith(':') && token.length > 1) { // Definition
        const name = token.substring(0, token.length - 1);
        const code = getSymbol(name);
        vm.PUSH(MpZ.from(code));
        vm.CALL(Op.MARK);
      } else if (token.startsWith('[') && token.endsWith(']')) {  // Pointer
        const name = token.substring(1, token.length - 1);
        const code = getSymbol(name);
        vm.PUSH(MpZ.from(code));
      } else {
        const code = getSymbol(token);
        vm.CALL(code);
      }

      if (vm.inError()) {
        process.stderr.write(`Error at line ${i + 1}, token ${j}: ${vm.getError()}\n`);
        process.stderr.write(`*** ${line} *** \n`);
        vm.clearError();
        break;
      }
    }
  }
}

export function dump(): void {
  return vm.dump();
}

export function peek(): MpZ {
  return vm.peek();
}
