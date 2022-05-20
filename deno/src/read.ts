export function readStdin() {
  let bin = new Uint8Array();

  while (true) {
    const buf = new Uint8Array(1024);
    const n = Deno.stdin.readSync(buf);

    if (n === null) {
      break;
    }

    bin = Uint8Array.from([...bin, ...buf.subarray(0, n)]);
  }

  return bin;
}