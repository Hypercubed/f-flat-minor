import { MpZ } from "../src/mp";
import { assertSame } from "../src/assert";

assertSame(MpZ.from(0x1).inv(0), '0x1');
assertSame(MpZ.from(0x1).inv(1), '0x2');
assertSame(MpZ.from(0x1).inv(4), '0x10');
assertSame(MpZ.from(0x1).inv(8), '0x100');
assertSame(MpZ.from(0x1).inv(16), '0x10000');
assertSame(MpZ.from(0x1).inv(32), '0x100000000');
assertSame(MpZ.from(0x1).inv(64), '0x10000000000000000');

assertSame(MpZ.from(0xBEEF).inv(16), '0x1');
assertSame(MpZ.from(0xBEEF).inv(32), '0x1573D');
assertSame(MpZ.from(0xBEEF).inv(64), '0x1573D609AB149');

assertSame(MpZ.from(0xDEADBEEF).inv(16), '0x0');
assertSame(MpZ.from(0xDEADBEEF).inv(32), '0x1');
assertSame(MpZ.from(0xDEADBEEF).inv(64), '0x1264EB565');
