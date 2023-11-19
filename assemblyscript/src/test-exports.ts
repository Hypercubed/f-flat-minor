import { MpInt } from "./mp";

export function int(_a: string): string {
  const a = MpInt.from(_a);
  return a.toString();
}

export function add(_a: string, _b: string): string {
  const a = MpInt.from(_a);
  const b = MpInt.from(_b);
  const c: MpInt = a.add(b);

  return c.toString();
}

export function mul(_a: string, _b: string): string {
  const a = MpInt.from(_a);
  const b = MpInt.from(_b);
  const c: MpInt = a.mul(b);

  return c.toString();
}

export function sub(_a: string, _b: string): string {
  const a = MpInt.from(_a);
  const b = MpInt.from(_b);
  const c: MpInt = a.sub(b);

  return c.toString();
}

export function cmp(_a: string, _b: string): i32 {
  const a = MpInt.from(_a);
  const b = MpInt.from(_b);
  const c: i32 = a.cmp(b);

  return c;
}