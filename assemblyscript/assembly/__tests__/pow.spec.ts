import { MpZ } from '../mp';
import { assertSame } from './assertions';

describe('pow', () => {
  it('retrun correct results', () => {
    assertSame(MpZ.from(0x0) ** MpZ.from(0x1), 0);
    assertSame(MpZ.from(0x1) ** MpZ.from(0x1), 1);
    assertSame(MpZ.from(0xdeadbeef) ** MpZ.ONE, 0xdeadbeef);

    assertSame(MpZ.from(0x0) ** MpZ.from(0x2), 0);
    assertSame(MpZ.from(0x1) ** MpZ.from(0x2), 1);
    assertSame(
      MpZ.from(0xdeadbeef) ** MpZ.from(0x2),
      MpZ.from('0xC1B1CD12216DA321'),
    );

    assertSame(
      MpZ.from(5).pow(4).pow(3).pow(2).pow(1),
      MpZ.from('0xD3C21BCECCEDA1'),
    );
  });
});
