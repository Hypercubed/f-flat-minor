#lang racket/base

(require ff/private/lexer brag/support)

(define (make-tokenizer ip [path #f])
  (port-count-lines! ip)
  (lexer-file-path path)
  (define (next-token) (ff-lexer ip))
  next-token)

(provide make-tokenizer)
