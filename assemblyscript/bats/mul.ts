import { MpZ } from "../src/mp";

function testMul(a: MpZ, b: MpZ): void {
  process.stdout.write(`${a} * ${b} = ${a * b}\n`);
}

testMul(MpZ.from(0x0), MpZ.from(0x0));
testMul(MpZ.from(0x1), MpZ.from(0x1));
testMul(MpZ.from(0x10), MpZ.from(0x10));
testMul(MpZ.from(u32(0xFFFF)), MpZ.from(u32(0xFFFF)));
testMul(MpZ.from(0xFFFFFFFF), MpZ.from(0xFFFFFFFF));

testMul(MpZ.from(-0x10), MpZ.from(-0x10));
testMul(MpZ.from(0x10), MpZ.from(-0x10));
testMul(MpZ.from(-0x10), MpZ.from(0x10));