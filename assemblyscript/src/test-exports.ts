import { MpZ } from "./mp";

export function __int(_a: string): string {
  const a = MpZ.from(_a);
  return a.toString();
}

export function __add(_a: string, _b: string): string {
  const a = MpZ.from(_a);
  const b = MpZ.from(_b);
  const c: MpZ = a.add(b);

  return c.toString();
}

export function __mul(_a: string, _b: string): string {
  const a = MpZ.from(_a);
  const b = MpZ.from(_b);
  const c: MpZ = a.mul(b);

  return c.toString();
}

export function __div(_a: string, _b: string): string {
  const a = MpZ.from(_a);
  const b = MpZ.from(_b);
  const c: MpZ = a.div(b);

  return c.toString();
}

export function __sub(_a: string, _b: string): string {
  const a = MpZ.from(_a);
  const b = MpZ.from(_b);
  const c: MpZ = a.sub(b);

  return c.toString();
}

export function __cmp(_a: string, _b: string): i32 {
  const a = MpZ.from(_a);
  const b = MpZ.from(_b);
  const c: i32 = a.cmp(b);

  return c;
}