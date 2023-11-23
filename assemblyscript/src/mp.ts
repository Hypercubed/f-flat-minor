@inline
const LOW_MASK: u32 = 0xFFFFFFFF;

@inline
const LIMB_BITS: u32 = 32;

@inline
function low32(value: u64): u32 {
  return u32(value & LOW_MASK);
}

@inline
function high32(value: u64): u32 {
  return u32(value >> 32 & LOW_MASK);
}

function toStaticArray<T>(data: T[]): StaticArray<u32> {
  while (data.length > 1 && data[data.length - 1] === 0) {
    data = data.slice(0, data.length - 1)
  }
  return StaticArray.fromArray(data);
}

function fromI32(value: i32): MpZ {
  if (value < 0) {
    return new MpZ([u32(-value)] as StaticArray<u32>, true);
  }
  return new MpZ([value] as StaticArray<u32>);
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
  return new MpZ([low32(value), high32(value)]  as StaticArray<u32>, false);
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

@final
export class MpZ {
  constructor(protected readonly _data: StaticArray<u32>, protected readonly _neg: boolean = false) {
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

  // Addition

  add<T>(_rhs: T): MpZ {
    const rhs = MpZ.from(_rhs);

    if (this._neg && rhs._neg) return this._uadd(rhs).neg();
    if (this._neg) return rhs._usub(this);
    if (rhs._neg) return this._usub(rhs);
    return this._uadd(rhs);
  }

  // unsigned add
  private _uadd(rhs: MpZ): MpZ {
    return (this.size < rhs.size) ? rhs.__uadd(this) : this.__uadd(rhs);
  }

  // unsigned add
  // lhs > rhs
  private __uadd(rhs: MpZ): MpZ {
    let lhs = this;

    // Slhs > Srhs
    if (lhs.size < rhs.size) {
      lhs = rhs;
      rhs = this;
    }

    const len = lhs._data.length;
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

  // unsigned sub (rhs > lhs)
  private __usub(rhs: MpZ): MpZ {
    const len = this._data.length > rhs._data.length ? this._data.length : rhs._data.length;
    const result: u32[] = new Array(len);

    let carry: u64 = 1;
    for (let i: i32 = 0; i < this._data.length; ++i) {
      const rhs_limb = rhs._data.length > i ? u64(unchecked(rhs._data[i])) : 0;
      const lhs_limb = this._data.length > i ? u64(unchecked(this._data[i])) : 0;

      carry += <u64>LOW_MASK + <u64>lhs_limb - <u64>rhs_limb;
      result[i] = low32(carry);
      carry = high32(carry);
    }

    return new MpZ(toStaticArray(result));
  }

  // Multiplication

  mul<T>(_rhs: T): MpZ {
    const rhs = MpZ.from(_rhs);
    const s_lhs = this._neg;
    const s_rhs = rhs._neg;

    return s_lhs !== s_rhs ? this._umul(rhs).neg() : this._umul(rhs);
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
        carry += u64(unchecked(this._data[i])) * u64(unchecked(rhs._data[j])) + u64(unchecked(result[k]));
        result[k] = low32(carry);
        carry = high32(carry);
      }
      result[i + p] = low32(carry);
    }

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
    assert(n < LIMB_BITS, "_bitShiftLeft: n must be less than LIMB_BITS");
    if (n === 0) return this;
    return this._umul(MpZ.from(2**n));
  }

  private _bitShiftRight(n: u32): MpZ {
    assert(n < LIMB_BITS, "_bitShiftRight: n must be less than LIMB_BITS");
    if (n === 0) return this;
    return this._shortuDiv(2**n);
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

  // TODO: ctz
  // TODO: shl
  // TODO: shr
  // TODO: rem
  // TODO: mod
  // TODO: pow
  // TODO: fms (fused multiply-subtract)

  // Division

  div<T>(_rhs: T): MpZ {
    if (this.eqz()) return MpZ.ZERO;

    const rhs = MpZ.from(_rhs);

    if (rhs.eqz()) throw new Error("Divide by zero");
    if (rhs.eq(MpZ.ONE)) return this;
    if (this.eq(rhs)) return MpZ.ONE;

    const s_lhs = this._neg;
    const s_rhs = rhs._neg;

    const dividend = this.abs();
    const divisor = rhs.abs();

    if (dividend.lt(divisor)) return MpZ.ZERO;
    
    if (divisor.size === 1) {
      const r = dividend._shortuDiv(unchecked(divisor._data[0]));
      return s_lhs !== s_rhs ? r.neg() : r;
    }

    return s_lhs !== s_rhs ? dividend._udiv(divisor).neg() : dividend._udiv(divisor);
  }

  // unsigned div
  // Netwon-Raphson division
  private _udiv(rhs: MpZ): MpZ {
    assert(this >= rhs, "_udiv: lhs must be greater than rhs");
    assert(!rhs.isNeg, "_udiv: lhs must positive");

    const k = this._bits() + rhs._bits();
    const d = rhs._inv(k);
    const q = this._umul(d)._shr(k);
    const rem = this - q._umul(rhs);

    return (rem >= rhs) ? q._uadd(MpZ.ONE) : q;
  }

  inv(k: u32): MpZ {
    if (this.eqz()) throw new Error("Divide by zero");
    if (this.eq(MpZ.ONE)) return this._shl(k);

    const s_lhs = this._neg;
    const n = this._bits();
    if (k < n) return MpZ.ZERO;
    if (k <= 2*n) return this._inv(2*n)._shr(2*n - k);
    return s_lhs ? this._inv(k).neg() : this._inv(k);
  }

  // Calculate 2**k/x using Newton-Raphson method
  private _inv(k: u32): MpZ {
    assert(!this.isNeg, "_inv: lhs must be positive");
    assert(this._bits() <= k, "_inv: k must be greater than the number of bits in x");

    const divisor = this;
    const n = divisor._bits();

    const k2 = MpZ.ONE._shl(k);  // 2^k
    const pow2 = k2._umul(MpZ.TWO); // 2^(k+1)

    // initial guess for convergence (0 < x < 2**(k+1)/b)
    const T1 = MpZ.from(48)._shl(k - n);  // 48 * 2^k / 2^n
    const T2 = MpZ.from(32)._shl(k - n - n).mul(divisor);  // 32 * 2^(k-n) * x / 2^n
    let q = T1._usub(T2)._shortuDiv(17); // 48/17 - 32/17 * x ~= 1/D

    // let q = this._shl(k - n - n);

    let lastQ = MpZ.ZERO;
    let y = q._umul(divisor);
    while (lastQ != q) {
      lastQ = q;
      q = q._umul(pow2._usub(y)) >> k;  // TEST: fused multiply-subtract
      y = q._umul(divisor);
    }

    return q;
  }

  // unsigned div
  // Modified long division
  // private _udiv(rhs: MpZ): MpZ {
  //   assert(this >= rhs, "_udiv: lhs must be greater than rhs");
  //   assert(rhs > MpZ.ZERO, "_udiv: lhs must be greater than rhs");

  //   let x = MpZ.ZERO;
  //   const m: u32 = rhs._bits();
  //   let e = this;

  //   let s0 = 0;
  //   let de = rhs;
  //   let so = MpZ.ONE;

  //   do {
  //     const n: u32 = e._bits();
  //     const s: u32 = (n > m) ? n - m - 1 : 0;  // shift amount to get a decent quotient
  //     if (s !== s0) {  // avoid repeated shifts by caching results
  //       s0 = s;
  //       de = rhs._shl(s);
  //       so = MpZ.ONE._shl(s);
  //     }
  //     e = e.__usub(de);
  //     x = x._uadd(so);
  //   } while (e._ucmp(rhs) >= 0);

  //   return x;
  // }

  // modulus

  mod<T>(_rhs: T): MpZ {
    const rhs = MpZ.from(_rhs);
    return this.sub(this.div(rhs).mul(rhs));
  }

  private _shortuDiv(rhs: u32): MpZ {
    const result: u32[] = [0];

    let rem: u64 = 0;
    for (let i: i32 = this.size - 1; i >= 0; --i) {
      const doubleLimb: u64 = u64(unchecked(this._data[i])) + (rem << 32);
      result[i] = low32(doubleLimb / rhs);
      rem = doubleLimb % rhs;
    }

    return new MpZ(toStaticArray(result));
  }

  @operator.prefix('-')
  neg(): MpZ {
    if (this.eqz()) return this;
    return new MpZ(this._data, !this._neg);
  }

  toString(): string {
    let r = '';

    for (let i: i32 = this._data.length - 1; i >= 0; --i) {
      r += u32ToHex(unchecked(this._data[i]), i !== this._data.length - 1);
    }

    return this._neg ? `-0x${r}` : `0x${r}`;
  }

  toU32(): u32 {
    return unchecked(this._data[0]);
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
    if (typeof val === 'string') return fromString(val)

    throw new TypeError("Unsupported generic type " + nameof<T>(val));
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

  static A: MpZ = MpZ.from(48/17);
  static B: MpZ = MpZ.from(32/17);
}

function u32ToHex(value: u32, pad: boolean = true): string {
  let r = value.toString(16).toUpperCase();
  if (!pad) return r;
  return ('00000000' + r).substr(r.length);
}
