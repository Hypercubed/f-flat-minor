#lang br

(require syntax/strip-context)
(require ff/private/parser ff/private/tokenizer ff/private/preprocess)

(define (ff-read in)
  (syntax->datum
   (ff-read-syntax #f in)))

(define (ff-read-syntax path port #:pp [pp #t])
  (when pp
    (define code (preprocess path port))
    (set! port (open-input-string code path))
  )
  (define s-exprs (parse port (make-tokenizer port path)))
  (define module-datum `(module ff-mod ff/private/expander ,s-exprs))
  (strip-context (datum->syntax #f module-datum)))

(provide (rename-out [ff-read read]
                     [ff-read-syntax read-syntax])
        get-info)

(define (get-info port mod line col pos)
    (lambda (key default)
      (case key
        [(module-language) "private/expander.rkt"]
        [else default])))