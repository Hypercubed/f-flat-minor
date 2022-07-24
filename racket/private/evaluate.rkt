#lang racket

(require ff/private/reader)

(define (ff-eval code [ns (make-base-namespace)] [path "."] #:pp [pp #t])
  (define port (open-input-string code))
  (define module-syntax (read-syntax path port #:pp pp))
  (eval module-syntax ns)
  (eval `(require ',(second (syntax->datum module-syntax))) ns)
)
(provide ff-eval)