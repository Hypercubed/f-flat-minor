import { MpZ } from "../src/mp";
import { assertSame } from "../src/assert";

assertSame(MpZ.from(0x0) % MpZ.from(0x1), '0x0');
assertSame(MpZ.from(0x1) % MpZ.from(0x1), '0x0');
assertSame(MpZ.from(0xDEADBEEF) % MpZ.from(0x1), '0x0');
assertSame(MpZ.from('0xDEADBEEFDEADBEEFDEADBEEF') % MpZ.from(0x1), '0x0');

assertSame(MpZ.from(0x2) % MpZ.from(0x2), '0x0');
assertSame(MpZ.from(0x3) % MpZ.from(0x2), '0x1');

assertSame(MpZ.from(0xDEADBEEF) % MpZ.from(0x2), '0x1');
assertSame(MpZ.from(0xFFFFFFFE) % MpZ.from(0xF), '0xE');
assertSame(MpZ.from('0xDEADBEEFDEADBEEFDEADBEEF') % MpZ.from(0x2), '0x1');
assertSame(MpZ.from('0xFFFFFFFFFFFFFFFFFFFFFFFE') % MpZ.from(0xF), '0xE');

assertSame(MpZ.from(123456789) % MpZ.from(100), '0x' + (89).toString(16));
assertSame(MpZ.from(123456789) % MpZ.from(1000), '0x' + (789).toString(16));

assertSame(MpZ.from(10**20 + 7) % MpZ.from(10**20), '0x7');

assertSame(MpZ.from((10**20)) % MpZ.from(7), '0x5'); 
assertSame(MpZ.from(-(10**20)) % MpZ.from(7), '-0x5');  // TODO: check this
assertSame(MpZ.from(-(10**20)) % MpZ.from(-7), '-0x5');  // TODO: check this
assertSame(MpZ.from(-(10**20)) % MpZ.from(-7), '-0x5');