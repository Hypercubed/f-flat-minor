#lang racket/base

(require racket/runtime-path
         syntax/strip-context
         "../globals.rkt"
         "../private/parser.rkt"
         "../private/tokenizer.rkt"
         "../private/preprocess.rkt")

(define-runtime-path ff-runner-path "../private/runner.rkt")

(define (ff-read in)
  (syntax->datum
   (ff-read-syntax #f in)))

(define (ff-read-syntax path port)
  (when (*pp*)
    (define code (preprocess path port))
    (set! port (open-input-string code path))
  )
  (define s-exprs (parse port (make-tokenizer port path)))
  (define module-datum
    `(module ff-mod (file ,(path->string ff-runner-path)) ,s-exprs))
  (strip-context (datum->syntax #f module-datum)))

(define (get-info port mod line col pos)
    (lambda (key default)
      (case key
        [(module-language) (path->string ff-runner-path)]
        [else default])))

(provide (rename-out [ff-read read]
                     [ff-read-syntax read-syntax])
        get-info)
