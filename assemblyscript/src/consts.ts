export enum Op {
  NOP = 0,
  CALL = 1,
  PUTC = 2,
  PUTN = 5,
  DROP = 8,
  PUSHR = 14,
  PULLR = 15,
  CLR = 24,
  EXIT = 27,
  DUP = "!".charCodeAt(0),
  DEPTH = "#".charCodeAt(0),
  SWAP = "$".charCodeAt(0),
  MUL = "*".charCodeAt(0),
  ADD = "+".charCodeAt(0),
  SUB = "-".charCodeAt(0),
  DUMP = ".".charCodeAt(0),
  DIV = "/".charCodeAt(0),
  MARK = ":".charCodeAt(0),
  DEF = ";".charCodeAt(0),
  LT = "<".charCodeAt(0),
  EQ = "=".charCodeAt(0),
  GT = ">".charCodeAt(0),
  WHEN = "?".charCodeAt(0),
  BRA = "[".charCodeAt(0),
  KET = "]".charCodeAt(0)
  // TODO:
  // AND
  // OR
  // MOD
  // POW
  // NOT
  // EXIT
  // RAND
  // CLOCK
}