const SIGNIFICANT_BITS = 7n;
const CONTINUE = 0x80n;
const REST_MASK = 0x7fn;

function encodeUnsignedLeb128(value: bigint): number[] {
  value |= 0n;
  const result = [];
  do {
    let byte = value & REST_MASK;
    value >>= SIGNIFICANT_BITS;
    if (value !== 0n) {
      byte |= CONTINUE
    }
    result.push(Number(byte));
  } while (value !== 0n);

  return result;
}

function encodeSignedLeb128(value: bigint): number[] {
  const sign = value < 0n;
  value = value << 1n;
  return encodeUnsignedLeb128(sign ? -value + 1n : value);
}

function decodeUnsignedLeb128(input: number[]): bigint {
  let result = 0n;
  let shift = 0n;
  while (true) {
    const byte = input.shift() || 0;
    result |= (BigInt(byte) & REST_MASK) << shift;
    if ((0x80 & byte) === 0) {
      break;
    }
    shift += 7n;
  }
  return BigInt(result);
}

function decodeSignedLeb128(input: number[]): bigint {
  const result = decodeUnsignedLeb128(input);
  const sign = result & 1n;
  return (result >> 1n) * (sign === 0n ? 1n : -1n);
}

export function encodeBigIntArray(bigIntArray: bigint[]): number[] {
  return bigIntArray.flatMap(value => {
    return Array.from(encodeSignedLeb128(value));
  });
}

export function decodeByteArray(byteArray: number[]): bigint[] {
  const result = [];
  while (byteArray.length) {
    result.push(decodeSignedLeb128(byteArray));
  }
  return result;
}
