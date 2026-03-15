import { deflateSync, inflateSync } from "fflate";

const encoder = new TextEncoder();
const decoder = new TextDecoder();

export const TXT_PARAM_PREFIX = "txt.";
export const B64_PARAM_PREFIX = "b64.";
export const C64_PARAM_PREFIX = "c64.";
export const TXT_MAX = 45;
export const C64_MIN = 70;

export interface UrlCodeEncodeOps {
  encodeText: (source: string) => string;
  encodeBase64: (source: string) => string;
  encodeCompressed: (source: string) => string;
}

function isAscii(value: string): boolean {
  for (let i = 0; i < value.length; i += 1) {
    if (value.charCodeAt(i) > 0x7f) {
      return false;
    }
  }

  return true;
}

function encodeBase64UrlBytes(bytes: Uint8Array): string {
  let binary = "";

  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }

  return btoa(binary)
    .replaceAll("+", "-")
    .replaceAll("/", "_")
    .replace(/=+$/g, "");
}

function decodeBase64UrlBytes(value: string): Uint8Array {
  const base64 = value.replaceAll("-", "+").replaceAll("_", "/");
  const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, "=");
  const binary = atob(padded);
  return Uint8Array.from(binary, (char) => char.charCodeAt(0));
}

function encodeBase64UrlUtf8(value: string): string {
  return encodeBase64UrlBytes(encoder.encode(value));
}

function decodeBase64UrlUtf8(value: string): string {
  return decoder.decode(decodeBase64UrlBytes(value));
}

function encodeCompressedBase64UrlUtf8(value: string): string {
  const compressed = deflateSync(encoder.encode(value), { level: 9 });
  return encodeBase64UrlBytes(compressed);
}

function decodeCompressedBase64UrlUtf8(value: string): string {
  const compressed = decodeBase64UrlBytes(value);
  return decoder.decode(inflateSync(compressed));
}

const defaultEncodeOps: UrlCodeEncodeOps = {
  encodeText(source) {
    return `${TXT_PARAM_PREFIX}${source}`;
  },
  encodeBase64(source) {
    return `${B64_PARAM_PREFIX}${encodeBase64UrlUtf8(source)}`;
  },
  encodeCompressed(source) {
    return `${C64_PARAM_PREFIX}${encodeCompressedBase64UrlUtf8(source)}`;
  },
};

function tryEncode(
  source: string,
  encode: (value: string) => string,
): string | null {
  try {
    return encode(source);
  } catch {
    return null;
  }
}

export function encodeCodeForUrlParam(
  source: string,
  ops?: Partial<UrlCodeEncodeOps>,
): string | null {
  const encodeOps = {
    ...defaultEncodeOps,
    ...ops,
  };
  const ascii = isAscii(source);
  const canUseText = ascii && source.length <= TXT_MAX;
  const shouldPreferCompressed = source.length >= C64_MIN;

  if (canUseText) {
    return tryEncode(source, encodeOps.encodeText);
  }

  if (shouldPreferCompressed) {
    const compressed = tryEncode(source, encodeOps.encodeCompressed);

    if (compressed !== null) {
      return compressed;
    }
  }

  const base64 = tryEncode(source, encodeOps.encodeBase64);

  if (base64 !== null) {
    return base64;
  }

  if (ascii) {
    return tryEncode(source, encodeOps.encodeText);
  }

  return null;
}

export function decodeCodeFromUrlParam(paramValue: string | null): string | null {
  if (paramValue === null) {
    return null;
  }

  if (paramValue.startsWith(TXT_PARAM_PREFIX)) {
    return paramValue.slice(TXT_PARAM_PREFIX.length);
  }

  if (paramValue.startsWith(B64_PARAM_PREFIX)) {
    const encoded = paramValue.slice(B64_PARAM_PREFIX.length);

    try {
      return decodeBase64UrlUtf8(encoded);
    } catch {
      return null;
    }
  }

  if (paramValue.startsWith(C64_PARAM_PREFIX)) {
    const encoded = paramValue.slice(C64_PARAM_PREFIX.length);

    try {
      return decodeCompressedBase64UrlUtf8(encoded);
    } catch {
      return null;
    }
  }

  return null;
}
