#lang racket/base

(require ff/lang/runner)

(define (ff-eval code [ns (make-base-namespace)] [path "."])
  (define port (open-input-string code))
  (define module-syntax (read-syntax path port))

  ;;; eval module form in a namespace with racket/base
  (eval module-syntax ns)

  ;;; require the module in the namespace to run it
  (define datum (car (cdr (syntax->datum module-syntax))))
  (eval `(require ',datum) ns))

(provide ff-eval)