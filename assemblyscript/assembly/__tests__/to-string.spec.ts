import { MpZ } from '../mp';

function fact(n: u32): MpZ {
  let a = MpZ.from(1);
  for (let i: u32 = 1; i <= n; ++i) {
    a *= MpZ.from(i);
  }
  return a;
}

describe('MpZ', () => {
  it('.toDecimal()', () => {
    expect(MpZ.from('0xDEADBEEF').toDecimal()).toBe('3735928559');
    expect(MpZ.from('-0xDEADBEEF').toDecimal()).toBe('-3735928559');

    expect(MpZ.from(10).pow(10).toDecimal()).toBe('10000000000');

    const f = fact(100).toDecimal();
    expect(f.slice(0, 10)).toBe('9332621544');
    expect(f.slice(-10)).toBe('0000000000');

    const p = MpZ.from(5).pow(MpZ.from(4).pow(3).pow(2).pow(1)).toDecimal();
    expect(p.slice(0, 10)).toBe('9574977460');
    expect(p.slice(-10)).toBe('8212890625');
  });

  it('.toHex()', () => {
    expect(MpZ.from(0xff).toHex()).toBe('0xFF');
    expect(MpZ.from(-0xff).toHex()).toBe('-0xFF');

    expect(MpZ.from(0xffff).toHex()).toBe('0xFFFF');
    expect(MpZ.from(-0xffff).toHex()).toBe('-0xFFFF');

    expect(MpZ.from(0xdeadbeef).toHex()).toBe('0xDEADBEEF');
    expect(MpZ.from(i64(-0xdeadbeef)).toHex()).toBe('-0xDEADBEEF');

    expect(MpZ.from('0xDEADBEEFDEADBEEF').toHex()).toBe('0xDEADBEEFDEADBEEF');
    expect(MpZ.from('-0xDEADBEEFDEADBEEF').toHex()).toBe('-0xDEADBEEFDEADBEEF');
  });

  it('toString(2)', () => {
    expect(MpZ.from(0xff).toString(2)).toBe('11111111');
  });

  it('toString(36)', () => {
    expect(MpZ.from(0xff).toString(36)).toBe('73');
  });
});
