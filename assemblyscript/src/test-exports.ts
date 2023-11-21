import { MpZ } from "./mp";

export function __int(_a: string): string {
  return MpZ.from(_a).toString();
}

export function __shl(_a: string, _b: u32): string {
  const a = MpZ.from(_a);
  return a._shl(_b).toString();
}

export function __add(_a: string, _b: string): string {
  const a = MpZ.from(_a);
  const b = MpZ.from(_b);
  return (a + b).toString();
}

export function __mul(_a: string, _b: string): string {
  const a = MpZ.from(_a);
  const b = MpZ.from(_b);
  return (a * b).toString();
}

export function __div(_a: string, _b: string): string {
  const a = MpZ.from(_a);
  const b = MpZ.from(_b);
  const c = a / b;

  return c.toString();
}

export function __sub(_a: string, _b: string): string {
  const a = MpZ.from(_a);
  const b = MpZ.from(_b);
  return (a - b).toString();
}

export function __cmp(_a: string, _b: string): i32 {
  const a = MpZ.from(_a);
  const b = MpZ.from(_b);
  return a.cmp(b);
}

function fact(n: u32): MpZ {
  let a = MpZ.from(1);
  for (let i: u32 = 1; i <= n; ++i) {
    a *= MpZ.from(i);
  }
  return a;
}

export function __fact(n: u32): string {
  return fact(n).toString();
}

export function __factDiv(_a: u32, _b: u32): string {
  const a = fact(_a);
  const b = fact(_b);
  return (a / b).toString();
}
