#lang racket

(require ff/globals ff/lang/runner)

(define (ff-run-file filename)
  (define ns (make-base-namespace))

  ;; parse file
  (define module-syntax
    (call-with-input-file* filename
      (lambda (in)
        (read-syntax filename in))))

  ;;; eval module form in a namespace with racket/base
  (eval module-syntax ns)

  (eval `(require ff/globals) ns)   
  (eval `(*trace* ',(*trace*)) ns)

  ;; require the module in the namespace to run it
  (define datum (car (cdr (syntax->datum module-syntax))))

  (eval `(require ',datum) ns)   
)
(provide ff-run-file)
