#lang br/quicklang
(require "parser.rkt" "tokenizer.rkt")

(define (read-syntax path port)
  (define parse-tree (parse path (make-tokenizer port path)))
  (define module-datum `(module mod ff/src/expander
                          ,parse-tree))
  (datum->syntax #f module-datum))
(provide read-syntax)
