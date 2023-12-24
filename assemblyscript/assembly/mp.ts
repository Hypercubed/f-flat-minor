
@inline
const LOW_MASK: u32 = 0xffffffff;


@inline
const LIMB_BITS: u32 = 32;


@inline
function low32(value: u64): u32 {
  return u32(value & LOW_MASK);
}


@inline
function high32(value: u64): u32 {
  return u32((value >> LIMB_BITS) & LOW_MASK);
}

function toStaticArray<T>(data: T[]): StaticArray<u32> {
  while (data.length > 1 && data[data.length - 1] === 0) {
    data = data.slice(0, data.length - 1);
  }
  return StaticArray.fromArray(data);
}

function fromI32(value: i32): MpZ {
  if (value < 0) {
    return new MpZ([u32(-value)] as StaticArray<u32>, true);
  }
  return new MpZ([u32(value)] as StaticArray<u32>);
}

function fromU32(value: u32): MpZ {
  return new MpZ([value] as StaticArray<u32>);
}

function fromI64(value: i64): MpZ {
  const neg = value < 0;
  if (value < 0) {
    value = -value;
  }
  const hi = high32(value);
  const lo = low32(value);
  if (hi === 0) {
    return new MpZ([lo] as StaticArray<u32>, neg);
  }
  return new MpZ([low32(value), high32(value)] as StaticArray<u32>, neg);
}

function fromU64(value: u64): MpZ {
  const hi = high32(value);
  const lo = low32(value);
  if (hi === 0) {
    return new MpZ([lo] as StaticArray<u32>, false);
  }
  return new MpZ([low32(value), high32(value)] as StaticArray<u32>, false);
}

function codeToU32(code: u32): u32 {
  if (code >= 48 && code <= 57) {
    return <u32>(code - 48);
  }
  if (code >= 65 && code <= 90) {
    return <u32>(code - 55);
  }
  if (code >= 97 && code <= 122) {
    return <u32>(code - 87);
  }
  throw new Error(`Invalid digit code ${code}`);
}

function fromStringU(value: string, base: u32 = 10): MpZ {
  let res = MpZ.ZERO;
  if (value === '0') return res;
  for (let i = 0; i < value.length; i++) {
    const code: u32 = value.charCodeAt(i);
    const val = codeToU32(code);
    res = res.mul(base).add(val);
  }
  return res;
}

function getBase(str: string): u32 {
  if (str.length === 1) return 10;

  const first = str.charAt(0);
  if (first === '0') {
    const second = str.charCodeAt(1);
    switch (second) {
      case 98: // b
        return 2;
      case 111: // o
        return 8;
      case 120: // x
        return 16;
    }
  }
  return 10;
}

function fromString(value: string): MpZ {
  const neg = value.substr(0, 1) === '-';
  value = neg ? value.substr(1) : value;
  const base = getBase(value);
  value = value.substr(base === 10 ? 0 : 2);
  const r = fromStringU(value, base);
  return neg ? r.neg() : r;
}

// TODO: ctz
// TODO: shl(MpZ)
// TODO: shr(MpZ)
// TODO: pow
// TODO: log
// TODO: sqrt
// TODO: fused arithmetic
// TODO: bitwise operators

const TO_DECIMAL_M = 9;
const TO_DECIMAL_N = 10 ** TO_DECIMAL_M;
const TO_DECIMAL_P = '0'.repeat(TO_DECIMAL_M);

export class DivRem<R> {
  div!: MpZ;
  rem!: R;
}


@final
export class MpZ {
  constructor(
    protected readonly _data: StaticArray<u32>,
    protected readonly _neg: boolean = false,
  ) {
    if (_data.length === 1 && _data[0] === 0) {
      this._neg = false;
    }
  }

  get isNeg(): boolean {
    return this._neg;
  }

  get size(): i32 {
    return this._data.length;
  }

  abs(): MpZ {
    if (!this._neg) return this;
    return new MpZ(this._data);
  }

  // *** Addition ***

  add<T>(_rhs: T): MpZ {
    const rhs = MpZ.from(_rhs);

    if (this._neg && rhs._neg) return this._uadd(rhs).neg();
    if (this._neg) return rhs._usub(this);
    if (rhs._neg) return this._usub(rhs);
    return this._uadd(rhs);
  }

  // unsigned add
  private _uadd(rhs: MpZ): MpZ {
    return this.size < rhs.size ? rhs.__uadd(this) : this.__uadd(rhs);
  }

  // unsigned add
  // lhs > rhs
  private __uadd(rhs: MpZ): MpZ {
    const len = this._data.length;
    const result: u32[] = new Array(len);

    let carry: u64 = 0;
    for (let i: i32 = 0; i < len; ++i) {
      const lhs_limb = unchecked(this._data[i]);
      const rhs_limb = rhs._data.length > i ? unchecked(rhs._data[i]) : 0;

      carry += <u64>rhs_limb + <u64>lhs_limb;
      result[i] = low32(carry);
      carry = high32(carry);
    }

    if (carry !== 0) {
      result.push(u32(carry));
    }

    return new MpZ(toStaticArray(result));
  }

  private _uaddU32(rhs: u32): MpZ {
    const len = this._data.length;
    const result: u32[] = new Array(len);

    let carry: u64 = <u64>rhs;
    for (let i: i32 = 0; i < len; ++i) {
      carry += <u64>unchecked(this._data[i]);
      result[i] = low32(carry);
      carry = high32(carry);
    }

    if (carry !== 0) {
      result.push(u32(carry));
    }

    return new MpZ(toStaticArray(result));
  }

  // Subtraction

  sub<T>(_rhs: T): MpZ {
    const rhs = MpZ.from(_rhs);

    if (this._neg && rhs._neg) return this._usub(rhs).neg();
    if (this._neg) return this._uadd(rhs).neg();
    if (rhs._neg) return this._uadd(rhs);
    return this._usub(rhs);
  }

  // unsigned sub
  private _usub(rhs: MpZ): MpZ {
    if (this._ucmp(rhs) < 0) return rhs.__usub(this).neg();
    return this.__usub(rhs);
  }

  // unsigned sub (lhs > rhs)
  private __usub(rhs: MpZ): MpZ {
    const len = this._data.length;
    const result: u32[] = new Array(len);

    let carry: u64 = 1;
    for (let i: i32 = 0; i < len; ++i) {
      const lhs_limb = u64(unchecked(this._data[i]));
      const rhs_limb = rhs._data.length > i ? u64(unchecked(rhs._data[i])) : 0;

      carry += <u64>LOW_MASK + <u64>lhs_limb - <u64>rhs_limb;
      result[i] = low32(carry);
      carry = high32(carry);
    }

    return new MpZ(toStaticArray(result));
  }

  // Multiplication

  mul<T>(_rhs: T): MpZ {
    const rhs = MpZ.from(_rhs);
    return this._neg !== rhs._neg ? this._umul(rhs).neg() : this._umul(rhs);
  }

  // unsigned mul
  private _umul(rhs: MpZ): MpZ {
    const q = this._data.length;
    const p = rhs._data.length;
    const result = new Array<u32>(q + p);

    for (let i: i32 = 0; i < q; ++i) {
      let carry: u64 = 0;
      for (let j: i32 = 0; j < p; ++j) {
        const k = i + j;
        carry +=
          u64(unchecked(this._data[i])) * u64(unchecked(rhs._data[j])) +
          u64(unchecked(result[k]));
        result[k] = low32(carry);
        carry = high32(carry);
      }
      result[i + p] = low32(carry);
    }

    return new MpZ(toStaticArray(result));
  }

  private _umulU32(rhs: u32): MpZ {
    const q = this._data.length;
    const result = new Array<u32>(q + 1);

    let carry: u64 = 0;
    for (let i: i32 = 0; i < q; ++i) {
      carry += u64(unchecked(this._data[i])) * u64(rhs);
      result[i] = low32(carry);
      carry = high32(carry);
    }
    result[q] = low32(carry);

    return new MpZ(toStaticArray(result));
  }

  private _umul2powU32(rhs: u32): MpZ {
    assert(rhs < LIMB_BITS, '_umul2powU32: rhs must be less than LIMB_BITS');

    const q = this._data.length;
    const result = new Array<u32>(q + 1);

    let carry: u64 = 0;
    for (let i: i32 = 0; i < q; ++i) {
      carry += u64(unchecked(this._data[i])) << rhs;
      result[i] = low32(carry);
      carry = high32(carry);
    }
    result[q] = low32(carry);

    return new MpZ(toStaticArray(result));
  }

  // count leading zeros
  private _clz(): u32 {
    const d = unchecked(this._data[this._data.length - 1]);
    return <u32>clz(d);
  }

  // count bits
  private _bits(): u32 {
    return <u32>(this._data.length * LIMB_BITS - this._clz());
  }

  private _limbShiftLeft(limbs: u32): MpZ {
    if (limbs === 0) return this;
    const data = this._data.slice();
    const low = new Array<u32>(limbs);
    return new MpZ(toStaticArray(low.concat(data)));
  }

  private _limbShiftRight(n: u32): MpZ {
    if (n === 0) return this;
    if (n >= <u32>this._data.length) return MpZ.ZERO;
    const data = this._data.slice(n);
    return new MpZ(toStaticArray(data));
  }

  private _bitShiftLeft(n: u32): MpZ {
    assert(n < LIMB_BITS, '_bitShiftLeft: n must be less than LIMB_BITS');
    if (n === 0) return this;
    return this._umul2powU32(n);
  }

  private _bitShiftRight(n: u32): MpZ {
    assert(n < LIMB_BITS, '_bitShiftRight: n must be less than LIMB_BITS');
    if (n === 0) return this;
    return this._udivU32(2 ** n);
  }

  private _shl(n: u32): MpZ {
    if (n === 0) return this;
    return this._limbShiftLeft(n / LIMB_BITS)._bitShiftLeft(n % LIMB_BITS);
  }

  private _shr(n: u32): MpZ {
    if (n === 0) return this;
    return this._limbShiftRight(n / LIMB_BITS)._bitShiftRight(n % LIMB_BITS);
  }


  @operator('<<')
  shl(n: u32): MpZ {
    if (n === 0) return this;
    if (this.eqz()) return MpZ.ZERO;
    if (n < 0) return this._shr(-n);
    return this._shl(n);
  }


  @operator('>>')
  shr(n: u32): MpZ {
    if (n === 0) return this;
    if (this.eqz()) return MpZ.ZERO;
    if (n < 0) return this._shl(-n);
    return this._shr(n);
  }

  // Division

  div<T>(_rhs: T): MpZ {
    if (this.eqz()) return MpZ.ZERO;

    const rhs = MpZ.from(_rhs);

    if (rhs.eqz()) throw new Error('Divide by zero');
    if (rhs.eq(MpZ.ONE)) return this;
    if (this.eq(rhs)) return MpZ.ONE;

    const s_lhs = this._neg;
    const s_rhs = rhs._neg;

    const dividend = this.abs();
    const divisor = rhs.abs();

    if (dividend.lt(divisor)) return MpZ.ZERO;

    if (divisor.size === 1) {
      const r = dividend._udivU32(unchecked(divisor._data[0]));
      return s_lhs !== s_rhs ? r.neg() : r;
    }

    return s_lhs !== s_rhs
      ? dividend._udiv(divisor).neg()
      : dividend._udiv(divisor);
  }

  // unsigned div
  // Using Netwon-Raphson inversion
  private _udiv(rhs: MpZ): MpZ {
    assert(this >= rhs, '_udiv: lhs must be greater than rhs');
    assert(!rhs.isNeg, '_udiv: lhs must positive');

    const k = this._bits() + rhs._bits();
    const d = rhs._inv(k);
    let q = this._umul(d)._shr(k);

    if (this._usub(q._umul(rhs)).gte(rhs)) {
      q = q._uaddU32(1);
    }

    return q;
  }

  // Calculate trunc(2**k/x)
  inv(k: u32): MpZ {
    if (this.eqz()) throw new Error('Divide by zero');
    if (this.eq(MpZ.ONE)) return this._shl(k);

    const n = this._bits();
    if (k < n) return MpZ.ZERO;

    const q = k <= 2 * n ? this._inv(2 * n)._shr(2 * n - k) : this._inv(k);
    return this._neg ? q.neg() : q;
  }

  // Calculate trunc(2**k/x) using Newton-Raphson method
  private _inv(k: u32): MpZ {
    assert(!this.isNeg, '_inv: lhs must be positive');
    assert(
      this._bits() <= k,
      '_inv: k must be greater than the number of bits in x',
    );

    const n = this._bits();

    const k2 = MpZ.ONE._shl(k); // 2^k
    const pow2 = k2._umul2powU32(1); // 2^(k+1)

    // initial guess for convergence (0 < x < 2**(k+1)/b)
    const T1 = MpZ.from(48)._shl(k - n); // 48 * 2^k / 2^n
    const T2 = MpZ.from(32)
      ._shl(k - n - n)
      ._umul(this); // 32 * 2^(k-n) * x / 2^n
    let q = T1._usub(T2)._udivU32(17); // 48/17 - 32/17 * x ~= 1/D

    // let q = this._shl(k - n - n);

    let lastQ = MpZ.ZERO;
    let y = q._umul(this);
    while (lastQ.neq(q)) {
      lastQ = q;
      q = q._umul(pow2._usub(y))._shr(k);
      y = q._umul(this);
    }

    return q;
  }

  private _udivU32(rhs: u32): MpZ {
    const result: u32[] = [0];

    let rem: u64 = 0;
    for (let i: i32 = this._data.length - 1; i >= 0; --i) {
      rem = u64(unchecked(this._data[i])) + (rem << 32);
      result[i] = low32(rem / rhs);
      rem %= rhs;
    }

    return new MpZ(toStaticArray(result));
  }

  private _udivRemU32(rhs: u32): DivRem<u32> {
    const result: u32[] = [0];

    let rem: u64 = 0;
    for (let i: i32 = this._data.length - 1; i >= 0; --i) {
      rem = u64(unchecked(this._data[i])) + (rem << 32);
      result[i] = low32(rem / rhs);
      rem %= rhs;
    }

    const d = new MpZ(toStaticArray(result));
    const r = low32(rem);
    return { div: d, rem: r };
  }

  // modulus

  mod<T>(_rhs: T): MpZ {
    const rhs = MpZ.from(_rhs);
    if (rhs.eqz()) throw new Error('Divide by zero');
    const q = this.div(rhs);
    const m = this._usub(rhs._umul(q));
    return this.isNeg ? m.neg() : m;
  }

  rem<T>(_rhs: T): MpZ {
    const rhs = MpZ.from(_rhs);
    if (rhs.eqz()) throw new Error('Divide by zero');
    const q = this.div(rhs);
    return this.sub(rhs.mul(q));
  }

  pow<T>(_rhs: T): MpZ {
    const rhs = MpZ.from(_rhs);
    if (rhs.isNeg) throw new Error('Negative exponent');
    return this._pow(rhs);
  }

  _pow(rhs: MpZ): MpZ {
    if (rhs.eqz()) return MpZ.ONE;
    if (rhs.eq(MpZ.ONE)) return this;

    let pow = this._pow(rhs._shr(1));
    pow = pow.mul(pow);
    return rhs.isOdd() ? pow.mul(this) : pow;
  }

  isOdd(): boolean {
    return (unchecked(this._data[0]) & 1) === 1;
  }

  isEven(): boolean {
    return !this.isOdd();
  }


  @operator.prefix('-')
  neg(): MpZ {
    if (this.eqz()) return this;
    return new MpZ(this._data, !this._neg);
  }

  private _uhex(): string {
    let r = '';

    for (let i: i32 = this._data.length - 1; i >= 0; --i) {
      r += u32ToHex(unchecked(this._data[i]), i !== this._data.length - 1);
    }

    return r;
  }

  toString(radix: i32 = 10): string {
    if (radix < -2) {
      return this.toString(-radix).toUpperCase();
    }

    if (radix === 10) {
      return this.toDecimal();
    } else if (radix === 16) {
      return this._neg ? `-${this._uhex()}` : `${this._uhex()}`;
    } else if (radix >= 2 && radix <= 36) {
      return this._uitoa(radix);
    } else {
      throw new Error('toString() radix argument must be between 2 and 36');
    }
  }

  toHex(): string {
    if (this.eqz()) return '0x0';

    const r = this._uhex();
    return this._neg ? `-0x${r}` : `0x${r}`;
  }

  toDecimal(): string {
    if (this.eqz()) return '0';
    return (this._neg ? `-` : '') + this.abs()._uitoaDecimal();
  }

  private _uitoaDecimal(): string {
    const dec = new Array<string>();

    let n: MpZ = this;
    while (n.cmp(TO_DECIMAL_N) === 1) {
      const d = n._udivRemU32(TO_DECIMAL_N);
      n = d.div;

      const s = TO_DECIMAL_P + d.rem.toString(10);
      dec.unshift(s.slice(-TO_DECIMAL_M));
    }

    if (!n.eqz()) {
      dec.unshift(n.toU32().toString(10));
    }

    return dec.join('');
  }

  private _uitoa(base: u32): string {
    const dec = new Array<string>();

    let n: MpZ = this;
    while (n.cmp(base) === 1) {
      const d = n._udivRemU32(base);
      n = d.div;
      dec.unshift(d.rem.toString(base));
    }

    if (!n.eqz()) {
      dec.unshift(n.toU32().toString(base));
    }

    return dec.join('');
  }

  // toDecimal(): string {
  //   if (this.eqz()) return '0';

  //   const hex = this._uhex();

  //   const len = hex.length;
  //   const dec: u32[] = [];

  //   for (let i = 0; i < len; ++i) {
  //     const code = hex.charCodeAt(i);
  //     let carry = codeToU32(code);

  //     for (let j = 0; j < dec.length; ++j) {
  //       const val = unchecked(dec[j]) * 16 + carry;
  //       carry = val / 10;
  //       dec[j] = val % 10;
  //     }

  //     while (carry > 0) {
  //       dec.push(carry % 10);
  //       carry = carry / 10;
  //     }
  //   }

  //   return (this._neg ? `-` : '') + dec.reverse().join('');
  // }

  toU32(): u32 {
    return unchecked(this._data[0]);
  }

  toI32(): u32 {
    return unchecked(<i32>this._data[0]);
  }

  eq<T>(rhs: T): boolean {
    return this.cmp<T>(MpZ.from(rhs)) === 0;
  }

  neq<T>(rhs: T): boolean {
    return this.cmp<T>(MpZ.from(rhs)) !== 0;
  }

  gt<T>(rhs: T): boolean {
    return this.cmp<T>(MpZ.from(rhs)) > 0;
  }

  gte<T>(rhs: T): boolean {
    return this.cmp<T>(MpZ.from(rhs)) >= 0;
  }

  lt<T>(rhs: T): boolean {
    return this.cmp<T>(MpZ.from(rhs)) < 0;
  }

  lte<T>(rhs: T): boolean {
    return this.cmp<T>(MpZ.from(rhs)) <= 0;
  }

  eqz(): boolean {
    return this._data.length === 1 && unchecked(this._data[0]) === 0;
  }

  cmp<T>(_rhs: T): i32 {
    const rhs = MpZ.from(_rhs);

    const lhs_s = this._neg;
    const rhs_s = rhs._neg;

    if (lhs_s !== rhs_s) return lhs_s ? -1 : 1;

    const c = this._ucmp(rhs);

    return lhs_s ? -c : c;
  }

  private _ucmp(rhs: MpZ): i32 {
    const lhs_s = this.size;
    const rhs_s = rhs.size;

    if (lhs_s !== rhs_s) return lhs_s > rhs_s ? 1 : -1;
    for (let i = lhs_s - 1; i >= 0; i--) {
      const lhs_v = unchecked(this._data[i]);
      const rhs_v = unchecked(rhs._data[i]);
      if (lhs_v != rhs_v) {
        return lhs_v > rhs_v ? 1 : -1;
      }
    }
    return 0;
  }

  static from<T>(val: T): MpZ {
    if (val instanceof MpZ) return val;
    if (val instanceof i32) return fromI32(val as i32);
    if (val instanceof u32) return fromU32(val as u32);
    if (val instanceof i64) return fromI64(val as i64);
    if (val instanceof u64) return fromU64(val as u64);
    if (typeof val === 'string') return fromString(val);

    throw new TypeError('Unsupported generic type ' + nameof<T>(val));
  }


  @lazy
  static ZERO: MpZ = new MpZ([0]);


  @lazy
  static ONE: MpZ = new MpZ([1]);


  @lazy
  static TWO: MpZ = new MpZ([2]);


  @inline @operator('*')
  static mul(lhs: MpZ, rhs: MpZ): MpZ {
    return lhs.mul(rhs);
  }


  @inline @operator('/')
  static div(lhs: MpZ, rhs: MpZ): MpZ {
    return lhs.div(rhs);
  }


  @inline @operator('+')
  static add(lhs: MpZ, rhs: MpZ): MpZ {
    return lhs.add(rhs);
  }


  @inline @operator('-')
  static sub(lhs: MpZ, rhs: MpZ): MpZ {
    return lhs.sub(rhs);
  }


  @inline @operator('==')
  static eq(lhs: MpZ, rhs: MpZ): boolean {
    return lhs.eq(rhs);
  }


  @inline @operator('>')
  static gt(lhs: MpZ, rhs: MpZ): boolean {
    return lhs.gt(rhs);
  }


  @inline @operator('>=')
  static gte(lhs: MpZ, rhs: MpZ): boolean {
    return lhs.gte(rhs);
  }


  @inline @operator('<')
  static lt(lhs: MpZ, rhs: MpZ): boolean {
    return lhs.lt(rhs);
  }


  @inline @operator('<=')
  static lte(lhs: MpZ, rhs: MpZ): boolean {
    return lhs.lte(rhs);
  }


  @inline @operator('!=')
  static neq(lhs: MpZ, rhs: MpZ): boolean {
    return !lhs.eq(rhs);
  }


  @inline @operator('%')
  static mod(lhs: MpZ, rhs: MpZ): MpZ {
    return lhs.mod(rhs);
  }


  @inline @operator('**')
  static pow(lhs: MpZ, rhs: MpZ): MpZ {
    return lhs.pow(rhs);
  }

  static A: MpZ = MpZ.from(48 / 17);
  static B: MpZ = MpZ.from(32 / 17);
}

function u32ToHex(value: u32, pad: boolean = true): string {
  let r = value.toString(16);
  if (!pad) return r;
  return ('00000000' + r).substr(r.length);
}
