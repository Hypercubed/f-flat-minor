#lang br
(require ff/src/parser ff/src/tokenizer brag/support)

(define str "x: -11 22 333 add+ 'hello' [world] [ x ] ;")

(parse-to-datum (apply-tokenizer make-tokenizer str))