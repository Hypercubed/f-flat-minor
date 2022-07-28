#lang racket/base

(require ff/lang/reader)

(define (ff-eval code [ns (make-base-namespace)] [path "."] #:pp [pp #t])
  (define port (open-input-string code))
  (define module-syntax (read-syntax path port #:pp pp))
  (define datum (car (cdr (syntax->datum module-syntax))))
  (eval module-syntax ns)
  (eval `(require ',datum) ns)
)
(provide ff-eval)