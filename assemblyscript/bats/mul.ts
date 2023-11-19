import { MpInt } from "../src/mp";

function testMul(a: MpInt, b: MpInt): void {
  const c: MpInt = a.mul(b);

  process.stdout.write(`${a} * ${b} = ${c}\n`);
}

testMul(MpInt.from(0x0), MpInt.from(0x0));
testMul(MpInt.from(0x1), MpInt.from(0x1));
testMul(MpInt.from(0x10), MpInt.from(0x10));
testMul(MpInt.from(u32(0xFFFF)), MpInt.from(u32(0xFFFF)));
testMul(MpInt.from(0xFFFFFFFF), MpInt.from(0xFFFFFFFF));

testMul(MpInt.from(-0x10), MpInt.from(-0x10));
testMul(MpInt.from(0x10), MpInt.from(-0x10));
testMul(MpInt.from(-0x10), MpInt.from(0x10));