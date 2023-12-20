import { MpZ } from "../src/mp";

function fact(n: u32): MpZ {
  let a = MpZ.from(1);
  for (let i: u32 = 1; i <= n; ++i) {
    a *= MpZ.from(i);
  }
  return a;
}

const p = MpZ.from(5).pow(MpZ.from(4).pow(3).pow(2).pow(1));

process.stdout.write(`0xDEADBEEF = ${MpZ.from('0xDEADBEEF').toDecimal()}\n`);
process.stdout.write(`100! = ${fact(100).toDecimal()}\n`);
process.stdout.write(`5^(4^3^2^1) = ${p.toDecimal()}\n`);
process.stdout.write(`10^10 = ${MpZ.from('10000000000').toDecimal()}\n`);