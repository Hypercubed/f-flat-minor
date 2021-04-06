export enum OpCodes {
  NOP = 0,
  CALL = 1,
  DEF =  ';'.charCodeAt(0),
  CLS =  '~'.charCodeAt(0),
  PRN =  '.'.charCodeAt(0),
  PUTC = '@'.charCodeAt(0),
  DROP = '$'.charCodeAt(0),
  SWAP = '%'.charCodeAt(0),
  DUP =  '!'.charCodeAt(0),
  ADD =  '+'.charCodeAt(0),
  SUB =  '-'.charCodeAt(0),
  MUL =  '*'.charCodeAt(0),
  DIV =  '/'.charCodeAt(0),
  EQ =   '='.charCodeAt(0),
  IF =   '?'.charCodeAt(0),
  DIP =  '^'.charCodeAt(0)
}