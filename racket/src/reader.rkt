#lang br
(require ff/src/parser ff/src/tokenizer)

(define (read-syntax name port)
  (define s-exprs (parse name (make-tokenizer port name)))
  (define module-datum `(module ff-mod ff/src/expander ,s-exprs))
  (datum->syntax #f module-datum))
(provide read-syntax)
