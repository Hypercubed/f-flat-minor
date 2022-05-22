import { signed } from "https://unpkg.com/big-varint";

export function encodeBigIntArray(bigIntArray: bigint[]): number[] {
  return bigIntArray.flatMap(value => {
    return Array.from(signed.encode(value, undefined, undefined));
  });
}

export function decodeByteArray(byteArray: number[]): bigint[] {
  const result = [];
  while (byteArray.length) {
    const i = signed.decode(Uint8Array.from(byteArray));
    byteArray.splice(0, signed.encodingLength(i));
    result.push(i);
  }
  return result;
}
