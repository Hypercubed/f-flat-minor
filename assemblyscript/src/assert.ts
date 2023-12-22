export function assert(condition: boolean, msg: string = 'Assert'): void {
  if (!condition) {
    throw new Error(msg);
  }
}

export function assertEquals<T>(a: T, b: T, msg: string = 'Assert Equal'): void {
  assert(a === b, `${msg}: ${a} !== ${b}`);
}

export function assertSame<A, B>(a: A, b: B, msg: string = 'Assert Same'): void {
  assert(`${a}` == `${b}`, `${msg}: ${a} != ${b}`);
}
