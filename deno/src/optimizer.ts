import { IrInstruction, IROp } from "./ir.ts";
import { OpCodes } from "./opcodes.ts";

const DEF = BigInt(OpCodes.DEF);
const KET = BigInt(OpCodes.KET);
const MARK = BigInt(OpCodes.MARK);
const BRA = BigInt(OpCodes.BRA);
const CALL = BigInt(OpCodes.CALL);

export class Optimizer {
  statsOn = false;
  stats = {
    user_defined_anon_defs: 0,
    user_defined_named_defs: 0,
    inlined_calls: 0,
    post_optimization_user_defs: 0,
  }

  private namedDefs = new Map<BigInt, IrInstruction[]>();
  private anonDefs = new Map<BigInt, IrInstruction[]>();
  private calledWords = new Set<BigInt>();

  private optimized: Array<IrInstruction> = [];

/**
 * It takes an array of IR instructions, and returns an array of optimized IR instructions
 * @param ir - The IR to optimize.
 * @returns The optimized ir.
 */
  optimize(ir: Array<IrInstruction>) {
    this.reset();

    this.stats = {
      user_defined_anon_defs: 0,
      user_defined_named_defs: 0,
      inlined_calls: 0,
      post_optimization_user_defs: 0,
    };

    this.optimized = this.pullDefs(ir);
    this.optimized = this.inlineWords(this.optimized);
    this.optimized = this.optimizeIr(this.optimized);
    this.addReferencedWords(this.optimized);
    return this.optimized;
  }

  private reset() {
    this.optimized = [];
    this.namedDefs = new Map<BigInt, IrInstruction[]>();
    this.anonDefs = new Map<BigInt, IrInstruction[]>();
    this.calledWords = new Set<BigInt>();
  }

/**
 * It removes all user defined functions from the IR and stores them in a map
 * @param ir - Array<IrInstruction>
 * @returns The IR with all the defs pulled out.
 */
  private pullDefs(ir: Array<IrInstruction>) {
    const _ir = ir.slice();

    let ip = 0;
    while (ip < _ir.length) {
      const i = _ir[ip];

      if (i.op === IROp.call) {
        if (i.value === KET) { // anon defs
          this.statsOn && this.stats.user_defined_anon_defs++;

          const end = ip;
          while (ip-- > 0) {
            const j = _ir[ip];
            if (j.op === IROp.call && j.value === BRA) {
              break;
            }
          }
          const n = _ir[ip - 1];
          n.meta ||= {};
          n.meta.pointer = true;

          const def = _ir.splice(ip, end - ip + 1);

          // unwrap anonDefs of length 1
          if (def.length === 3 && def[1].op === IROp.call) {
            n.value = def[1].value;
            n.name = def[1].name;
          } else {
            def[0].value = MARK;
            def[0].name = ":";
            def.unshift(n);
            def[def.length - 1].value = DEF;
            def[def.length - 1].name = ";";
            this.anonDefs.set(n.value, def);
          }
        } else if (i.value === DEF) { // user defs
          this.statsOn && this.stats.user_defined_named_defs++;

          const end = ip;
          while (ip-- > 0) {
            const j = _ir[ip];
            if (j.op === IROp.call && j.value === MARK) {
              break;
            }
          }
          const def = _ir.splice(ip - 1, end - ip + 2);
          ip = ip - 2;
          this.namedDefs.set(def[0].value, def);
        }
      }

      ip++;
    }
    return _ir;
  }

/**
 * It removes no-ops and replaces obvious indirect calls with direct calls
 * @param ir - The IR to optimize
 * @returns The optimized IR.
 */
  private optimizeIr(ir: Array<IrInstruction>) {
    const _ir = ir.slice();

    let ip = 0;
    while (ip < _ir.length) {
      const i = _ir[ip];

      if (i.op === IROp.call) {
        if (i.value === 0n) {  // no-ops
          _ir.splice(ip, 1);
        } else if (i.value === CALL) { // replace obvious indirect calls
          const p = _ir[ip - 1];
          if (p.op === IROp.push) {
            ip--;
            _ir.splice(ip, 1);
            _ir[ip].value = p.value;
            _ir[ip].name = (p.name || "").replace(/^\&/, "");
            _ir[ip].comment = (p.comment || "").replace(/\&/, "");
          }
        }
      }

      ip++;
    }
    return _ir;
  }

/**
 * It removes all `call` instructions that have the `inline` meta flag set, and replaces them with the
 * instructions from the function definition
 * @param ir - Array<IrInstruction>
 * @returns The inlined words.
 */
  private inlineWords(ir: Array<IrInstruction>) {
    const _ir = ir.slice();

    let ip = 0;
    while (ip < _ir.length) {
      const i = _ir[ip];
      if (i.op === IROp.call && i.meta?.inline) {
        const def = this.namedDefs.get(i.value);
        if (def) {
          this.statsOn && this.stats.inlined_calls++;
          _ir.splice(ip, 1, ...def.slice(2, -1));
          ip--;
        }
      }
      ip++;
    }

    return _ir;
  }

/**
 * It adds all the words that are referenced by the IR to the list of words that are defined in the
 * program
 * @param ir - Array<IrInstruction>
 */
  private addReferencedWords(ir: Array<IrInstruction>) {
    for (const i of ir.slice()) {
      if (i.op === IROp.push && i.meta?.pointer) {
        this.addDef(i.value);
      } else if (i.op === IROp.call) {
        this.addDef(i.value);
      }
    }
  }

/**
 * "If the word is not already in the calledWords set, then if it is in the namedDefs or anonDefs map,
 * then add it to the calledWords set, optimize it, inline it, and add it to the optimized array."
 * @param {BigInt} b - The word being called
 * @returns the result of the addReferencedWords function.
 */
  private addDef(b: BigInt) {
    if (!this.calledWords.has(b)) {
      let def = this.namedDefs.get(b) || this.anonDefs.get(b);
      if (def) {
        this.statsOn && this.stats.post_optimization_user_defs++;
        this.calledWords.add(b);
        def = this.optimizeIr(def);
        def = this.inlineWords(def);
        this.optimized.unshift(...def);
        return this.addReferencedWords(def);
      }
    }
  }
}