import { IrInstruction, IROp } from "./ir.ts";
import { OpCodes } from "./opcodes.ts";

const DEF = BigInt(OpCodes.DEF);
const KET = BigInt(OpCodes.KET);
const MARK = BigInt(OpCodes.MARK);
const BRA = BigInt(OpCodes.BRA);
const CALL = BigInt(OpCodes.CALL);

export class Optimizer {
  optimizeIr(ir: Array<IrInstruction>) {
    const optimized = ir.slice();

    const userDefs = new Set<IrInstruction[]>();
    const inlineDefs = new Set<IrInstruction[]>();

    const maybeCalled = new Set<BigInt>();
    
    let ip = -1;
    while (ip < optimized.length) {
      const i = optimized[++ip];
      if (!i) continue;

      maybeCalled.add(i.value);

      if (i.op === IROp.call) {
        if (i.value === 0n) {  // no-ops
          optimized.splice(ip, 1);
          continue;
        }
        
        if (i.value === KET) { // inline defs
          const end = ip;
          while (ip-- > 0) {
            const j = optimized[ip];
            if (j.op === IROp.call && j.value === BRA) {
              break;
            }
          }
          const n = optimized[ip - 1];

          const def = optimized.splice(ip, end - ip + 1);

          // unwrap inlineDefs of length 1
          if (def.length === 3 && def[1].op === IROp.call) {
            n.value = def[1].value;
            n.name = def[1].name;
            maybeCalled.add(def[1].value);
          } else {
            def[0].value = MARK;
            def[0].name = ":";
            def.unshift(n);
            def[def.length - 1].value = DEF;
            def[def.length - 1].name = ";";
            inlineDefs.add(def);
            maybeCalled.add(def[0].value);
          }
        } else if (i.value === DEF) { // user defs
          const end = ip;
          while (ip-- > 0) {
            const j = optimized[ip];
            if (j.op === IROp.call && j.value === MARK) {
              break;
            }
          }
          const def = optimized.splice(ip - 1, end - ip + 2);
          ip = ip - 2;
          userDefs.add(def);
        } else if (i.value === CALL) { // replace indirect calls
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
    }
 
    // Add hoisted inline defs
    inlineDefs.forEach(def => {
      optimized.unshift(...def);
    });

    // Add hoisted user defs
    userDefs.forEach(def => {
      if (maybeCalled.has(def[0].value)) {
        optimized.unshift(...def);
      }
    });

    return optimized;
  }
}