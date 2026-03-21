#lang racket

(require racket/runtime-path
         "../globals.rkt"
         "../lang/runner.rkt")

(define-runtime-path globals-path "../globals.rkt")

(define (ff-run-file filename)
  (define ns (make-base-namespace))

  ;; parse file
  (define module-syntax
    (call-with-input-file* filename
      (lambda (in)
        (read-syntax filename in))))

  ;;; eval module form in a namespace with racket/base
  (eval module-syntax ns)

  (parameterize ([current-namespace ns])
    (namespace-require `(file ,(path->string globals-path))))
  (eval `(*trace* ',(*trace*)) ns)

  ;; require the module in the namespace to run it
  (define datum (car (cdr (syntax->datum module-syntax))))

  (eval `(require ',datum) ns)   
)
(provide ff-run-file)
