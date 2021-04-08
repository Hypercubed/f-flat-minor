const SIGNIFICANT_BITS = 7n;
const CONTINUE = 1n << SIGNIFICANT_BITS;
const REST_MASK = CONTINUE - 1n;

function encodeSignedLeb128FromInt32(value: bigint): number[] {
  value |= 0n;
  const result = [];
  while (true) {
    const byte = value & REST_MASK;
    value >>= SIGNIFICANT_BITS;
    if (
      (value === 0n && (byte & 64n) === 0n) ||
      (value === -1n && (byte & 64n) !== 0n)
    ) {
      result.push(Number(byte));
      return result;
    }
    result.push(Number(byte | CONTINUE));
  }
}

function decodeSignedLeb128(input: number[]): bigint {
  let result = 0;
  let shift = 0;
  while (true) {
    const byte = input.shift() || 0;
    result |= (byte & 0x7f) << shift;
    shift += 7;
    if ((0x80 & byte) === 0) {
      if (shift < 32 && (byte & 0x40) !== 0) {
        return BigInt(result | (~0 << shift));
      }
      return BigInt(result);
    }
  }
}

export function encodeBigIntArray(bigIntArray: bigint[]): number[] {
  return bigIntArray.flatMap(encodeSignedLeb128FromInt32);
}

export function decodeByteArray(byteArray: number[]): bigint[] {
  const result = [];
  while (byteArray.length) {
    result.push(decodeSignedLeb128(byteArray));
  }
  return result;
}
