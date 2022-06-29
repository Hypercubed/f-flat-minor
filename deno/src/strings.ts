export function unescapeString(str: string): string {
  // convert \U and 6 digit escapes to characters
  str = str.replace(/\\U([A-Fa-f0-9]{8})/g, (_, parens) =>
    hex2char(parens)
  );

  // convert \u and 4 digit escapes to characters
  str = str.replace(/\\u([A-Fa-f0-9]{4})/g, (_, parens) =>
    hex2char(parens)
  );

  return str
    .replace(/\\0/g, "\0")
    .replace(/\\b/g, "\b")
    .replace(/\\t/g, "\t")
    .replace(/\\n/g, "\n")
    .replace(/\\v/g, "\v")
    .replace(/\\f/g, "\f")
    .replace(/\\r/g, "\r")
    .replace(/\\'/g, `'`)
    .replace(/\\"/g, '"')
    .replace(/\\s/g, " ")
    .replace(/\\\\/g, "\\");
}

function hex2char(hex: string): string {
  // converts a single hex number to a character
  // note that no checking is performed to ensure that this is just a hex number, eg. no spaces etc
  // hex: string, the hex codepoint to be converted

  let result = '';
  let n = parseInt(hex, 16);
  if (n <= 0xffff) {
    result += String.fromCharCode(n);
  } else if (n <= 0x10ffff) {
    n -= 0x10000;
    result +=
      String.fromCharCode(0xd800 | (n >> 10)) +
      String.fromCharCode(0xdc00 | (n & 0x3ff));
  } else {
    result += `hex2Char error: Code point out of range: ${dec2hex(n)}`;
  }
  return result;
}

function dec2hex(x: number): string {
  return (x + 0).toString(16).toUpperCase();
}