import { MpZ } from '../mp';
import { assertSame } from './assertions';

describe('shift', () => {
  it('left shift', () => {
    assertSame(MpZ.from('0x1') << 1, 2);
    assertSame(
      MpZ.from('0x1234567890ABCDEF') << 0,
      MpZ.from('0x1234567890ABCDEF'),
    );
    assertSame(
      MpZ.from('0x1234567890ABCDEF') << 4,
      MpZ.from('0x1234567890ABCDEF0'),
    );
    assertSame(
      MpZ.from('0x1234567890ABCDEF') << 8,
      MpZ.from('0x1234567890ABCDEF00'),
    );
    assertSame(
      MpZ.from('0x1234567890ABCDEF') << 32,
      MpZ.from('0x1234567890ABCDEF00000000'),
    );
    assertSame(
      MpZ.from('0x1234567890ABCDEF') << 64,
      MpZ.from('0x1234567890ABCDEF0000000000000000'),
    );
    assertSame(
      MpZ.from('0x1234567890ABCDEF') << 128,
      MpZ.from('0x1234567890ABCDEF00000000000000000000000000000000'),
    );
  });

  it('right shift', () => {
    assertSame(MpZ.from('0x2') >> 0x1, 1);
    assertSame(MpZ.from('0x1234567890ABCDEF') >> 0, 0x1234567890abcdef);
    assertSame(MpZ.from('0x1234567890ABCDEF') >> 4, 0x1234567890abcde);
    assertSame(MpZ.from('0x1234567890ABCDEF') >> 8, 0x1234567890abcd);
    assertSame(MpZ.from('0x1234567890ABCDEF') >> 32, 0x12345678);
    assertSame(MpZ.from('0x1234567890ABCDEF') >> 64, 0);

    assertSame(
      MpZ.from('0x1234567890ABCDEF00000000000000000000000000000000') >> 0,
      MpZ.from('0x1234567890ABCDEF00000000000000000000000000000000'),
    );
    assertSame(
      MpZ.from('0x1234567890ABCDEF00000000000000000000000000000000') >> 4,
      MpZ.from('0x1234567890ABCDEF0000000000000000000000000000000'),
    );
    assertSame(
      MpZ.from('0x1234567890ABCDEF00000000000000000000000000000000') >> 8,
      MpZ.from('0x1234567890ABCDEF000000000000000000000000000000'),
    );
    assertSame(
      MpZ.from('0x1234567890ABCDEF00000000000000000000000000000000') >> 32,
      MpZ.from('0x1234567890ABCDEF000000000000000000000000'),
    );
    assertSame(
      MpZ.from('0x1234567890ABCDEF00000000000000000000000000000000') >> 64,
      MpZ.from('0x1234567890ABCDEF0000000000000000'),
    );
    assertSame(
      MpZ.from('0x1234567890ABCDEF00000000000000000000000000000000') >> 128,
      0x1234567890abcdef,
    );
  });
});
