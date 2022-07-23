#lang br/quicklang

(require readline/readline)
(require ff/src/reader)


(define ns (make-base-namespace))

(define (ff-run-file filename)
  ;; parse file
  (define module-syntax
    (call-with-input-file* filename
      (lambda (in)
        (read-syntax filename in))))

  ;;; eval module form in a namespace with racket/base
  (eval module-syntax ns)

  ;; require the module in the namespace to run it
  (eval `(require ',(second (syntax->datum module-syntax))) ns)   
)

(define (ff-eval code)
  (define in (open-input-string code))
  (define module-syntax (read-syntax #f in))
  (eval module-syntax ns)
  (eval `(require ',(second (syntax->datum module-syntax))) ns)
)

(define (ff-run-repl) 
  (let loop ()
      (define x (readline "F♭m> "))
      (unless (or (eof-object? x) (equal? x '(unquote exit)))
        (add-history x)
        (ff-eval x)
        (ff-eval ".")
        (loop)))
)

(define (ff-run-stdin) 
  (let loop ()
      (define x (readline ""))
      (unless (or (eof-object? x) (equal? x '(unquote exit)))
        (ff-eval x)
        (loop)))
)

(provide read-syntax ff-eval ff-run-file ff-run-repl ff-run-stdin)

(module+ main
  (require racket/cmdline)
  (require racket/match)

  (command-line
    #:args ([filename #f])

    (cond
      [(not filename) (ff-run-repl)]
      [(equal? filename "-") (ff-run-stdin)]
      [else (ff-run-file filename)])
  )
)
