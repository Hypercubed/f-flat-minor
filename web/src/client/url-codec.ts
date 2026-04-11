import { strToU8, strFromU8, zlibSync, unzlibSync } from "fflate";

function toBase64Url(bytes: Uint8Array): string {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function fromBase64Url(text: string): Uint8Array | null {
  try {
    const base64 = text.replace(/-/g, "+").replace(/_/g, "/")
      + "=".repeat((4 - (text.length % 4 || 4)) % 4);
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    return bytes;
  } catch {
    return null;
  }
}

export function encodeCodeForUrlParam(source: string): string | null {
  try {
    return `c64.${toBase64Url(zlibSync(strToU8(source)))}`;
  } catch {
    return null;
  }
}

export function decodeCodeFromUrlParam(value: string | null): string | null {
  if (!value) {
    return null;
  }

  if (value.startsWith("txt.")) {
    // URLSearchParams serializes spaces as "+" when legacy hash URLs are
    // normalized into route query params, so accept both forms here.
    return decodeURIComponent(value.slice(4).replace(/\+/g, "%20"));
  }

  if (value.startsWith("b64.")) {
    const bytes = fromBase64Url(value.slice(4));
    if (!bytes) {
      return null;
    }
    return strFromU8(bytes);
  }

  if (value.startsWith("c64.")) {
    const bytes = fromBase64Url(value.slice(4));
    if (!bytes) {
      return null;
    }
    return strFromU8(unzlibSync(bytes));
  }

  return null;
}
