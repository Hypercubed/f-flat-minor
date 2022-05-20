import { IrInstruction } from './compiler.ts';

export function printIr(ir: Array<IrInstruction>) {
  ir.forEach((i) => {
    const o = '.' + i.op.padEnd(6, ' ');
    const n = ('' + i.value).padEnd(5, ' ');
    const c = i.comment ? `/* ${i.comment} */` : '';
    console.log(n, o, c);
  });
}
