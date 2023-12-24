import { MpZ } from '../mp';
import { assertSame } from './assertions';

describe('addition', () => {
  it('should add 32bit values', () => {
    assertSame(MpZ.from(0x0) + MpZ.from(0x0), 0);
    assertSame(MpZ.from(0xbe00) + MpZ.from(0x00ef), 0xbeef);
    assertSame(MpZ.from(0xdead0000) + MpZ.from(0x0000beef), 0xdeadbeef);
    assertSame(MpZ.from(0xffffffff) + MpZ.from(0xffffffff), 0x1fffffffe);
  });

  it('should add 64bit values', () => {
    assertSame(
      MpZ.from(u64(0xdeadbeef00000000)) + MpZ.from(0x00000000ffffffff as u64),
      u64(0xdeadbeefffffffff),
    );
    assertSame(
      MpZ.from(0xdead0000ffffffff as u64) + MpZ.from(0x0000beefffffffff as u64),
      u64(0xdeadbef0fffffffe),
    );
  });
});

describe('subtraction', () => {
  assertSame(MpZ.from(0x0) - MpZ.from(0x0), 0x0);
  assertSame(MpZ.from(0xffff) - MpZ.from(0x00ff), 0xff00);
  assertSame(MpZ.from(0xffffffff) - MpZ.from(0x0000ffff), 0xffff0000);
  assertSame(MpZ.from(0xffffff) - MpZ.from(0x00ffff), 0xff0000);
  assertSame(
    MpZ.from(<u64>0xffff_ffff_ffff) - MpZ.from(0xffff as u64),
    0xffffffff0000,
  );
  assertSame(
    MpZ.from(<u64>0xffff_ffff_ffff_ffff) -
      MpZ.from(0xf0f0_f0f0_f0f0_f0f0 as u64),
    0xf0f0f0f0f0f0f0f,
  );
  assertSame(
    MpZ.from(<u64>0x9999_8888_7777_6666) -
      MpZ.from(0x6666_7777_8888_9999 as u64),
    0x33331110eeeecccd,
  );
  assertSame(
    MpZ.from(<u64>0xfedcba987654321) - MpZ.from(0x123456789abcdef as u64),
    0xeca8641fdb97532,
  );
});
