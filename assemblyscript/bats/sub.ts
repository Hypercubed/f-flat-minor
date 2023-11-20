import { MpZ } from "../src/mp";

function testSub(a: MpZ, b: MpZ): void {
  process.stdout.write(`${a} - ${b} = ${a - b}\n`);
}

testSub(MpZ.from(0x0), MpZ.from(0x0));
testSub(MpZ.from(0xFFFF), MpZ.from(0x00FF));
testSub(MpZ.from(0xFFFFFFFF), MpZ.from(0x0000FFFF));
testSub(MpZ.from(0xFFFFFF), MpZ.from(0x00FFFF));
testSub(MpZ.from(<u64>0xFFFF_FFFF_FFFF), MpZ.from(0xFFFF as u64));
testSub(MpZ.from(<u64>0xFFFF_FFFF_FFFF_FFFF), MpZ.from(0xF0F0_F0F0_F0F0_F0F0 as u64));
testSub(MpZ.from(<u64>0x9999_8888_7777_6666), MpZ.from(0x6666_7777_8888_9999 as u64));
testSub(MpZ.from(<u64>0xFEDCBA987654321), MpZ.from(0x123456789ABCDEF as u64));