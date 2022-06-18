import { IrInstruction, IROp } from "./ir.ts";
import { OpCodes } from "./opcodes.ts";

const DEF = BigInt(OpCodes.DEF);
const KET = BigInt(OpCodes.KET);
const MARK = BigInt(OpCodes.MARK);
const BRA = BigInt(OpCodes.BRA);
const CALL = BigInt(OpCodes.CALL);
const SWAP = BigInt(OpCodes.SWAP);
const DUP = BigInt(OpCodes.DUP);
const DROP = BigInt(OpCodes.DROP);
const PUSHR = BigInt(OpCodes.PUSHR);
const PULLR = BigInt(OpCodes.PULLR);

const binaryRewrites = [
  [SWAP, SWAP],
  [DUP, DROP],
  [PUSHR, PULLR],
  [BigInt(OpCodes.CLOCK), DROP],
  [BigInt(OpCodes.RND), DROP],
  [BigInt(OpCodes.DEPTH), DROP],
  [BigInt(OpCodes.NOT), BigInt(OpCodes.NOT)],
];

export class Optimizer {
  stats = {
    pre_optimization_ir_size: 0,
    user_defined_anon_defs: 0,
    user_defined_named_defs: 0,
    inlined_calls: 0,
    post_optimization_user_defs: 0,
    post_optimization_ir_size: 0,
  }

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

    this.optimized = this.optimizeIr(this.optimized);
    this.optimized = this.pullDefs(this.optimized);
    this.optimized = this.inlineWords(this.optimized, 1);

    this.defs.forEach((def, key) => {
      def = this.optimizeIr(def);
      this.defs.set(key, def);
    });

    // this.defs.forEach((def, key) => {
    //   def = this.inlineWords(def, 1);
    //   this.defs.set(key, def);
    // });

    this.addReferencedWords(this.optimized);
    this.optimized = this.optimizeIr(this.optimized);

    this.stats.post_optimization_ir_size = this.optimized.length;
    return this.optimized;
  }

  private reset() {
    this.optimized = [];
    this.defs = new Map<BigInt, IrInstruction[]>();
    this.calledWords = new Set<BigInt>();

    this.stats = {
      pre_optimization_ir_size: 0,
      user_defined_anon_defs: 0,
      user_defined_named_defs: 0,
      inlined_calls: 0,
      post_optimization_user_defs: 0,
      post_optimization_ir_size: 0,
    };
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
          this.stats.user_defined_anon_defs++;

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

          // Convert anon def to named def
          def[0].value = MARK;
          def[0].meta ??= {};
          def[0].meta.name = ":";
          def.unshift(n);
          def[def.length - 1].value = DEF;
          def[def.length - 1].meta ??= {};
          def[def.length - 1].meta!.name = ";";

          this.defs.set(n.value, def);
        } else if (i.value === DEF) { // named defs
          this.stats.user_defined_named_defs++;

          const end = ip;
          while (ip-- > 0) {
            const j = _ir[ip];
            if (j.op === IROp.call && j.value === MARK) {
              break;
            }
          }
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
  private optimizeIr(ir: Array<IrInstruction>) {
    const _ir = ir.slice();

    while (true) {
      const len = _ir.length;
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
              _ir[ip].meta ??= {};
              _ir[ip].meta!.name = (p.meta?.name || "").replace(/^\&/, "");
              _ir[ip].meta!.comment = (p.meta?.comment || "").replace(/\&/, "");
            }
          } else {
            binaryRewrites.forEach(([A, B]) => {
              const p = _ir[ip + 1];
              if (i.value === A && p.op === IROp.call && p.value === B) {
                _ir.splice(ip, 2);
                ip--;
              }
            });
          }
        } else if (i.op === IROp.push) {  // N drop no-ops
          const p = _ir[ip + 1];
          if (p.op === IROp.call && p.value === DROP) {
            _ir.splice(ip, 2);
            ip--;
          }
        }

        ip++;
      }

      if (_ir.length >= len) {
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
      ret = ret.flatMap(i => {
        if (i.op === IROp.call && this.defs.has(i.value)) {
          const def = this.defs.get(i.value);
          if (def && (i.meta?.inline || def.length <= (len + 3))) {
            this.stats.inlined_calls++;
            return def.slice(2, -1);
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
    ir.slice().forEach(i => {
      if (i.op === IROp.push && i.meta?.pointer) {
        this.addDef(i.value);
      } else if (i.op === IROp.call) {
        this.addDef(i.value);
      }
    });
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