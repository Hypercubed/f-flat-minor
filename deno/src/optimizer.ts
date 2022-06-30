import { IrInstruction, IROp } from "./ir.ts";
import { OpCodes } from "./opcodes.ts";

const DEF = BigInt(OpCodes.DEF);
const KET = BigInt(OpCodes.KET);
const MARK = BigInt(OpCodes.MARK);
const BRA = BigInt(OpCodes.BRA);

const Call = (op: number | bigint) => {
  op = BigInt(op);
  return (inst: IrInstruction) => inst.op === IROp.call && inst.value === op;
};

const Push = (value: number | bigint) => {
  value = BigInt(value);
  return (inst: IrInstruction) => inst.op === IROp.push && inst.value === value;
};

const PushAny = (inst: IrInstruction) => inst.op === IROp.push;
const PushNz = (inst: IrInstruction) =>
  inst.op === IROp.push && inst.value !== 0n;

interface Rule {
  name?: string;
  pattern: Array<(inst: IrInstruction) => boolean>;
  replacement: (...args: IrInstruction[]) => IrInstruction[];
}

const rules: Rule[] = [
  {
    name: "No operation",
    pattern: [Call(OpCodes.NOP)], // No operation
    replacement: () => [],
  },
  {
    name: "Null Sequence - SWAP SWAP",
    pattern: [Call(OpCodes.SWAP), Call(OpCodes.SWAP)],
    replacement: () => [],
  },
  {
    name: "Null Sequence - DUP DROP",
    pattern: [Call(OpCodes.DUP), Call(OpCodes.DROP)],
    replacement: () => [],
  },
  {
    name: "Null Sequence - PUSHR PULLR",
    pattern: [Call(OpCodes.PUSHR), Call(OpCodes.PULLR)],
    replacement: () => [],
  },
  {
    name: "Null Sequence - CLOCK DROP",
    pattern: [Call(OpCodes.CLOCK), Call(OpCodes.DROP)],
    replacement: () => [],
  },
  {
    name: "Null Sequence - RAND DROP",
    pattern: [Call(OpCodes.RAND), Call(OpCodes.DROP)],
    replacement: () => [],
  },
  {
    name: "Null Sequence - DEPTH DROP",
    pattern: [Call(OpCodes.DEPTH), Call(OpCodes.DROP)],
    replacement: () => [],
  },
  {
    name: "Algebraic Simplification - NOT NOT",
    pattern: [Call(OpCodes.NOT), Call(OpCodes.NOT)],
    replacement: () => [],
  },
  {
    name: "Indirect calls - n EVAL",
    pattern: [PushAny, Call(OpCodes.CALL)],
    replacement: (a) => [
      {
        op: IROp.call,
        value: a.value,
        meta: { name: a.meta?.name?.replace(/^&/, "") },
      },
    ],
  },
  {
    name: "Null Sequence - n DROP",
    pattern: [PushAny, Call(OpCodes.DROP)],
    replacement: () => [],
  },
  {
    name: "Algebraic Simplification - a b ADD",
    pattern: [PushAny, PushAny, Call(OpCodes.ADD)],
    replacement: (a, b) => [{ op: IROp.push, value: a.value + b.value }],
  },
  {
    name: "Algebraic Simplification - a b SUB",
    pattern: [PushAny, PushAny, Call(OpCodes.SUB)],
    replacement: (a, b) => [{ op: IROp.push, value: a.value - b.value }],
  },
  {
    name: "Algebraic Simplification - a b MUL",
    pattern: [PushAny, PushAny, Call(OpCodes.MUL)],
    replacement: (a, b) => [{ op: IROp.push, value: a.value * b.value }],
  },
  {
    name: "Algebraic Simplification - a b DIV",
    pattern: [PushAny, PushNz, Call(OpCodes.DIV)],
    replacement: (a, b) => [{ op: IROp.push, value: a.value / b.value }],
  },
  {
    name: "Constant propagation - a DUP",
    pattern: [PushAny, Call(OpCodes.DUP)],
    replacement: (a) => [a, a],
  },
  {
    name: "Unreachable Code - 0 &b IF",
    pattern: [Push(0), PushAny, Call(OpCodes.IF)],
    replacement: () => [],
  },
  {
    name: "Flows-Of-Control Optimizations - !0 &b IF",
    pattern: [PushNz, PushAny, Call(OpCodes.IF)],
    replacement: (_a, b, _c) => [
      {
        op: IROp.call,
        value: b.value,
        meta: { name: b.meta?.name?.replace(/^&/, "") },
      },
    ],
  },
  // ∗ 2^n -> n <<
  // / 2^n -> n >>
];

export class Optimizer {
  stats = {
    pre_optimization_ir_size: 0,
    post_optimization_ir_size: 0,
    user_defined_anon_defs: 0,
    user_defined_named_defs: 0,
    post_optimization_user_defs: 0,
    inlined_calls: 0,
    peephole_optimizations: 0,
    optimization_passes: 0
  };

  minOptPasses = 2;
  maxOptPasses = 20;

  private defs = new Map<BigInt, IrInstruction[]>();
  private calledWords = new Set<BigInt>();

  private optimized: Array<IrInstruction> = [];

  /**
   * It takes an array of IR instructions, and returns an array of optimized IR instructions
   * @param ir - The IR to optimize.
   * @returns The optimized ir.
   */
  optimize(ir: Array<IrInstruction>) {
    this.reset();

    this.stats.pre_optimization_ir_size = ir.length;

    this.optimized = ir;

    let len;

    do {
      len = this.optimized.length;
      this.optLoop();
    } while((this.optimized.length < len || this.stats.optimization_passes < this.minOptPasses) && this.stats.optimization_passes < this.maxOptPasses);

    this.optimized = this.pullDefs(this.optimized);
    this.optimized = this.addReferencedWords(this.optimized);

    this.stats.post_optimization_ir_size = this.optimized.length;
    return this.optimized;
  }

  private optLoop() {
    this.optimized = this.peepholeOptimization(this.optimized);
    this.optimized = this.getDefs(this.optimized);
    this.optimized = this.inlineWords(this.optimized, 4);
    this.stats.optimization_passes++;
  }

  private reset() {
    this.optimized = [];
    this.defs = new Map<BigInt, IrInstruction[]>();
    this.calledWords = new Set<BigInt>();

    this.stats = {
      pre_optimization_ir_size: 0,
      post_optimization_ir_size: 0,
      user_defined_anon_defs: 0,
      user_defined_named_defs: 0,
      post_optimization_user_defs: 0,
      inlined_calls: 0,
      peephole_optimizations: 0,
      optimization_passes: 0
    };
  }

  private getDefs(ir: Array<IrInstruction>) {
    let ip = 0;

    while (ip < ir.length) {
      const i = ir[ip];
      if (i.op === IROp.call) {
        if (i.value === KET) {
          // anon defs
          if (this.stats.optimization_passes === 0) {
            this.stats.user_defined_anon_defs++;
          }

          let pi = ip;
          while (pi-- > 0) {
            const j = ir[pi];
            if (j.op === IROp.call && j.value === BRA) break;
          }
          const n = ir[pi - 1];
          n.meta ||= {};
          n.meta.pointer = true;

          const def = ir.slice(pi, ip + 1);

          // Convert anon def to named def
          def[0] = {
            ...def[0],
            value: MARK,
            meta: {
              ...def[0].meta,
              name: ":",
            },
          };
          def.unshift(n);
          def[def.length - 1] = {
            ...def[def.length - 1],
            value: DEF,
            meta: {
              ...def[def.length - 1].meta,
              name: ";",
            },
          };

          this.defs.set(n.value, def);
        } else if (i.value === DEF) {
          // named defs
          if (this.stats.optimization_passes === 0) {
            this.stats.user_defined_named_defs++;
          }

          let pi = ip;
          while (pi-- > 0) {
            const j = ir[pi];
            if (j.op === IROp.call && j.value === MARK) break;
          }
          const n = ir[pi - 1];
          n.meta ||= {};
          n.meta.pointer = true;

          const def = ir.slice(pi - 1, ip + 1);
          this.defs.set(n.value, def);
        }
      }
      ip++;
    }

    return ir;
  }

  /**
   * Removes all user defined functions from the IR and stores them in a map
   * @param ir - Array<IrInstruction>
   * @returns The IR with all the defs pulled out.
   */
  private pullDefs(ir: Array<IrInstruction>) {
    const _ir = ir.slice();

    let ip = 0;
    while (ip < _ir.length) {
      const i = _ir[ip];

      if (i.op === IROp.call) {
        if (i.value === KET) {
          // anon defs
          const end = ip;
          while (ip-- > 0) {
            const j = _ir[ip];
            if (j.op === IROp.call && j.value === BRA) break;
          }
          const n = _ir[ip - 1];
          n.meta ||= {};
          n.meta.pointer = true;

          const def = _ir.splice(ip, end - ip + 1);

          // Convert anon def to named def
          def[0] = {
            ...def[0],
            value: MARK,
            meta: {
              ...def[0].meta,
              name: ":",
            },
          };
          def.unshift(n);
          def[def.length - 1] = {
            ...def[def.length - 1],
            value: DEF,
            meta: {
              ...def[def.length - 1].meta,
              name: ";",
            },
          };

          this.defs.set(n.value, def);
        } else if (i.value === DEF) {
          // named defs
          const end = ip;
          while (ip-- > 0) {
            const j = _ir[ip];
            if (j.op === IROp.call && j.value === MARK) break;
          }
          const n = _ir[ip - 1];
          n.meta ||= {};
          n.meta.pointer = true;

          const def = _ir.splice(ip - 1, end - ip + 2);
          ip = ip - 2;

          this.defs.set(def[0].value, def);
        }
      }

      ip++;
    }
    return _ir;
  }

  /**
   * Removes no-ops and replaces obvious indirect calls with direct calls
   * @param ir - The IR to optimize
   * @returns The optimized IR.
   */
  private peepholeOptimization(ir: Array<IrInstruction>) {
    const _ir = ir.slice();

    while (true) {
      const startCount = this.stats.peephole_optimizations;
      const len = _ir.length;
      let ip = 0;
      while (ip < _ir.length) {
        for (const rule of rules) {
          const pattern = rule.pattern;
          const replacement = rule.replacement;
          const match = pattern.every((fn, i) => fn(_ir[ip + i]));
          if (match) {
            this.stats.peephole_optimizations++;
            const args = _ir.slice(ip, ip + pattern.length);
            _ir.splice(ip, pattern.length, ...replacement(...args));
            ip = Math.max(0, ip - 4);
            break;
          }
        }

        ip++;
      }

      if (this.stats.peephole_optimizations >= startCount) {
        break;
      }
    }

    return _ir;
  }

  /**
   * Inlines all `calls` that have the `inline` meta flag set or a ir length of len or less
   * @param ir - Array<IrInstruction>
   * @returns The inlined words.
   */
  private inlineWords(ir: Array<IrInstruction>, len = 1) {
    let ret = ir;
    // do {
    ret = ret.flatMap((i) => {
      if (i.op === IROp.call && this.defs.has(i.value)) {
        const def = this.defs.get(i.value);
        if (def && !def[def.length - 1].meta?.unsafe) {
          if (def[def.length - 1].meta?.inline) {
            this.stats.inlined_calls++;
            return this.inlineWords(def.slice(2, -1), Infinity);
          }
          if (i.meta?.inline) {
            this.stats.inlined_calls++;
            return this.inlineWords(def.slice(2, -1), Infinity);
          }
          if (def.length <= len + 3 && !i.meta?.unsafe) {
            this.stats.inlined_calls++;
            return def.slice(2, -1);
          }
        }
      }
      return i;
    });
    // } while(ret.length !== ir.length);  // todo: catch run away loop
    return ret;
  }

  /**
   * It adds all the words that are referenced by the IR to the list of words that are defined in the
   * program
   * @param ir - Array<IrInstruction>
   */
  private addReferencedWords(ir: Array<IrInstruction>) {
    ir.slice().forEach((i) => {
      if (i.op === IROp.push && i.meta?.pointer) {
        this.addDef(i.value);
      } else if (i.op === IROp.call) {
        this.addDef(i.value);
      }
    });
    return ir;
  }

  /**
   * "If the word is not already in the calledWords set, then if it is in the namedDefs or anonDefs map,
   * then add it to the calledWords set, optimize it, inline it, and add it to the optimized array."
   * @param {BigInt} b - The word being called
   * @returns the result of the addReferencedWords function.
   */
  private addDef(b: BigInt) {
    if (!this.calledWords.has(b)) {
      const def = this.defs.get(b);
      if (def) {
        this.stats.post_optimization_user_defs++;
        this.calledWords.add(b);
        this.optimized.unshift(...def);
        return this.addReferencedWords(def);
      }
    }
  }
}
