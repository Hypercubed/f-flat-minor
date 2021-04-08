export enum OpCodes {
  NOP = 0,
  CALL = 1, // LIT
  DEF = ";".charCodeAt(0),
  CLR = "~".charCodeAt(0),
  PRN = ".".charCodeAt(0),
  PUTC = "@".charCodeAt(0),
  GETC = "g".charCodeAt(0),
  DROP = "$".charCodeAt(0),
  SWAP = "%".charCodeAt(0),
  DUP = "!".charCodeAt(0),
  ADD = "+".charCodeAt(0),
  SUB = "-".charCodeAt(0),
  MUL = "*".charCodeAt(0),
  DIV = "/".charCodeAt(0),
  EQ = "=".charCodeAt(0),  // Use cmp
  IF = "?".charCodeAt(0),
  DIP = "^".charCodeAt(0),  // change this
  MOD = "m".charCodeAt(0) // make %
}

// CMP/CMPZ
// ABS/NEG
// SQRT?
// POW (^)
// >R R> R@ (return stack)?
// EXIT/HALT
// INLINE?\
// < > <= >=
// MODULO
// GETC
// PUTN
// OVER?
