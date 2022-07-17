#lang br
(require "parser.rkt" "tokenizer.rkt" brag/support)

(define str "x: -11 22 333 add+ 'hello' [world] [ x ] ;")

(parse-to-datum (apply-tokenizer make-tokenizer str))