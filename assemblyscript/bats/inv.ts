import { MpZ } from "../src/mp";

function testInv(a: MpZ, k: u32): void {
  process.stdout.write(`2**${k}/${a} = ${a.inv(k)}\n`);
}

testInv(MpZ.from(0x1), 0);
testInv(MpZ.from(0x1), 1);
testInv(MpZ.from(0x1), 4);
testInv(MpZ.from(0x1), 8);
testInv(MpZ.from(0x1), 16);
testInv(MpZ.from(0x1), 32);
testInv(MpZ.from(0x1), 64);

testInv(MpZ.from(0xBEEF), 16);
testInv(MpZ.from(0xBEEF), 32);
testInv(MpZ.from(0xBEEF), 64);

testInv(MpZ.from(0xDEADBEEF), 16);
testInv(MpZ.from(0xDEADBEEF), 32);
testInv(MpZ.from(0xDEADBEEF), 64);
