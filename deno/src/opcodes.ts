export enum OpCodes {
  NOP = 0,
  CALL = 1,
  DEF = ';'.charCodeAt(0),
  CLR = '~'.charCodeAt(0),
  PRN = '.'.charCodeAt(0),
  PUTC = '@'.charCodeAt(0),
  GETC = 'g'.charCodeAt(0),
  DROP = '$'.charCodeAt(0),
  SWAP = '%'.charCodeAt(0),
  DUP = '!'.charCodeAt(0),
  ADD = '+'.charCodeAt(0),
  SUB = '-'.charCodeAt(0),
  MUL = '*'.charCodeAt(0),
  DIV = '/'.charCodeAt(0),
  EQ = '='.charCodeAt(0),  // Use cmp
  IF = '?'.charCodeAt(0),
  MOD = 'm'.charCodeAt(0), // make %
  PUSHR = 's'.charCodeAt(0),
  PULLR = 'u'.charCodeAt(0),
  DEP = 'd'.charCodeAt(0)
}

export const systemWords = {
  'nop': OpCodes.NOP,
  'eval': OpCodes.CALL,
  ';': OpCodes.DEF,
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
  'depth': OpCodes.DEP
}

// CMP/CMPZ
// ABS/NEG
// SQRT?
// POW (^)
// EXIT/HALT
// INLINE?
// < > <= >=
// OVER?
