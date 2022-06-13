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

  optimizeIr(ir: Array<IrInstruction>) {
    // deno-lint-ignore no-this-alias
    const self = this;
    
    const optimized = ir.slice();

    const namedDefs = new Map<BigInt, IrInstruction[]>();
    const anonDefs = new Map<BigInt, IrInstruction[]>();

    const calledWords = new Set<BigInt>();
    
    let ip = 0;
    while (ip < optimized.length) {
      const i = optimized[ip];

      if (i.op === IROp.call) {
        if (i.value === 0n) {  // no-ops
          optimized.splice(ip, 1);
        } else if (i.value === KET) { // anon defs
          this.statsOn && this.stats.user_defined_anon_defs++;

          const end = ip;
          while (ip-- > 0) {
            const j = optimized[ip];
            if (j.op === IROp.call && j.value === BRA) {
              break;
            }
          }
          const n = optimized[ip - 1];
          n.meta ||= {};
          n.meta.pointer = true;

          const def = optimized.splice(ip, end - ip + 1);

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
            anonDefs.set(n.value, def);
          }
        } else if (i.value === DEF) { // user defs
          this.statsOn && this.stats.user_defined_named_defs++;

          const end = ip;
          while (ip-- > 0) {
            const j = optimized[ip];
            if (j.op === IROp.call && j.value === MARK) {
              break;
            }
          }
          const def = optimized.splice(ip - 1, end - ip + 2);
          ip = ip - 2;
          namedDefs.set(def[0].value, def);
        } else if (i.value === CALL) { // replace obvious indirect calls
          const p = optimized[ip - 1];
          if (p.op === IROp.push) {
            ip--;
            optimized.splice(ip, 1);
            optimized[ip].value = p.value;
            optimized[ip].name = (p.name || "").replace(/^\&/, "");
            optimized[ip].comment = (p.comment || "").replace(/\&/, "");
          }
        }
      }

      ip++;
    }

    // Inline defs marked as inline
    ip = 0;
    while (ip < optimized.length) {
      const i = optimized[ip];
      if (i.op === IROp.call && i.meta?.inline) {
        const def = namedDefs.get(i.value);
        if (def) {
          this.statsOn && this.stats.inlined_calls++;
          optimized.splice(ip, 1, ...def.slice(2, -1));
          ip--;
        }
      }
      ip++;
    }

    appReferencedWords(optimized);
    return optimized;

    function appReferencedWords(_ir: Array<IrInstruction>) {
      for (const i of _ir.slice()) {
        if (i.op === IROp.push && i.meta?.pointer) {
          addDef(i.value);
        } else if (i.op === IROp.call) {
          addDef(i.value);
        }
      }
    }

    function addDef(b: BigInt) {
      if (!calledWords.has(b)) {
        const def = namedDefs.get(b) || anonDefs.get(b);
        if (def) {
          self.statsOn && self.stats.post_optimization_user_defs++;
          calledWords.add(b);
          optimized.unshift(...def);
          return appReferencedWords(def);
        }    
      }
    }
  }
}