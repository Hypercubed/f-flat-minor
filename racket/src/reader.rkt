#lang br
(require ff/src/parser ff/src/tokenizer ff/src/preprocess)

(define (read-syntax path port)
  (define code (preprocess path port))
  (define in (open-input-string code path))
  (define s-exprs (parse in (make-tokenizer in path)))
  (define module-datum `(module ff-mod ff/src/expander ,s-exprs))
  (datum->syntax #f module-datum))
(provide read-syntax)
