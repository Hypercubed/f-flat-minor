#lang racket/base

(require racket/list)
(require ff/private/engine ff/globals ff/lang/reader-compiler ff/private/vlq)

(define (ff-compile-file filename )
  (define ns (make-base-namespace))

  ;; parse file
  (define module-syntax
    (call-with-input-file* filename
      (lambda (in)
        (read-syntax filename in))))

  ;;; eval module form in a namespace with racket/base
  (eval module-syntax ns)

  ;; require the module in the namespace to run it
  (eval `(require ',(second (syntax->datum module-syntax))) ns)

  (display HEADER)
  (display (encode (eval `compiled ns))))

(provide ff-compile-file)


