import { MpInt } from "../src/mp";

function testSub(a: MpInt, b: MpInt): void {
  const c: MpInt = a.sub(b);

  process.stdout.write(`${a} - ${b} = ${c}\n`);
}

testSub(MpInt.from(0x0), MpInt.from(0x0));
testSub(MpInt.from(0xFFFF), MpInt.from(0x00FF));
testSub(MpInt.from(0xFFFFFFFF), MpInt.from(0x0000FFFF));
testSub(MpInt.from(0xFFFFFF), MpInt.from(0x00FFFF));
testSub(MpInt.from(<u64>0xFFFF_FFFF_FFFF), MpInt.from(0xFFFF as u64));
testSub(MpInt.from(<u64>0xFFFF_FFFF_FFFF_FFFF), MpInt.from(0xF0F0_F0F0_F0F0_F0F0 as u64));
testSub(MpInt.from(<u64>0x9999_8888_7777_6666), MpInt.from(0x6666_7777_8888_9999 as u64));
testSub(MpInt.from(<u64>0xFEDCBA987654321), MpInt.from(0x123456789ABCDEF as u64));