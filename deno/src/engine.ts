import { OpCodes, systemWords } from "../src/opcodes.ts";
import { IrInstruction, IROp } from "./ir.ts";
import { SourceMap } from "./source-maps.ts";
import { decode } from "./vlq.ts";

const IMMEDIATE_WORDS = [
  BigInt(OpCodes.DEF),
  BigInt(OpCodes.KET),
  BigInt(OpCodes.MARK),
  BigInt(OpCodes.BRA)
];

export class Engine {
  static fromBase64(encoded: string): bigint[] {
    return decode(encoded)
      .flatMap((value) => {
        const op = value & 1n;
        const val = value >> 1n;
        if (op) {
          return [val];
        } else {
          return [0n, val];
        }
      });
  }

  private readonly stack: bigint[] = [];
  private readonly queue: bigint[] = [];
  private readonly defs = new Map<bigint, (() => void) | bigint[]>();

  private symbols = new Map<bigint, string>();

  private depth = 0;

  traceOn = false;
  base = 10;
  statsOn = false;
  profileOn = false;

  stats = {
    system_instructions_called: 0,
    user_instructions_called: 0,
    max_stack_depth: 0,
    max_queue_depth: 0
  }

  private profile: Record<string | number, [number, number | undefined]> = {};

  constructor() {
    this.setup();
  }

  getStack() {
    return this.stack.slice();
  }

  private peek(): bigint {
    return this.stack[this.stack.length - 1] || 0n;
  }

  private pop(): bigint {
    return this.stack.pop() || 0n;
  }

  private push(n: bigint): void {
    this.stack.push(n);
  }

  private poke(n: bigint): void {
    this.stack[this.stack.length - 1] = n;
  }

  clear(): void {
    this.stack.splice(0, this.stack.length);
  }

  private defineSystem(fn: () => void, code: number) {
    const n = BigInt(code);
    const name = this.getName(n);
    if (this.defs.has(n)) {
      throw new Error(`cannot redefine system word ${name}`);
    }
    this.defs.set(n, fn);
  }

  private defineUser(s: bigint[], n: bigint) {
    const name = this.getName(n);
    if (n > -1) {
      throw new Error(`cannot define system op ${name}`);
    }
    if (this.defs.has(n)) {
      if (n > -1) {
        throw new Error(`cannot redefine system op ${name}`);
      }
      throw new Error(`cannot redefine user op ${name}`);
    }
    this.defs.set(n, s);
  }

  private callSystem(code: bigint) {
    const r = this.defs.get(code);
    if (typeof r === "function") {
      this.statsOn && this.stats.system_instructions_called++;
      if (this.profileOn) {
        const start = performance.now();
        r();
        const end = performance.now();
        const name = this.getName(code) || Number(code);
        this.profile[name] ||= [ 0, 0 ]
        this.profile[name][0]++;
        this.profile[name][1] != 0;
        this.profile[name][1]! += (end - start);
        return;
      }
      return r();
    }
    const name = this.getName(code);
    throw new Error(`undefined system op call ${name}`);
  }

  private callUser(code: bigint) {
    const r = this.defs.get(code);
    if (Array.isArray(r)) {
      this.statsOn && this.stats.user_instructions_called++;
      this.queue.unshift(...r);
      if (this.profileOn) {
        const name = this.getName(code, `&${code}`);
        this.profile[name] ||= [ 0, undefined ]
        this.profile[name][0]++;
      }
      return;
    }
    const name = this.getName(code);
    throw new Error(`undefined user op call ${name}`);
  }

  private callOp(code: bigint): void {
    if (code > -1n) {
      return this.callSystem(code);
    }
    return this.callUser(code);
  }

  loadBigIntCode(bigCode: bigint[]) {
    this.queue.push(...bigCode);
  }

  loadIR(ir: IrInstruction[]) {
    let ip = 0;
    while (ip < ir.length) {
      const i = ir[ip++];

      if (i.op === IROp.call) {
        if (i.value === 0n) continue; // no-op

        // Keep symbols
        if (i.meta?.name && !this.symbols.has(i.value)) {
          this.symbols.set(i.value, i.meta?.name);
        }

        this.queue.push(i.value);
      } else {
        this.queue.push(0n);
        this.queue.push(i.value);
      }
    }
    return this.stack;
  }

  run() {
    const queue = this.queue;

    while (queue.length > 0) {
      const op = queue.shift() || 0n;

      this.traceOn && this.trace(op);

      const immediate = !this.depth || IMMEDIATE_WORDS.includes(op);

      if (op === 0n) {
        if (!immediate) this.push(op);
        this.push(queue.shift() || 0n);
      } else {
        if (!immediate) this.push(op);
        if (immediate) this.callOp(op);
      }

      if (this.statsOn) {
        this.stats.max_stack_depth = Math.max(this.stats.max_stack_depth, this.stack.length);
        this.stats.max_queue_depth = Math.max(this.stats.max_queue_depth, queue.length);
      }
    }
    return this.stack;
  }

  trace(op: bigint) {
    const name = this.getName(op);
    const s = this.stack.map(String).join(" ");
    const q = this.queue.map(String).join(" ");
    console.log(`[ ${s} ] ${name} [ ${q.slice(0 , 10)}...`);
  }

  getName(op: bigint, def = String(op)): string {
    return this.symbols.has(op) ? this.symbols.get(op)! : String(def);
  }

  print() {
    const s = this.stack.map(x => x.toString(this.base)).join(" ");
    console.log(`[ ${s} ]`);
  }

/**
 * It takes a source map and adds all of its symbols to the current source map
 * @param {SourceMap} sourceMap - SourceMap - The source map object that was generated by the compiler.
 */
  loadSourceMap(sourceMap: SourceMap) {
    Object.keys(sourceMap.symbols).forEach((value) => {
      this.symbols.set(BigInt(value), sourceMap.symbols[value]);
    });
  }

  private setup() {
    const encoder = new TextEncoder();

    let name: keyof typeof systemWords;
    for (name in systemWords) {
      this.symbols.set(BigInt(systemWords[name]), name);
    }

    this.defineSystem(() => {}, OpCodes.NOP);

    this.defineSystem(() => {
      const x = this.pop();
      this.queue.unshift(x);
    }, OpCodes.CALL);

    this.defineSystem(() => {
      this.depth--;
      const m = this.queue.pop();
      const s: bigint[] = this.stack.splice(Number(m || 0)) || [];
      this.defineUser(s, this.pop());
    }, OpCodes.DEF);

    this.defineSystem(() => {
      this.depth--;
      const m = this.queue.pop();
      const s: bigint[] = this.stack.splice(Number(m || 0)) || [];
      this.defineUser(s, this.peek());
    }, OpCodes.KET);

    this.defineSystem(() => {
      this.depth++;
      const m = this.stack.length;
      this.queue.push(BigInt(m));
    }, OpCodes.BRA);

    this.defineSystem(() => {
      this.depth++;
      const m = this.stack.length;
      this.queue.push(BigInt(m));
    }, OpCodes.MARK);

    this.defineSystem(() => this.clear(), OpCodes.CLR);

    this.defineSystem(() => {
      const n = this.pop();
      Deno.exit(Number(n));
    }, OpCodes.EXIT);

    this.defineSystem(() => {
      const max = this.pop();
      this.push(generateRandomBigInt(max));
    }, OpCodes.RND);

    this.defineSystem(() => {
      this.print();
    }, OpCodes.PRN);

    this.defineSystem(() => {
      this.push(BigInt(Date.now()));
    }, OpCodes.CLOCK);

    this.defineSystem(() => {
      const data = encoder.encode(String.fromCharCode(Number(this.pop())));
      Deno.stdout.writeSync(data);
    }, OpCodes.PUTC);

    this.defineSystem(() => {
      const input = new Uint8Array(1);
      Deno.setRaw(0, true);
      Deno.stdin.readSync(input);
      Deno.setRaw(0, false);
      this.push(BigInt(input[0]));
    }, OpCodes.GETC);

    this.defineSystem(() => {
      const data = encoder.encode(this.pop().toString(this.base));
      Deno.stdout.writeSync(data);
    }, OpCodes.PRNN);

    this.defineSystem(() => {
      this.pop();
    }, OpCodes.DROP);

    this.defineSystem(() => {
      const a = this.peek();
      const b = this.stack[this.stack.length - 2];
      this.stack[this.stack.length - 2] = a;
      this.poke(b);
    }, OpCodes.SWAP);

    this.defineSystem(() => {
      this.push(this.peek());
    }, OpCodes.DUP);

    this.defineSystem(() => {
      const a = this.pop();
      this.stack[this.stack.length - 1] += a;
    }, OpCodes.ADD);

    this.defineSystem(() => {
      const a = this.pop();
      this.stack[this.stack.length - 1] -= a;
    }, OpCodes.SUB);

    this.defineSystem(() => {
      const a = this.pop();
      this.stack[this.stack.length - 1] *= a;
    }, OpCodes.MUL);

    this.defineSystem(() => {
      const a = this.pop();
      this.stack[this.stack.length - 1] /= a;
    }, OpCodes.DIV);

    this.defineSystem(() => {
      const a = this.pop();
      this.stack[this.stack.length - 1] %= a;
    }, OpCodes.MOD);

    this.defineSystem(() => {
      const a = this.pop();
      this.stack[this.stack.length - 1] <<= a;
    }, OpCodes.SHIFTL);

    this.defineSystem(() => {
      const a = this.pop();
      this.stack[this.stack.length - 1] >>= a;
    }, OpCodes.SHIFTR);

    this.defineSystem(() => {
      const a = this.pop();
      this.stack[this.stack.length - 1] &= a;
    }, OpCodes.AND);

    this.defineSystem(() => {
      const a = this.pop();
      this.stack[this.stack.length - 1] **= a;
    }, OpCodes.POW);

    this.defineSystem(() => {
      // NOTE: Pop order requires opposite operation
      this.push(this.pop() > this.pop() ? 1n : 0n);
    }, OpCodes.LT);

    this.defineSystem(() => {
      this.push(this.pop() === this.pop() ? 1n : 0n);
    }, OpCodes.EQ);

    this.defineSystem(() => {
      // NOTE: Pop order requires opposite operation
      this.push(this.pop() < this.pop() ? 1n : 0n);
    }, OpCodes.GT);

    this.defineSystem(() => {
      const t = this.pop();
      if (this.pop() !== 0n) {
        this.queue.unshift(t);
      }
    }, OpCodes.IF);

    this.defineSystem(() => {
      this.queue.push(this.pop());
    }, OpCodes.PUSHR);

    this.defineSystem(() => {
      const a = this.queue.pop() || 0n;
      this.push(a);
    }, OpCodes.PULLR);

    this.defineSystem(() => {
      this.push(BigInt(this.stack.length));
    }, OpCodes.DEPTH);

    this.defineSystem(() => {
      const len = this.stack.length;
      this.queue.push(...this.stack.splice(0, len));
      this.queue.push(BigInt(len));
    }, OpCodes.STASH);

    this.defineSystem(() => {
      const len = Number(this.queue.pop());
      this.stack.unshift(...this.queue.splice(-len));
    }, OpCodes.FETCH);

    this.defineSystem(() => {
      const a = this.pop();
      this.stack[this.stack.length - 1] |= a;
    }, OpCodes.OR);

    this.defineSystem(() => {
      const a = this.pop();
      this.push(~a);
    }, OpCodes.NOT);
  }

  printProfile() {
    console.log();
    console.log('Profile:');
  
    const profileTable = Object.keys(this.profile).map((name) => {
      const calls = this.profile[name][0];
      const time = this.profile[name][1];
      return {
        name,
        calls,
        time,
        system: typeof time !== 'undefined',
        'ops/ms': time ? Math.round(calls / time) : ''
      }
    }).sort((a, b) => b.calls - a.calls);
  
    const system = profileTable.filter((p) => p.system);
    const user = profileTable.filter((p) => !p.system);
  
    console.table(system, ['name', 'calls', 'ops/ms']);
    console.table(user, ['name', 'calls']);
    console.log();
  }

  printStats() {
    console.log();
    console.log('Interpreter stats:');
    console.log(this.stats);
    console.log();
  }
}

/**
 * It generates a random number between 0 and the given number
 * @param {bigint} highBigInt - The highest possible value that can be generated.
 * @returns A random bigint between 0 and highBigInt
 */
function generateRandomBigInt(highBigInt: bigint) {
  const diff = highBigInt;
  const len = diff.toString().length;
  let m = "";
  while (m.length < len) {
    m += Math.random()
      .toString()
      .split(".")[1];
  }
  m = m.slice(0, len);
  const divisor = "1" + "0".repeat(len);

  return (diff * BigInt(m)) / BigInt(divisor);
}
