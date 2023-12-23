import { MpZ } from './mp';

export function int(_a: string): string {
  return MpZ.from(_a).toHex();
}

export function dec(_a: string): string {
  return MpZ.from(_a).toDecimal();
}

export function shl(_a: string, _b: u32): string {
  const a = MpZ.from(_a);
  return a._shl(_b).toHex();
}

export function add(_a: string, _b: string): string {
  const a = MpZ.from(_a);
  const b = MpZ.from(_b);
  return (a + b).toHex();
}

export function mul(_a: string, _b: string): string {
  const a = MpZ.from(_a);
  const b = MpZ.from(_b);
  return (a * b).toHex();
}

export function div(_a: string, _b: string): string {
  const a = MpZ.from(_a);
  const b = MpZ.from(_b);
  const c = a / b;

  return c.toHex();
}

export function pow(_a: string, _b: string): string {
  const a = MpZ.from(_a);
  const b = MpZ.from(_b);
  const c = a.pow(b);

  return c.toHex();
}

export function sub(_a: string, _b: string): string {
  const a = MpZ.from(_a);
  const b = MpZ.from(_b);
  return (a - b).toHex();
}

export function cmp(_a: string, _b: string): i32 {
  const a = MpZ.from(_a);
  const b = MpZ.from(_b);
  return a.cmp(b);
}

export function inv(_a: string, k: u32): string {
  const a = MpZ.from(_a);
  return a.inv(k).toHex();
}

function __fact(n: u32): MpZ {
  let a = MpZ.from(1);
  for (let i: u32 = 1; i <= n; ++i) {
    a *= MpZ.from(i);
  }
  return a;
}

export function fact(n: u32): string {
  return __fact(n).toHex();
}

export function factDiv(_a: u32, _b: u32): string {
  const a = __fact(_a);
  const b = __fact(_b);
  return (a / b).toHex();
}
