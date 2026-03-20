import { MAX_SYSTEM_OP_CODE, OpCodes, systemWords } from "./opcodes.ts";
import { IROp } from "./ir.ts";
import type { IrInstruction } from "./ir.ts";
import type { SourceMap } from "./source-maps.ts";
import { decode } from "./vlq.ts";
import type { CorePlatform } from "./platform.ts";

const IMMEDIATE_WORDS = [
  BigInt(OpCodes.DEF),
  BigInt(OpCodes.KET),
  BigInt(OpCodes.MARK),
  BigInt(OpCodes.BRA)
];

const Q_LITERAL = 0n;
const Q_CALL = 1n;

export class Engine {
  static fromBase64(encoded: string): bigint[] {
    return decode(encoded)
      .flatMap((value) => {
        const tag = value & 1n;
        const val = value >> 1n;
        return [tag, val];
      });
  }

  private readonly stack: bigint[] = [];
  private readonly queue: bigint[] = [];
  private readonly defs = new Map<bigint, (() => void) | bigint[]>();

  private symbols = new Map<bigint, string>();

  private depth = 0;
  private nextAnonOp = MAX_SYSTEM_OP_CODE + 1;

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

  private readonly platform: CorePlatform;

  constructor(platform: CorePlatform) {
    this.platform = platform;
    this.setup();
  }

  getStack() {
    return this.stack.slice();
  }

  private peek(): bigint {
    const l = this.stack.length;
    if (l > 0)
      return this.stack[l - 1];
    throw new Error("Peek: stack underflow");
  }

  private pop(): bigint {
    const l = this.stack.length;
    if (l > 0)
      return this.stack.pop()!;
    throw new Error("Pop: stack underflow");
  }

  private push(n: bigint): void {
    this.stack.push(n);
  }

  private poke(n: bigint): void {
    const l = this.stack.length;
    if (l > 0) {
      this.stack[l - 1] = n;
      return;
    }
    throw new Error("Poke: stack underflow");
  }

  clear(): void {
    this.stack.splice(0, this.stack.length);
  }

  private queuePush(tag: bigint, value: bigint) {
    this.queue.push(tag, value);
  }

  private queueUnshift(tag: bigint, value: bigint) {
    this.queue.unshift(tag, value);
  }

  private queueShift(): [bigint, bigint] {
    return [this.queue.shift() ?? 0n, this.queue.shift() ?? 0n];
  }

  private queuePop(): [bigint, bigint] {
    const value = this.queue.pop() ?? 0n;
    const tag = this.queue.pop() ?? 0n;
    return [tag, value];
  }

  private defineSystem(fn: () => void, code: number) {
    const n = BigInt(code);
    const name = this.getName(n);
    if (this.defs.has(n)) {
      throw new Error(`Define: cannot redefine system word "${name}"`);
    }
    this.defs.set(n, fn);
  }

  private defineUser(s: bigint[], n: bigint) {
    const name = this.getName(n);
    if (n > -1 && n < MAX_SYSTEM_OP_CODE) {
      throw new Error(`Define: cannot define system op "${name}"`);
    }
    if (this.defs.has(n)) {
      if (n > MAX_SYSTEM_OP_CODE) {
        throw new Error(`Define: cannot redefine anon op "${name}"`);
      }
      throw new Error(`Define: cannot redefine user op "${name}"`);
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
    const name = this.getName(code) || code;
    throw new Error(`Call: undefined system op "${name}"`);
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
    const name = this.getName(code) || code;
    throw new Error(`Call: undefined user op "${name}"`);
  }

  private callOp(code: bigint): void {
    if (code > -1n && code < MAX_SYSTEM_OP_CODE) {
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

        this.queuePush(Q_CALL, i.value);
      } else {
        this.queuePush(Q_LITERAL, i.value);
      }
    }
    return this.stack;
  }

  run() {
    const queue = this.queue;
    let immediate = false;

    while (queue.length > 0) {
      const [tag, value] = this.queueShift();
      const isCall = tag === Q_CALL;

      immediate = !this.depth || (isCall && IMMEDIATE_WORDS.includes(value));
      this.traceOn && this.trace(tag, value, immediate);

      if (isCall) {
        if (!immediate) {
          this.push(tag);
          this.push(value);
        } else {
          this.callOp(value);
        }
      } else {
        if (!immediate) this.push(tag);
        this.push(value);
      }

      if (this.statsOn) {
        this.stats.max_stack_depth = Math.max(this.stats.max_stack_depth, this.stack.length);
        this.stats.max_queue_depth = Math.max(this.stats.max_queue_depth, queue.length / 2);
      }
    }
    return this.stack;
  }

  trace(tag: bigint, value: bigint, immediate: boolean) {
    let name = tag === Q_CALL ? this.getName(value) : String(value);
    if (immediate) {
      name = `*${name}*`;
    }
    const s = this.stack.map(String).join(" ");
    const q = this.queue.map(String).join(" ");
    console.log(`[ ${s} ] ${name} [ ${q.slice(0 , 10)}...`);
  }

  getName(op: bigint, def = String(op)): string {
    return this.symbols.has(op) ? this.symbols.get(op)! : String(def);
  }

  print() {
    const s = this.stack.map(x => x.toString(this.base)).join(" ");
    this.platform.io.write(new TextEncoder().encode(`[ ${s} ]\n`));
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

  private getNextAnonOp() {
    let op = this.nextAnonOp++;
    while (this.defs.has(BigInt(op))) {
      op = this.nextAnonOp++;
    }
    return BigInt(op);
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
      this.callOp(x);
    }, OpCodes.CALL);

    this.defineSystem(() => {
      this.depth--;
      const [, m] = this.queuePop();
      const s: bigint[] = this.stack.splice(Number(m || 0)) || [];
      this.defineUser(s, this.pop());
    }, OpCodes.DEF);

    this.defineSystem(() => {
      this.depth--;
      const [, m] = this.queuePop();
      const s: bigint[] = this.stack.splice(Number(m || 0)) || [];
      const op = this.getNextAnonOp();
      this.defineUser(s, op);
      if (this.depth > 0) {
        this.push(0n);
      }
      this.push(op);
    }, OpCodes.KET);

    this.defineSystem(() => {
      this.depth++;
      const m = this.stack.length;
      this.queuePush(Q_LITERAL, BigInt(m));
    }, OpCodes.BRA);

    this.defineSystem(() => {
      this.depth++;
      const m = this.stack.length;
      this.queuePush(Q_LITERAL, BigInt(m));
    }, OpCodes.MARK);

    this.defineSystem(() => this.clear(), OpCodes.CLR);

    this.defineSystem(() => {
      const n = this.pop();
      this.platform.exit(Number(n));
    }, OpCodes.EXIT);

    this.defineSystem(() => {
      const max = this.pop();
      this.push(generateRandomBigInt(max));
    }, OpCodes.RAND);

    this.defineSystem(() => {
      this.print();
    }, OpCodes.PRN);

    this.defineSystem(() => {
      const q = this.pop();
      const p = this.pop();
      console.log(Number(p)/Number(q));
    }, OpCodes.RAT);

    this.defineSystem(() => {
      this.push(BigInt(this.platform.now()));
    }, OpCodes.CLOCK);

    this.defineSystem(() => {
      const data = encoder.encode(String.fromCharCode(Number(this.pop())));
      this.platform.io.write(data);
    }, OpCodes.PUTC);

    this.defineSystem(() => {
      if (this.platform.io.setRaw) {
        this.platform.io.setRaw(true);
      }
      const byte = this.platform.io.readByte();
      if (this.platform.io.setRaw) {
        this.platform.io.setRaw(false);
      }
      this.push(BigInt(byte ?? 0));
    }, OpCodes.GETC);

    this.defineSystem(() => {
      const data = encoder.encode(this.pop().toString(this.base));
      this.platform.io.write(data);
    }, OpCodes.PUTN);

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
      if (a === 0n) {
        throw new Error("DIV: Division by zero");
      } else {
        this.stack[this.stack.length - 1] /= a;
      }
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
        this.queueUnshift(Q_CALL, t);
      }
    }, OpCodes.IF);

    this.defineSystem(() => {
      this.queuePush(Q_LITERAL, this.pop());
    }, OpCodes.PUSHR);

    this.defineSystem(() => {
      const [, a] = this.queuePop();
      this.push(a);
    }, OpCodes.PULLR);

    this.defineSystem(() => {
      this.push(BigInt(this.stack.length));
    }, OpCodes.DEPTH);

    this.defineSystem(() => {
      const len = this.stack.length;
      const stash = this.stack.splice(0, len);
      stash.forEach((value) => this.queuePush(Q_LITERAL, value));
      this.queuePush(Q_LITERAL, BigInt(len));
    }, OpCodes.STASH);

    this.defineSystem(() => {
      const [, lenRaw] = this.queuePop();
      const len = Number(lenRaw);
      const fetch: bigint[] = [];
      for (let i = 0; i < len; i++) {
        const [, value] = this.queuePop();
        fetch.unshift(value);
      }
      this.stack.unshift(...fetch);
    }, OpCodes.FETCH);

    this.defineSystem(() => {
      const a = this.pop();
      this.stack[this.stack.length - 1] |= a;
    }, OpCodes.OR);

    this.defineSystem(() => {
      const a = this.pop();
      this.push(~a);
    }, OpCodes.NOT);

    this.defineSystem(() => {
      const o = this.pop();
      const n = this.pop();
      const s: bigint[] = [0n, n, 1n, o];
      const op = this.getNextAnonOp();
      this.defineUser(s, op);
      if (this.depth > 0) {
        this.push(0n);
      }
      this.push(op);
    }, OpCodes.CONS);
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
