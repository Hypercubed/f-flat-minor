export function assertSame<A, B>(a: A, b: B, msg: string = 'Assert Same'): void {
  expect<string>(`${a}`).toBe(`${b}`);
}
