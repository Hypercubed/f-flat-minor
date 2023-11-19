const LOW_MASK = 0xFFFFFFFF;

function trim(data: u32[]): u32[] {
  while (data.length > 1 && data[data.length - 1] === 0) {
    data.pop();
  }
  return data;
}

function low32(value: u64): u32 {
  return u32(value & LOW_MASK);
}

function high32(value: u64): u32 {
  return u32(value >> 32 & LOW_MASK);
}

function fromI32(value: i32): MpInt {
  if (value < 0) {
    return new MpInt([u32(-value)], true);
  }
  return new MpInt([value]);
}

function fromU32(value: u32): MpInt {
  return new MpInt([value]);
}

function fromI64(value: i64): MpInt {
  const neg = value < 0;
  if (value < 0) {
    value = -value;
  }
  return new MpInt([low32(value), high32(value)], neg);
}

function fromU64(value: u64): MpInt {
  return new MpInt([low32(value), high32(value)]);
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

function fromStringU(value: string, base: u32 = 10): MpInt {
  const len = value.length;
  let res = MpInt.from(0);
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

function fromString(value: string): MpInt {
  const neg = value.substr(0, 1) === '-';
  value = neg ? value.substr(1) : value;
  const base = getBase(value);
  value = value.substr(base === 10 ? 0 : 2);
  const r = fromStringU(value, base);
  return neg ? r.negate() : r;
}

export class MpInt {
  constructor(protected readonly _data: u32[], protected readonly _neg: boolean = false) {
    this._data = trim(_data);
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

  abs(): MpInt {
    return new MpInt(this._data);
  }

  add<T>(_rhs: T): MpInt {
    const rhs = MpInt.from(_rhs);

    if (this._neg && rhs._neg) {
      return this._uadd(rhs).negate();
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
  private _uadd(rhs: MpInt): MpInt {
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

    return new MpInt(trim(result));
  }

  sub<T>(_rhs: T): MpInt {
    const rhs = MpInt.from(_rhs);

    if (this._neg && rhs._neg) {
      return this._usub(rhs).negate();
    }

    if (this._neg) {
      return this._uadd(rhs).negate();
    }

    if (rhs._neg) {
      return this._uadd(rhs);
    }

    return this._usub(rhs);
  }

  // unsigned sub
  private _usub(rhs: MpInt): MpInt {
    if (this._ucmp(rhs) < 0) {
      return rhs.__usub(this).negate();
    }
    return this.__usub(rhs);
  }

  // unsigned sub (rhs > lhs)
  private __usub(rhs: MpInt): MpInt {
    let data = rhs._data;

    data = data.map((v: u32) => ~v);  // ones' complement of rhs
    const r = this._uadd(new MpInt(data))._uadd(MpInt.ONE);
    const d = r._data
    d.pop();  // remove carry

    return new MpInt(trim(d), false);
  }

  // signed mul
  mul<T>(rhs: T): MpInt {
    return this._mul(MpInt.from(rhs));
  }

  private _mul(rhs: MpInt): MpInt {
    const lhs: MpInt = this;

    const s_lhs = this._neg;
    const s_rhs = rhs._neg;

    const q = this._data.length;
    const p = rhs._data.length;
    const result: u32[] = new Array(q + p);

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

    return new MpInt(trim(result), s_lhs !== s_rhs);
  }

  negate(): MpInt {
    return new MpInt(this._data, !this._neg);
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

  private cmp<T>(_rhs: T): i32 {
    const rhs = MpInt.from(_rhs);

    const lhs_s = this._neg;
    const rhs_s = rhs._neg;

    if (lhs_s !== rhs_s) return lhs_s ? -1 : 1;

    const c = this._ucmp(rhs);

    return lhs_s ? -c : c;
  }

  private _ucmp(rhs: MpInt): i32 {
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

  static from<T>(val: T): MpInt {
    if (val instanceof MpInt) return val;
    if (val instanceof i32) return fromI32(val as i32);
    if (val instanceof u32) return fromU32(val as u32);
    if (val instanceof i64) return fromI64(val as i64);
    if (val instanceof u64) return fromU64(val as u64);
    if (typeof val === 'string') return fromString(val)

    throw new TypeError("Unsupported generic type " + nameof<T>(val));
  }

  static ZERO: MpInt = new MpInt([0]);
  static ONE: MpInt = new MpInt([1]);
}

function u32ToHex(value: u32): string {
  const r = '00000000' + value.toString(16).toUpperCase();
  return r.substr(r.length - 8);
}
