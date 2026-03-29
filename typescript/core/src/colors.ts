function supportsColor(): boolean {
  const tty =
    (globalThis as { Deno?: { stdout?: { isTerminal(): boolean } } }).Deno?.stdout?.isTerminal?.() ??
    (globalThis as { process?: { stdout?: { isTTY?: boolean } } }).process?.stdout?.isTTY ??
    false;

  return Boolean(tty);
}

function color(code: number, text: string): string {
  if (!supportsColor()) {
    return text;
  }

  return `\x1b[${code}m${text}\x1b[0m`;
}

export function blue(text: string): string {
  return color(34, text);
}

export function green(text: string): string {
  return color(32, text);
}

export function cyan(text: string): string {
  return color(36, text);
}

export function red(text: string): string {
  return color(31, text);
}
