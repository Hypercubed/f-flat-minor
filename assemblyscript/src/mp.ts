const LOW_MASK = 0xFFFFFFFF;

function toStaticArray<T>(data: T[]): StaticArray<u32> {
  while (data.length > 1 && data[data.length - 1] === 0) {
    data = data.slice(0, data.length - 1)
  }
  return StaticArray.fromArray(data);
}

@inline
function low32(value: u64): u32 {
  return u32(value & LOW_MASK);
}

@inline
function high32(value: u64): u32 {
  return u32(value >> 32 & LOW_MASK);
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
  const len = value.length;
  let res = MpZ.from(0);
  if (value === '0') return res;
  for (let i = 0; i < len; i++) {
    const code = <u32>value.charCodeAt(i);
    const val = codeToU32(code);
    res = res.mul(base).add(val);
  }
  return res;
}

function getBase(value: string): u32 {
  const first = value.charAt(0);
  if (first === '0') {
    if (value.length === 1) return 10;

    const second = value.charCodeAt(1);
    switch (second) {
      case 'b'.charCodeAt(0):
        return 2;
      case 'o'.charCodeAt(0):
        return 8;
      case 'x'.charCodeAt(0):
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
    return new MpZ(this._data);
  }

  add<T>(_rhs: T): MpZ {
    const rhs = MpZ.from(_rhs);

    if (this._neg && rhs._neg) {
      return this._uadd(rhs).neg();
    }

    if (this._neg) {
      return rhs._usub(this);
    }

    if (rhs._neg) {
      return this._usub(rhs);
    }

    return this._uadd(rhs);
  }

  // unsigned add
  private _uadd(rhs: MpZ): MpZ {
    const len = this._data.length > rhs._data.length ? this._data.length : rhs._data.length;
    const result: u32[] = new Array(len);

    let carry: u64 = 0;
    for (let i: i32 = 0; i < len; ++i) {
      const rhs_limb: u64 = rhs._data.length > i ? u64(rhs._data[i]) : 0;
      const lhs_limb: u64 = this._data.length > i ? u64(this._data[i]) : 0;

      const doubleLimb: u64 = carry + rhs_limb + lhs_limb;
      carry = high32(doubleLimb);
      result[i] = low32(doubleLimb);
    }

    if (carry !== 0) {
      result.push(u32(carry));
    }

    return new MpZ(toStaticArray(result));
  }

  sub<T>(_rhs: T): MpZ {
    const rhs = MpZ.from(_rhs);

    if (this._neg && rhs._neg) {
      return this._usub(rhs).neg();
    }

    if (this._neg) {
      return this._uadd(rhs).neg();
    }

    if (rhs._neg) {
      return this._uadd(rhs);
    }

    return this._usub(rhs);
  }

  // unsigned sub
  private _usub(rhs: MpZ): MpZ {
    if (this._ucmp(rhs) < 0) {
      return rhs.__usub(this).neg();
    }
    return this.__usub(rhs);
  }

  // unsigned sub (rhs > lhs)
  private __usub(rhs: MpZ): MpZ {
    const data: u32[] = rhs._data.map((v: u32) => ~v);  // ones' complement of rhs
    const r = this._uadd(new MpZ(toStaticArray(data)))._uadd(MpZ.ONE);
    const d: u32[] = r._data.slice();
    d.pop();  // remove carry

    return new MpZ(toStaticArray(d), false);
  }

  // signed mul
  mul<T>(rhs: T): MpZ {
    return this._mul(MpZ.from(rhs));
  }

  private _mul(rhs: MpZ): MpZ {
    const s_lhs = this._neg;
    const s_rhs = rhs._neg;

    const q = this._data.length;
    const p = rhs._data.length;
    const result = new Array<u32>(q + p);

    for (let i: i32 = 0; i < q; ++i) {
      let carry: u64 = 0;
      for (let j: i32 = 0; j < p; ++j) {
        const k = i + j;
        const doubleLimb: u64 = carry + u64(this._data[i]) * u64(rhs._data[j]) + u64(result[k]);
        carry = high32(doubleLimb);
        result[k] = low32(doubleLimb);
      }
      result[i + p] = low32(carry);
    }

    return new MpZ(toStaticArray(result), s_lhs !== s_rhs);
  }

  // TODO: clz
  // TODO: ctz
  // TODO: shl
  // TODO: shr
  // TODO: div
  // TODO: rem
  // TODO: mod
  // TODO: pow

  div<T>(rhs: T): MpZ {
    return this._div(MpZ.from(rhs));
  }

  private _div(rhs: MpZ): MpZ {
    if (rhs.eqz()) throw new Error("Divide by zero");
    if (rhs.eq(MpZ.ONE)) return this;

    const s_lhs = this._neg;
    const s_rhs = rhs._neg;

    if (rhs.size === 1) {
      const r = this._shortuDiv(rhs._data[0]);
      return new MpZ(toStaticArray(r), this._neg !== rhs._neg);
    }

    // Very slow division algorithm
    let result = MpZ.ZERO;

    let dividend = this.abs();
    const divisor = rhs.abs();

    let rem = dividend;

    // process.stdout.write(`rem: ${rem}\n`);
    // process.stdout.write(`divisor: ${divisor}\n`);
    // process.stdout.write(`rem._ucmp(divisor): ${rem._ucmp(divisor)}\n`);

    while (rem._ucmp(divisor) >= 0) {
      rem = rem._usub(divisor);
      result = result._uadd(MpZ.ONE);

      // process.stdout.write(`rem: ${rem}\n`);
      // process.stdout.write(`divisor: ${divisor}\n`);
      // process.stdout.write(`rem._ucmp(divisor): ${rem._ucmp(divisor)}\n`);
    }

    return s_lhs !== s_rhs ? result.neg() : result;
  }

  private _shortuDiv(rhs: u32): Array<u32> {
    const result: u32[] = [0];
    
    let rem: u64 = 0;
    for (let i: i32 = this.size - 1; i >= 0; --i) {
      const doubleLimb: u64 = u64(this._data[i]) + (rem << 32);
      result[i] = low32(doubleLimb / rhs);
      rem = doubleLimb % rhs;
    }

    return result;
  }

  @operator.prefix('-')
  neg(): MpZ {
    if (this.eqz()) return this;
    return new MpZ(this._data, !this._neg);
  }

  toString(): string {
    const result: string[] = [];

    for (let i: i32 = this._data.length - 1; i >= 0; --i) {
      result.push(u32ToHex(this._data[i]));
    }

    let r = result.join('');

    while (r.length > 1 && r.substr(0, 1) === '0') {
      r = r.substr(1);
    }

    r = '0x' + r;

    if (this._neg) {
      r = '-' + r;
    }

    return r;
  }

  toU32(): u32 {
    return unchecked(this._data[0]);
  }
  
  eq<T>(rhs: T): boolean {
    return this.cmp<T>(MpZ.from(rhs)) === 0;
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
      const lhs_v = this._data[i];
      const rhs_v = rhs._data[i];
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
}

function u32ToHex(value: u32): string {
  const r = '00000000' + value.toString(16).toUpperCase();
  return r.substr(r.length - 8);
}
