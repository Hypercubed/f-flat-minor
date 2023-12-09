import { MpZ } from "../src/mp";

function testMod(a: MpZ, b: MpZ): void {
  process.stdout.write(`${a} % ${b} = ${a % b}\n`);
}

testMod(MpZ.from(0x0), MpZ.from(0x1));
testMod(MpZ.from(0x1), MpZ.from(0x1));
testMod(MpZ.from(0xDEADBEEF), MpZ.from(0x1));
testMod(MpZ.from('0xDEADBEEFDEADBEEFDEADBEEF'), MpZ.from(0x1));

testMod(MpZ.from(0x2), MpZ.from(0x1));
testMod(MpZ.from(0x2), MpZ.from(0x2));

testMod(MpZ.from(0x3), MpZ.from(0x2));

testMod(MpZ.from(0xDEADBEEF), MpZ.from(0x2));
testMod(MpZ.from(0xFFFFFFFE), MpZ.from(0xF));
testMod(MpZ.from('0xDEADBEEFDEADBEEFDEADBEEF'), MpZ.from(0x2));
testMod(MpZ.from('0xFFFFFFFFFFFFFFFFFFFFFFFE'), MpZ.from(0xF));

testMod(MpZ.from(123456789), MpZ.from(100));
testMod(MpZ.from(123456789), MpZ.from(1000));

testMod(MpZ.from(10**20 + 7), MpZ.from(10**20));
testMod(MpZ.from(-(10**20)), MpZ.from(7));   // 5
testMod(MpZ.from(-(10**20)), MpZ.from(-7));  // -5