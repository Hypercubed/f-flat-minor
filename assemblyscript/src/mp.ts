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

class MpInt {
  constructor(public data: u32[], public neg: boolean = false) {
    this.data = trim(data);
  }

  isNeg(): boolean {
    return this.neg;
  }

  abs(): MpInt {
    return new MpInt(this.data);
  }

  // unsigned add
  add<T>(_rhs: T): MpInt {
    const rhs = MpInt.from(_rhs);
    const lhs: MpInt = this;

    const len = lhs.data.length > rhs.data.length ? lhs.data.length : rhs.data.length;
    const result: u32[] = new Array(len);

    let carry: u64 = 0;
    for (let i: i32 = 0; i < len; ++i) {
      const rhs_limb: u64 = rhs.data.length > i ? u64(rhs.data[i]) : 0;
      const lhs_limb: u64 = lhs.data.length > i ? u64(lhs.data[i]) : 0;

      const doubleLimb: u64 = carry + rhs_limb + lhs_limb;
      carry = high32(doubleLimb);
      result[i] = low32(doubleLimb);
    }

    if (carry !== 0) {
      result.push(u32(carry));
    }

    return new MpInt(trim(result));
  }

  // unsigned sub
  sub<T>(_rhs: T): MpInt {
    const rhs = MpInt.from(_rhs);
    let data = rhs.data;

    data = data.map((v: u32) => ~v);  // ones' complement of rhs
    const r = this.add(new MpInt(data)).add(1);
    const d = r.data
    d.pop();  // remove carry

    return new MpInt(trim(d), false);
  }

  // signed mul
  mul<T>(_rhs: T): MpInt {
    const rhs = MpInt.from(_rhs);
    const lhs: MpInt = this;

    const s_lhs = lhs.neg;
    const s_rhs = rhs.neg;

    const q = lhs.data.length;
    const p = rhs.data.length;
    const result: u32[] = new Array(q + p);

    for (let i: i32 = 0; i < q; ++i) {
      let carry: u64 = 0;
      for (let j: i32 = 0; j < p; ++j) {
        const k = i + j;
        const doubleLimb: u64 = carry + u64(lhs.data[i]) * u64(rhs.data[j]) + u64(result[k]);
        carry = high32(doubleLimb);
        result[k] = low32(doubleLimb);
      }
      result[i + p] = low32(carry);
    }

    // process.stdout.write(`${result}\n`);
    return new MpInt(trim(result), s_lhs !== s_rhs);
  }

  toString(): string {
    const result: string[] = [];

    for (let i: i32 = this.data.length - 1; i >= 0; --i) {
      result.push(u32ToHex(this.data[i]));
    }

    let r = result.join('');

    while (r.length > 1 && r.substr(0, 1) === '0') {
      r = r.substr(1);
    }

    r = '0x' + r;

    if (this.neg) {
      r = '-' + r;
    }

    return r;
  }

  private reduce(): MpInt {
    this.data = trim(this.data);
    return this;
  }

  static from<T>(val: T): MpInt {
    if (val instanceof MpInt) return val;
    if (val instanceof i32) return fromI32(val as i32);
    if (val instanceof u32) return fromU32(val as u32);
    if (val instanceof i64) return fromI64(val as i64);
    if (val instanceof u64) return fromU64(val as u64);

    throw new TypeError("Unsupported generic type " + nameof<T>(val));
  }
}

function u32ToHex(value: u32): string {
  const r = '00000000' + value.toString(16).toUpperCase();
  return r.substr(r.length - 8);
}

function testAdd(a: MpInt, b: MpInt): void {
  const c: MpInt = a.add(b);

  process.stdout.write(`${a} + ${b} = ${c}\n`);
}

function testSub(a: MpInt, b: MpInt): void {
  const c: MpInt = a.sub(b);

  process.stdout.write(`${a} - ${b} = ${c}\n`);
}

function testMul(a: MpInt, b: MpInt): void {
  const c: MpInt = a.mul(b);

  process.stdout.write(`${a} * ${b} = ${c}\n`);
}

// process.stdout.write(`FF = ${MpInt.from(0xFF)}\n`);
// process.stdout.write(`-FF = ${MpInt.from(-0xFF)}\n`);

// process.stdout.write(`FFFFFFFF = ${MpInt.from(0xFFFFFFFF)}\n`);
// process.stdout.write(`-FFFFFFFF = ${MpInt.from(-0xFFFFFFFF)}\n`);

// process.stdout.write('\n');

// testAdd(MpInt.from(0x0), MpInt.from(0x0));
// testAdd(MpInt.from(0xBE00), MpInt.from(0x00EF));
// testAdd(MpInt.from(0xDEAD0000), MpInt.from(0x0000BEEF));
// testAdd(MpInt.from(0xFFFFFFFF), MpInt.from(0xFFFFFFFF));

// testAdd(MpInt.from(0xDEADBEEF00000000 as u64), MpInt.from(0x00000000FFFFFFFF as u64));
// testAdd(MpInt.from(0xDEAD0000FFFFFFFF as u64), MpInt.from(0x0000BEEFFFFFFFFF as u64));

// process.stdout.write('\n');

process.stdout.write('\n');

testSub(MpInt.from(0x0), MpInt.from(0x0));
testSub(MpInt.from(0xFFFF), MpInt.from(0x00FF));
testSub(MpInt.from(0xFFFFFFFF), MpInt.from(0x0000FFFF));
testSub(MpInt.from(0xFFFFFF), MpInt.from(0x00FFFF));
testSub(MpInt.from(<u64>0xFFFF_FFFF_FFFF), MpInt.from(0x0000_0000_FFFF as u64));
testSub(MpInt.from(<u64>0xFFFF_FFFF_FFFF_FFFF), MpInt.from(0xF0F0_F0F0_F0F0_F0F0 as u64));
testSub(MpInt.from(<u64>0x9999_8888_7777_6666), MpInt.from(0x6666_7777_8888_9999 as u64));
testSub(MpInt.from(<u64>0xFEDCBA987654321), MpInt.from(0x123456789ABCDEF as u64));

process.stdout.write('\n');

// testMul(MpInt.from(0x0), MpInt.from(0x0));
// testMul(MpInt.from(0x1), MpInt.from(0x1));
// testMul(MpInt.from(0x10), MpInt.from(0x10));
// testMul(MpInt.from(u32(0xFFFF)), MpInt.from(u32(0xFFFF)));
// testMul(MpInt.from(0xFFFFFFFF), MpInt.from(0xFFFFFFFF));

// testMul(MpInt.from(-0x10), MpInt.from(-0x10));
// testMul(MpInt.from(0x10), MpInt.from(-0x10));
// testMul(MpInt.from(-0x10), MpInt.from(0x10));

// process.stdout.write('\n');

// const n = 120;
// let a = MpInt.from(0x1);
// for (let i: i32 = 1; i <= n; ++i) {
//   a = a.mul(MpInt.from(i));
// }

// process.stdout.write(`${n}! = ${a}\n`);

// process.stdout.write(`\n`);