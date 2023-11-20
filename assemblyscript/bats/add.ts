import { MpZ } from "../src/mp";

function testAdd(a: MpZ, b: MpZ): void {
  process.stdout.write(`${a} + ${b} = ${a + b}\n`);
}

testAdd(MpZ.from(0x0), MpZ.from(0x0));
testAdd(MpZ.from(0xBE00), MpZ.from(0x00EF));
testAdd(MpZ.from(0xDEAD0000), MpZ.from(0x0000BEEF));
testAdd(MpZ.from(0xFFFFFFFF), MpZ.from(0xFFFFFFFF));

testAdd(MpZ.from(0xDEADBEEF00000000 as u64), MpZ.from(0x00000000FFFFFFFF as u64));
testAdd(MpZ.from(0xDEAD0000FFFFFFFF as u64), MpZ.from(0x0000BEEFFFFFFFFF as u64));