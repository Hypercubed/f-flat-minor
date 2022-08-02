#lang racket/base

(require ff/lang/compiler)

(define (ff-compile-file filename)
  (define ns (make-base-namespace))

  ;; parse file
  (define module-syntax
    (call-with-input-file* filename
      (lambda (in)
        (read-syntax filename in))))

  ;;; eval module form in a namespace with racket/base
  (eval module-syntax ns)

  ;; require the module in the namespace to run it
  (define datum (car (cdr (syntax->datum module-syntax))))
  (eval `(require ',datum) ns))

(provide ff-compile-file)


