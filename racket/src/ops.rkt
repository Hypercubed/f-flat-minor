#lang br/quicklang

(define op_nop 0)
(define op_eval 1)
(define op_putc 2)
;;; (define op_getc 3)
(define op_drop 8)
(define op_pushr 14)
(define op_pullr 15)
(define op_shiftr 16)
(define op_shiftl 17)
(define op_clr 24)
;;; rand
;;; exit
(define op_dup (char->integer #\!))
(define op_depth (char->integer #\#))
(define op_swap (char->integer #\$))
(define op_mod  (char->integer #\%))
(define op_and  (char->integer #\&))
;;; stash
;;; fetch
(define op_mul  (char->integer #\*))
(define op_add  (char->integer #\+))
(define op_sub  (char->integer #\-))
(define op_dump (char->integer #\.))
(define op_div  (char->integer #\/))
(define op_mark (char->integer #\:))
(define op_def  (char->integer #\;))
(define op_lt  (char->integer #\<))
(define op_eq  (char->integer #\=))
(define op_gt  (char->integer #\>))
(define op_when (char->integer #\?))
;;; bra
;;; ket
(define op_pow  (char->integer #\^))
(define op_or   (char->integer #\|))
(define op_not  (char->integer #\~))

(provide op_add op_sub op_mul op_div op_pow op_and op_or op_not op_lt op_eq op_gt op_when op_mark op_def op_drop op_pushr op_pullr op_shiftr op_shiftl op_clr op_dup op_depth op_swap op_mod op_eval op_putc op_dump op_nop)
