#lang br/quicklang

(require "./ops.rkt")

(define symbols (make-hash))
(hash-set! symbols "nop" op_nop)
(hash-set! symbols "eval" op_eval)
(hash-set! symbols "putc" op_putc)
;;; (hash-set! symbols "getc" op_getc)
(hash-set! symbols "putn" op_putn)
;;; clock
(hash-set! symbols "drop" op_drop)
(hash-set! symbols "q<" op_pushr)
(hash-set! symbols "q>" op_pullr)
(hash-set! symbols ">>" op_shiftr)
(hash-set! symbols "<<" op_shiftl)
(hash-set! symbols "clr" op_clr)
(hash-set! symbols "rand" op_rand)
;;; exit 
(hash-set! symbols "dup" op_dup)
(hash-set! symbols "depth" op_depth)
(hash-set! symbols "swap" op_swap)
(hash-set! symbols "%" op_mod)
(hash-set! symbols "&" op_and)
;;; stash
;;; fetch 
(hash-set! symbols "*" op_mul)
(hash-set! symbols "+" op_add)
(hash-set! symbols "-" op_sub)
(hash-set! symbols "." op_dump)
(hash-set! symbols "/" op_div)
(hash-set! symbols ":" op_mark)
(hash-set! symbols ";" op_def)
(hash-set! symbols "<" op_lt)
(hash-set! symbols "=" op_eq)
(hash-set! symbols ">" op_gt)
(hash-set! symbols "?" op_when)
;;; bra 
;;; ket 
(hash-set! symbols "^" op_pow)
(hash-set! symbols "|" op_or)
(hash-set! symbols "~" op_not)

(provide symbols)