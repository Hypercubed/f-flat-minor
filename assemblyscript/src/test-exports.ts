import { MpZ } from "./mp";

export function __int(_a: string): string {
  return MpZ.from(_a).toString();
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
  const c = a / b

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