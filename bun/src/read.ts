import fs from "node:fs";

export function readStdin() {
  return new Uint8Array(fs.readFileSync(process.stdin.fd));
}
