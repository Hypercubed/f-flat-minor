import { MpZ } from '../mp';
import { assertSame } from './assertions';

describe('mul', () => {
  it('retrun correct results', () => {
    assertSame(MpZ.from(0x0) * MpZ.from(0x0), 0);
    assertSame(MpZ.from(0x1) * MpZ.from(0x1), 1);
    assertSame(MpZ.from(0x10) * MpZ.from(0x10), 0x100);
    assertSame(MpZ.from(u32(0xffff)) * MpZ.from(u32(0xffff)), 0xFFFE0001);
    assertSame(
      MpZ.from(0xffffffff) * MpZ.from(0xffffffff),
      MpZ.from('0xFFFFFFFE00000001'),
    );
  });
});

describe('div', () => {
  it('retrun correct results', () => {
    assertSame(MpZ.from(-0x10) * MpZ.from(-0x10), 0x100);
    assertSame(MpZ.from(0x10) * MpZ.from(-0x10), -0x100);
    assertSame(MpZ.from(-0x10) * MpZ.from(0x10), -0x100);
  });
});
