#lang br

(require "lexer.rkt")

(define (make-tokenizer ip)
  (port-count-lines! ip)
  (define (next-token) (ff-lexer ip))
  next-token)

(provide make-tokenizer)
