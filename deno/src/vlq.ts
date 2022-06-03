const BASE64_ALPHABET =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

const char_to_integer = new Map<string, number>();

BASE64_ALPHABET
	.split('')
	.forEach(function (char, i) {
		char_to_integer.set(char, i);
	});

const VLQ_BASE_SHIFT = 5n;
const VLQ_BASE = 1n << VLQ_BASE_SHIFT; // 0b100000
const VLQ_CONTINUATION_BIT = Number(VLQ_BASE); // 0b100000
const VLQ_BASE_MASK = VLQ_BASE - 1n; // 0b11111n

/**
 * Returns the base 64 VLQ encoded values.
 */
export function encode(integers: bigint[]): string {
  return integers
    .map(vlqEncode)
    .map(base64Encode)
    .join("");
}

/**
 * Decodes the next base 64 VLQ values from the given string
 */
export function decode(base64Vlqs: string): bigint[] {
  return splitVlqs(base64Decode(base64Vlqs)).map(vlqDecode);
}

/**
 * Converts from a two-complement value to a value where the sign bit is
 * placed in the least significant bit.  For example, as decimals:
 *   1 becomes 2 (10 binary), -1 becomes 3 (11 binary)
 *   2 becomes 4 (100 binary), -2 becomes 5 (101 binary)
 */
function toVLQSigned(aValue: bigint): bigint {
  return aValue < 0n
    ? ((-aValue) << 1n) + 1n
    : (aValue << 1n) + 0n;
}

/**
 * Converts to a two-complement value from a value where the sign bit is
 * placed in the least significant bit.  For example, as decimals:
 *   2 (10 binary) becomes 1, 3 (11 binary) becomes -1
 *   4 (100 binary) becomes 2, 5 (101 binary) becomes -2
 */
function fromVLQSigned(aValue: bigint): bigint {
  const isNegative = (aValue & 1n) === 1n;
  const shifted = aValue >> 1n;
  return isNegative
    ? -shifted
    : shifted;
}

/**
 * Returns the VLQ encoded value.
 */
function vlqEncode(x: bigint): number[] {
  x = toVLQSigned(x);
  const sextets = [];
  while (x > 0) {
    let sextet = 0;
    sextet = Number(x & VLQ_BASE_MASK);
    x >>= 5n;
    if (x > 0) {
      sextet |= VLQ_CONTINUATION_BIT;
    }
    sextets.push(sextet);
  }
  return sextets;
}

/**
 * Returns the base 64 VLQ encoded value.
 */
function base64Encode(sextets: number[]) {
  return sextets.map((sextet) => {
    return BASE64_ALPHABET[sextet];
  }).join("");
}

function base64Decode(base64Vlqs: string): number[] {
  return base64Vlqs.split("").map((c) => {
    const sextet = char_to_integer.get(c);
    if (sextet === undefined) {
      throw new Error(`${base64Vlqs} is not a valid base64 encoded VLQ`);
    }
    return sextet;
  });
}

function splitVlqs(sextets: number[]): number[][] {
  const splitVlqs: number[][] = [];
  let vlq: number[] = [];
  sextets.forEach((sextet) => {
    vlq.push(sextet);
    if ((sextet & VLQ_CONTINUATION_BIT) === 0) {
      splitVlqs.push(vlq);
      vlq = [];
    }
  });
  if (vlq.length > 0) {
    throw new Error("Malformed VLQ sequence: The last VLQ never ended.");
  }
  return splitVlqs;
}

function vlqDecode(sextets: number[]): bigint {
  const x = sextets.reverse().reduce((x, sextet) => {
    x <<= 5n;
    x |= BigInt(sextet) & VLQ_BASE_MASK;
    return x;
  }, 0n);
  return fromVLQSigned(x);
}
