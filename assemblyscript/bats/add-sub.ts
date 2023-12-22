import { MpZ } from "../src/mp";
import { assertSame } from "../src/assert";

// ADD
assertSame(MpZ.from(0x0) + MpZ.from(0x0), '0x0');
assertSame(MpZ.from(0xBE00) + MpZ.from(0x00EF), '0xBEEF');
assertSame(MpZ.from(0xDEAD0000) + MpZ.from(0x0000BEEF), '0xDEADBEEF');
assertSame(MpZ.from(0xFFFFFFFF) + MpZ.from(0xFFFFFFFF), '0x1FFFFFFFE');

assertSame(MpZ.from(0xDEADBEEF00000000 as u64) + MpZ.from(0x00000000FFFFFFFF as u64), '0xDEADBEEFFFFFFFFF');
assertSame(MpZ.from(0xDEAD0000FFFFFFFF as u64) + MpZ.from(0x0000BEEFFFFFFFFF as u64), '0xDEADBEF0FFFFFFFE');

// SUB
assertSame(MpZ.from(0x0) - MpZ.from(0x0), '0x0');
assertSame(MpZ.from(0xFFFF) - MpZ.from(0x00FF), '0xFF00');
assertSame(MpZ.from(0xFFFFFFFF) - MpZ.from(0x0000FFFF), '0xFFFF0000');
assertSame(MpZ.from(0xFFFFFF) - MpZ.from(0x00FFFF), '0xFF0000');
assertSame(MpZ.from(<u64>0xFFFF_FFFF_FFFF) - MpZ.from(0xFFFF as u64), '0xFFFFFFFF0000');
assertSame(MpZ.from(<u64>0xFFFF_FFFF_FFFF_FFFF) - MpZ.from(0xF0F0_F0F0_F0F0_F0F0 as u64), '0xF0F0F0F0F0F0F0F');
assertSame(MpZ.from(<u64>0x9999_8888_7777_6666) - MpZ.from(0x6666_7777_8888_9999 as u64), '0x33331110EEEECCCD');
assertSame(MpZ.from(<u64>0xFEDCBA987654321) - MpZ.from(0x123456789ABCDEF as u64), '0xECA8641FDB97532');