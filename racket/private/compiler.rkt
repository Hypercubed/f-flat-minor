#lang br/quicklang

(require "../globals.rkt" "ops.rkt" "vlq.rkt")
(require (for-syntax racket/list))
(require (for-syntax "../globals.rkt" "ops.rkt"))

(define-macro (module-begin . PARSE-TREE)
  #`(#%module-begin
    (display HEADER)
    (display (encode . PARSE-TREE))
  ))
(provide (rename-out [module-begin #%module-begin]))

(define-macro (ff-program EXPR ...)
  #`(flatten (list EXPR ...)))

(define-macro (ff-marker ID)
  #'(list ID 0 op_mark 1))

(define-macro (ff-push VAL)
  #'(list VAL 0))

(define-macro (ff-call OP)
  #'(list OP 1))

(define-macro (ff-string STR)
  (define chars (map char->integer (string->list (syntax->datum #'STR))))
  (define cmds (flatten (map (lambda (x) (list x 0)) chars)))
  #`(list #,@cmds))

;; Double-quoted: sugar for [ '...' ] — BRA, per-char pushes, KET (same escapes as STR).
(define-macro (ff-string-dq STR)
  (define chars (map char->integer (string->list (syntax->datum #'STR))))
  (define cmds (flatten (map (lambda (x) (list x 0)) chars)))
  #`(list op_bra 1 #,@cmds op_ket 1))

(define-macro (ff-bra . _)
  #'(list op_bra 1))

(define-macro (ff-ket . _)
  #'(list op_ket 1))

(provide ff-program ff-marker ff-push ff-call ff-string ff-string-dq ff-bra ff-ket)
