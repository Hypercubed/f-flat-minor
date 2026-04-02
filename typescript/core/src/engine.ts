import { MAX_SYSTEM_OP_CODE, OpCodes, systemWords } from "./opcodes.ts";
import { IROp } from "./ir.ts";
import type { IrInstruction } from "./ir.ts";
import type { SourceMap } from "./source-maps.ts";
import { decode } from "./vlq.ts";
import type { CorePlatform } from "./platform.ts";
import { getCoreVocabularyEntry } from "./core-vocabulary.ts";

const IMMEDIATE_WORDS = [
  BigInt(OpCodes.DEF),
  BigInt(OpCodes.KET),
  BigInt(OpCodes.MARK),
  BigInt(OpCodes.BRA)
];

const Q_LITERAL = 0n;
const Q_CALL = 1n;
type TraceFormat = "human" | "jsonl";

interface TraceQueueToken {
  tag: "literal" | "call";
  value: string;
  action: string;
}

interface TraceEvent {
  step: number;
  immediate: boolean;
  tag: "literal" | "call";
  value: string;
  action: string;
  stack_before: string[];
  stack_after?: string[];
  queue_preview: TraceQueueToken[];
  queue_depth: number;
}

export interface EngineRunAsyncOptions {
  /** Number of VM cycles to run before yielding. Must be >= 1. */
  yieldEvery?: number;
  /** Callback awaited between chunks when work remains. */
  scheduler?: () => void | Promise<void>;
  /** If false, stops before the next scheduler tick (cooperative cancellation). */
  shouldContinue?: () => boolean;
  /** Called after each chunk when more work remains (for progress / diagnostics). */
  onChunk?: (state: { vmCyclesExecuted: number }) => void;
}

export interface RunAsyncResult {
  stack: bigint[];
  /** True when {@link EngineRunAsyncOptions.shouldContinue} returned false while work remained. */
  cancelled: boolean;
  /** Total VM steps executed during this run (including partial chunks). */
  vmCyclesExecuted: number;
}

export interface InspectableToken {
  /** The bigint value */
  value: bigint;
  /** The tag (0 = literal, 1 = call) */
  tag: bigint;
  /** Display name if known */
  name: string | undefined;
  /** Whether this is a call vs literal */
  isCall: boolean;
  /** Whether this value has a definition */
  isDefined: boolean;
}

export interface ValueInspection {
  /** The raw value being inspected */
  value: bigint;
  /** The symbol name if known */
  name: string | undefined;
  /** Whether this is a system word (opcode 0-255) */
  isSystem: boolean;
  /** Whether this value has a definition */
  isDefined: boolean;
  /** The definition as inspectable tokens for user words/quotes */
  definition: InspectableToken[] | undefined;
  /** Stack effect for core words (e.g., "a b + == n") */
  stackEffect: string | undefined;
  /** Description for core words */
  description: string | undefined;
}

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
  traceFormat: TraceFormat = "human";
  traceVerbose = false;
  traceQueueMax = 8;
  traceStackMax = 32;
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

  private runChunk(maxSteps: number, initialStep: number) {
    const queue = this.queue;
    let immediate = false;
    let step = initialStep;
    let stepsRun = 0;

    while (queue.length > 0 && stepsRun < maxSteps) {
      const [tag, value] = this.queueShift();
      const isCall = tag === Q_CALL;
      const stackBefore = this.stack.slice();

      immediate = !this.depth || (isCall && IMMEDIATE_WORDS.includes(value));

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

      const traceStep = step++;
      this.traceOn && this.trace({
        step: traceStep,
        immediate,
        tag,
        value,
        stackBefore,
        stackAfter: this.traceVerbose || this.traceFormat === "jsonl" ? this.stack.slice() : undefined,
      });
      stepsRun++;
    }

    return step;
  }

  run() {
    this.runChunk(Number.POSITIVE_INFINITY, 0);
    return this.stack;
  }

  async runAsync(options: EngineRunAsyncOptions = {}): Promise<RunAsyncResult> {
    const yieldEvery = options.yieldEvery ?? 2048;
    if (!Number.isFinite(yieldEvery) || yieldEvery < 1) {
      throw new Error(`runAsync: yieldEvery must be a positive finite number (received ${yieldEvery})`);
    }

    const scheduler = options.scheduler ?? (() => new Promise<void>((resolve) => {
      globalThis.setTimeout(resolve, 0);
    }));

    let step = 0;
    let vmCyclesExecuted = 0;
    let cancelled = false;

    while (this.queue.length > 0) {
      const stepBefore = step;
      step = this.runChunk(yieldEvery, step);
      vmCyclesExecuted += step - stepBefore;

      if (this.queue.length > 0) {
        options.onChunk?.({ vmCyclesExecuted });
        if (options.shouldContinue && !options.shouldContinue()) {
          cancelled = true;
          break;
        }
        await scheduler();
      }
    }

    return { stack: this.stack.slice(), cancelled, vmCyclesExecuted };
  }

  private trace({
    step,
    immediate,
    tag,
    value,
    stackBefore,
    stackAfter,
  }: {
    step: number;
    immediate: boolean;
    tag: bigint;
    value: bigint;
    stackBefore: bigint[];
    stackAfter: bigint[] | undefined;
  }) {
    const event = this.createTraceEvent(step, immediate, tag, value, stackBefore, stackAfter);
    if (this.traceFormat === "jsonl") {
      this.writeTraceLine(JSON.stringify(event));
      return;
    }
    this.writeTraceLine(this.formatHumanTrace(event));
  }

  private createTraceEvent(
    step: number,
    immediate: boolean,
    tag: bigint,
    value: bigint,
    stackBefore: bigint[],
    stackAfter: bigint[] | undefined,
  ): TraceEvent {
    const isCall = tag === Q_CALL;
    const action = isCall ? this.getName(value, String(value)) : String(value);
    const queuePreview = this.getQueuePreview();
    return {
      step,
      immediate,
      tag: isCall ? "call" : "literal",
      value: String(value),
      action,
      stack_before: this.limitStack(stackBefore).map(String),
      stack_after: stackAfter ? this.limitStack(stackAfter).map(String) : undefined,
      queue_preview: queuePreview,
      queue_depth: this.queue.length / 2,
    };
  }

  private limitStack(stack: bigint[]) {
    return stack.length > this.traceStackMax ? stack.slice(-this.traceStackMax) : stack;
  }

  private getQueuePreview(): TraceQueueToken[] {
    const preview: TraceQueueToken[] = [];
    const max = Math.max(this.traceQueueMax, 0);
    for (let i = 0; i < this.queue.length && preview.length < max; i += 2) {
      const tag = this.queue[i] ?? 0n;
      const value = this.queue[i + 1] ?? 0n;
      const isCall = tag === Q_CALL;
      preview.push({
        tag: isCall ? "call" : "literal",
        value: String(value),
        action: isCall ? this.getName(value, String(value)) : String(value),
      });
    }
    return preview;
  }

  private formatHumanTrace(event: TraceEvent) {
    const action = this.padHumanAction(event.action);
    const stackBefore = this.formatHumanStack(event.stack_before);
    const queueNext = this.formatHumanQueue(event.queue_preview, event.queue_depth);
    const line = this.layoutHumanTraceLine(event.step, stackBefore, action, queueNext);
    if (this.traceVerbose) {
      const stackAfter = this.formatHumanStack(event.stack_after ?? []);
      return `${line}\n${" ".repeat(String(event.step).length + 1)}${stackAfter} | immediate=${event.immediate} tag=${event.tag} value=${event.value} stack_depth=${this.stack.length} queue_depth=${event.queue_depth}`;
    }
    return line;
  }

  private padHumanAction(action: string) {
    return action.length >= 7 ? action : action.padStart(Math.floor((7 + action.length) / 2), " ").padEnd(7, " ");
  }

  private layoutHumanTraceLine(
    step: number,
    stackBefore: string,
    action: string,
    queueNext: string,
  ) {
    const width = this.getTraceTerminalWidth();
    const stepLabel = `${step} `;
    if (stepLabel.length >= width) {
      return stepLabel.slice(0, width);
    }

    const minGap = 1;
    const actionWidth = Math.min(action.length, Math.max(width - stepLabel.length - (minGap * 2), 1));
    const centeredStart = Math.max(
      stepLabel.length + minGap,
      Math.floor((width - actionWidth) / 2),
    );
    const actionStart = Math.min(centeredStart, Math.max(stepLabel.length + minGap, width - actionWidth - minGap));
    const actionEnd = actionStart + actionWidth;

    const leftStart = stepLabel.length;
    const leftEnd = Math.max(leftStart, actionStart - minGap);
    const rightStart = Math.min(width, actionEnd + minGap);
    const rightEnd = width;
    const leftWidth = Math.max(leftEnd - leftStart, 0);
    const rightWidth = Math.max(rightEnd - rightStart, 0);

    const line = Array.from({ length: width }, () => " ");

    this.writeSegment(line, 0, stepLabel, stepLabel.length);
    this.writeSegment(line, actionStart, action, actionWidth);

    if (leftWidth > 0) {
      const leftText = this.truncateLeft(stackBefore, leftWidth);
      this.writeSegment(line, leftEnd - leftText.length, leftText, leftText.length);
    }

    if (rightWidth > 0) {
      const rightText = this.truncateRight(queueNext, rightWidth);
      this.writeSegment(line, rightStart, rightText, rightText.length);
    }

    return line.join("").replace(/\s+$/, "");
  }

  private formatHumanStack(stack: string[]) {
    if (stack.length === 0) return "[ ]";
    return `[ ${stack.join(" ")} ]`;
  }

  private formatHumanQueue(preview: TraceQueueToken[], queueDepth: number) {
    const rendered = preview.map((token) => token.tag === "call" ? `&${token.action}` : token.value);
    const hidden = Math.max(queueDepth - preview.length, 0);
    if (hidden > 0) rendered.push(`…(+${hidden})`);
    if (rendered.length === 0) return "[ ]";
    return `[ ${rendered.join(" ")} ]`;
  }

  private getTraceTerminalWidth() {
    const fallbackWidth = 120;

    const deno = (globalThis as {
      Deno?: {
        consoleSize?: (rid: number) => { columns?: number };
        stdout?: { rid?: number; isTerminal?: () => boolean };
        stderr?: { rid?: number; isTerminal?: () => boolean };
      };
    }).Deno;

    const denoRid =
      deno?.stderr?.isTerminal?.() && typeof deno.stderr.rid === "number"
        ? deno.stderr.rid
        : deno?.stdout?.isTerminal?.() && typeof deno.stdout.rid === "number"
          ? deno.stdout.rid
          : undefined;

    if (typeof denoRid === "number") {
      try {
        const columns = deno?.consoleSize?.(denoRid).columns;
        if (typeof columns === "number" && columns > 0) {
          return columns;
        }
      } catch {
        // Ignore runtime-specific console size lookup failures.
      }
    }

    const process = (globalThis as {
      process?: {
        stderr?: { columns?: number; isTTY?: boolean };
        stdout?: { columns?: number; isTTY?: boolean };
      };
    }).process;

    const columns =
      process?.stderr?.isTTY && typeof process.stderr.columns === "number"
        ? process.stderr.columns
        : process?.stdout?.isTTY && typeof process.stdout.columns === "number"
          ? process.stdout.columns
          : undefined;

    return typeof columns === "number" && columns > 0 ? columns : fallbackWidth;
  }

  private truncateLeft(text: string, width: number) {
    if (width <= 0) return "";
    if (text.length <= width) return text;
    if (width === 1) return "…";
    return `…${text.slice(-(width - 1))}`;
  }

  private truncateRight(text: string, width: number) {
    if (width <= 0) return "";
    if (text.length <= width) return text;
    if (width === 1) return "…";
    return `${text.slice(0, width - 1)}…`;
  }

  private writeSegment(line: string[], start: number, text: string, width: number) {
    if (width <= 0) return;
    for (let i = 0; i < width && i < text.length && start + i < line.length; i++) {
      line[start + i] = text[i]!;
    }
  }

  private writeTraceLine(text: string) {
    const data = new TextEncoder().encode(`${text}\n`);
    if (this.platform.io.writeError) {
      this.platform.io.writeError(data);
      return;
    }
    this.platform.io.write(data);
  }

  getName(op: bigint, def = String(op)): string {
    return this.symbols.has(op) ? this.symbols.get(op)! : String(def);
  }

  /**
   * Inspect a value to determine if it's a known word and get its definition.
   * Definitions are returned as tokens that can be recursively inspected.
   */
  inspectValue(value: bigint): ValueInspection {
    const name = this.symbols.get(value);
    const isSystem = value >= 0n && value <= BigInt(MAX_SYSTEM_OP_CODE);
    const def = this.defs.get(value);
    const isDefined = def !== undefined;
    
    // Parse definition into inspectable tokens if it's a user-defined word
    let definition: InspectableToken[] | undefined;
    if (Array.isArray(def)) {
      definition = this.parseDefinitionTokens(def);
    }
    
    // Look up core vocabulary for system words
    let stackEffect: string | undefined;
    let description: string | undefined;
    if (isSystem) {
      const vocabEntry = getCoreVocabularyEntry(Number(value));
      if (vocabEntry) {
        stackEffect = vocabEntry.stackEffect;
        description = vocabEntry.description;
      }
    }
    
    return { value, name, isSystem, isDefined, definition, stackEffect, description };
  }
  
  /**
   * Parse a definition array into inspectable tokens.
   * Definition arrays are in queue format: [tag, value, tag, value, ...]
   */
  private parseDefinitionTokens(def: bigint[]): InspectableToken[] {
    const tokens: InspectableToken[] = [];
    for (let i = 0; i < def.length; i += 2) {
      const tag = def[i] ?? 0n;
      const value = def[i + 1] ?? 0n;
      const isCall = tag === Q_CALL;
      const tokenName = isCall ? this.symbols.get(value) : undefined;
      const isDefined = this.defs.has(value);
      
      tokens.push({
        value,
        tag,
        name: tokenName,
        isCall,
        isDefined,
      });
    }
    return tokens;
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
