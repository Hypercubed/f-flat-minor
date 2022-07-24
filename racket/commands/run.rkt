#lang racket

(require ff/lang/reader)

(define (ff-run-file filename #:pp [pp #t])
  (define ns (make-base-namespace))

  ;; parse file
  (define module-syntax
    (call-with-input-file* filename
      (lambda (in)
        (read-syntax filename in #:pp pp))))

  ;;; eval module form in a namespace with racket/base
  (eval module-syntax ns)

  ;; require the module in the namespace to run it
  (eval `(require ',(second (syntax->datum module-syntax))) ns)   
)
(provide ff-run-file)
