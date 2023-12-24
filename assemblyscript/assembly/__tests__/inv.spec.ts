import { MpZ } from '../mp';
import { assertSame } from './assertions';

describe('inv', () => {
  it('retrun correct results', () => {
    assertSame(MpZ.from(0x1).inv(0), 0x1);
    assertSame(MpZ.from(0x1).inv(1), 0x2);
    assertSame(MpZ.from(0x1).inv(4), 0x10);
    assertSame(MpZ.from(0x1).inv(8), 0x100);
    assertSame(MpZ.from(0x1).inv(16), 0x10000);
    assertSame(MpZ.from(0x1).inv(32), 0x100000000);
    assertSame(MpZ.from(0x1).inv(64), '18446744073709551616');

    assertSame(MpZ.from(0xbeef).inv(16), 0x1);
    assertSame(MpZ.from(0xbeef).inv(32), 0x1573d);
    assertSame(MpZ.from(0xbeef).inv(64), 0x1573d609ab149);

    assertSame(MpZ.from(0xdeadbeef).inv(16), 0x0);
    assertSame(MpZ.from(0xdeadbeef).inv(32), 0x1);
    assertSame(MpZ.from(0xdeadbeef).inv(64), 0x1264eb565);
  });
});
