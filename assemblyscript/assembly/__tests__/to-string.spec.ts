import { MpZ } from '../mp';

function fact(n: u32): MpZ {
  let a = MpZ.from(1);
  for (let i: u32 = 1; i <= n; ++i) {
    a *= MpZ.from(i);
  }
  return a;
}

describe('toString', () => {
  it('toString(10)', () => {
    // toString(10)
    expect(MpZ.from('0xDEADBEEF').toString(10)).toBe('3735928559');
    expect(MpZ.from('-0xDEADBEEF').toString(10)).toBe('-3735928559');

    expect(MpZ.from(10).pow(10).toString(10)).toBe('10000000000');

    const f = fact(100).toDecimal();
    expect(f.slice(0, 10)).toBe('9332621544');
    expect(f.slice(-10)).toBe('0000000000');

    const p = MpZ.from(5).pow(MpZ.from(4).pow(3).pow(2).pow(1)).toDecimal();
    expect(p.slice(0, 10)).toBe('9574977460');
    expect(p.slice(-10)).toBe('8212890625');
  });

  it('toString(16)', () => {
    expect(MpZ.from(0xff).toString(16)).toBe('0xFF');
    expect(MpZ.from(-0xff).toString(16)).toBe('-0xFF');

    expect(MpZ.from(0xffff).toString(16)).toBe('0xFFFF');
    expect(MpZ.from(-0xffff).toString(16)).toBe('-0xFFFF');

    expect(MpZ.from(0xdeadbeef).toString(16)).toBe('0xDEADBEEF');
    expect(MpZ.from(i64(-0xdeadbeef)).toString(16)).toBe('-0xDEADBEEF');

    expect(MpZ.from('0xDEADBEEFDEADBEEF').toString(16)).toBe(
      '0xDEADBEEFDEADBEEF',
    );
    expect(MpZ.from('-0xDEADBEEFDEADBEEF').toString(16)).toBe(
      '-0xDEADBEEFDEADBEEF',
    );
  });
});
