import { MpInt } from "../src/mp";

function testAdd(a: MpInt, b: MpInt): void {
  const c: MpInt = a.add(b);

  process.stdout.write(`${a} + ${b} = ${c}\n`);
}

testAdd(MpInt.from(0x0), MpInt.from(0x0));
testAdd(MpInt.from(0xBE00), MpInt.from(0x00EF));
testAdd(MpInt.from(0xDEAD0000), MpInt.from(0x0000BEEF));
testAdd(MpInt.from(0xFFFFFFFF), MpInt.from(0xFFFFFFFF));

testAdd(MpInt.from(0xDEADBEEF00000000 as u64), MpInt.from(0x00000000FFFFFFFF as u64));
testAdd(MpInt.from(0xDEAD0000FFFFFFFF as u64), MpInt.from(0x0000BEEFFFFFFFFF as u64));