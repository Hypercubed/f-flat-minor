import { MpZ } from "../src/mp";

const n = 100;
let a = MpZ.from(0x1);
for (let i: i32 = 1; i <= n; ++i) {
  a *= MpZ.from(i);
}

process.stdout.write(`${n}! = ${a}\n`);