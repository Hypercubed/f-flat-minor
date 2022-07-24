#lang br
(require ff/private/parser ff/private/tokenizer ff/private/preprocess)

(define (read-syntax path port #:pp [pp #t])
  (when pp
    (define code (preprocess path port))
    (set! port (open-input-string code path))
  )
  (define s-exprs (parse port (make-tokenizer port path)))
  (define module-datum `(module ff-mod ff/private/expander ,s-exprs))
  (datum->syntax #f module-datum))
(provide read-syntax)
