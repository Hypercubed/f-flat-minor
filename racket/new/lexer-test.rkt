#lang br
(require "lexer.rkt" brag/support)

(define (lex str)
  (apply-port-proc ff-lexer str))

(lex "1 2 3 /* test */ add+ 'Hello' [world]")