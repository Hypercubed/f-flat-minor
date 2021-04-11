export enum OpCodes {
  NOP = 0,
  CALL = 1,
  PUTC = 2,
  GETC = 3,
  DROP = 8,
  PUSHR = 14,
  PULLR = 15,
  CLR = 24,
  SDEF = ':'.charCodeAt(0),
  DEF = ';'.charCodeAt(0),
  MARK = '['.charCodeAt(0),
  UNMARK = ']'.charCodeAt(0),
  PRN = '.'.charCodeAt(0),
  SWAP = '$'.charCodeAt(0),
  DUP = '!'.charCodeAt(0),
  ADD = '+'.charCodeAt(0),
  SUB = '-'.charCodeAt(0),
  MUL = '*'.charCodeAt(0),
  DIV = '/'.charCodeAt(0),
  EQ = '='.charCodeAt(0),
  IF = '?'.charCodeAt(0),
  MOD = '%'.charCodeAt(0),
  DEPTH = '#'.charCodeAt(0),
  POW = '^'.charCodeAt(0)
}

export const systemWords = {
  'nop': OpCodes.NOP,
  'eval': OpCodes.CALL,
  ':': OpCodes.SDEF,
  ';': OpCodes.DEF,
  '[': OpCodes.MARK,
  ']': OpCodes.UNMARK,
  'clr': OpCodes.CLR,
  '.': OpCodes.PRN,
  'putc': OpCodes.PUTC,
  'getc': OpCodes.GETC,
  'drop': OpCodes.DROP,
  'swap': OpCodes.SWAP,
  'dup': OpCodes.DUP,
  '+': OpCodes.ADD,
  '-': OpCodes.SUB,
  '*': OpCodes.MUL,
  '/': OpCodes.DIV,
  '=': OpCodes.EQ,
  '?': OpCodes.IF,
  '%': OpCodes.MOD,
  'q<': OpCodes.PUSHR,
  'q>': OpCodes.PULLR,
  'depth': OpCodes.DEPTH,
  '^': OpCodes.POW
}

// CMP/CMPZ
// ABS/NEG
// SQRT?
// POW (^)
// EXIT/HALT
// INLINE?
// < > <= >=
// OVER?
