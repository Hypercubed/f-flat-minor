import { MpZ } from "../src/mp";

function testPow(a: MpZ, b: MpZ): void {
  process.stdout.write(`${a} ^ ${b} = ${a ** b}\n`);
}

testPow(MpZ.from(0x0), MpZ.from(0x1));
testPow(MpZ.from(0x1), MpZ.from(0x1));
testPow(MpZ.from(0xDEADBEEF), MpZ.ONE);

testPow(MpZ.from(0x0), MpZ.from(0x2));
testPow(MpZ.from(0x1), MpZ.from(0x2));
testPow(MpZ.from(0xDEADBEEF), MpZ.from(0x2));

process.stdout.write(`(((5^4)^3)^2)^1 = ${MpZ.from(5).pow(4).pow(3).pow(2).pow(1)}\n`);

const p = MpZ.from(5) ** MpZ.from(4) ** MpZ.from(3) ** MpZ.from(2) ** MpZ.from(1);
const s = p.toString();
const f = s.substring(0, 10);
const e = s.substring(s.length - 10);
process.stdout.write(`5^4^3^2^1 = ${f}...${e}\n`);