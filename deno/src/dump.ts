function toPrintableCharacter(n: number) {
  if (n < 32 || (n > 126 && n < 161)) {
    return ".";
  }
  return String.fromCharCode(n);
}

export function base64ToArrayBuffer(base64: string): Uint8Array {
  return Uint8Array.from(atob(base64), c => c.charCodeAt(0))
}

export function dumpByteArray(byteArray: Uint8Array) {
  for (let i = 0; i < byteArray.length; i += 16) {
    const c = [...byteArray.slice(i, i + 16)];
    const s: string[] = c.map(toPrintableCharacter);
    const h = c.map((cc) => cc.toString(16).toUpperCase().padStart(2, "0"));
    console.log(h.join(" ").padEnd(48, " "), s.join(""));
  }

  console.log(byteArray.length, "bytes");
  console.log();
}
