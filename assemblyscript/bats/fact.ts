import { MpInt } from "../src/mp";

const n = 120;
let a = MpInt.from(0x1);
for (let i: i32 = 1; i <= n; ++i) {
  a = a.mul(MpInt.from(i));
}

process.stdout.write(`${n}! = ${a}\n`);