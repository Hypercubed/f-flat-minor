#lang br/quicklang

(require ff/src/ops)

(define system_symbols (hash
  "nop" op_nop
  "eval" op_eval
  "putc" op_putc
  ;;; "getc" op_getc
  "putn" op_putn
  ;;; clock
  "drop" op_drop
  "q<" op_pushr
  "q>" op_pullr
  ">>" op_shiftr
  "<<" op_shiftl
  "clr" op_clr
  "rand" op_rand
  ;;; exit 
  "dup" op_dup
  "depth" op_depth
  "swap" op_swap
  "%" op_mod
  "&" op_and
  ;;; stash
  ;;; fetch 
  "*" op_mul
  "+" op_add
  "-" op_sub
  "." op_dump
  "/" op_div
  ":" op_mark
  ";" op_def
  "<" op_lt
  "=" op_eq
  ">" op_gt
  "?" op_when
  "[" op_bra
  "]" op_ket
  "^" op_pow
  "|" op_or
  "~" op_not
))

(provide system_symbols)