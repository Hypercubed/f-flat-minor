import { MpZ } from "../src/mp";

function fact(n: u32): MpZ {
  let a = MpZ.from(1);
  for (let i: u32 = 1; i <= n; ++i) {
    a *= MpZ.from(i);
  }
  return a;
}

process.stdout.write(`100! = ${fact(100)}\n`);
process.stdout.write(`100!/99! = ${fact(100) / fact(99)}\n`);
process.stdout.write(`1000!/999! = ${fact(1000) / fact(999)}\n`);
process.stdout.write(`100!/9! = ${fact(100) / fact(9)}\n`);

process.stdout.write(`1000!/500! = ${fact(1000) / fact(500)}\n`);
