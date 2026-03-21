#lang racket/base

(require readline/readline)
(require "../private/evaluate.rkt")

(define (ff-run-repl #:echo [echo #t])
  (define ns (make-base-namespace))
  (let loop ()
      (define x (readline "F♭m> "))
      (unless (or (eof-object? x) (equal? x '(unquote exit)))
        (add-history x)
        (ff-eval x ns)
        (when echo (ff-eval "." ns))
        (loop))))

(provide ff-run-repl ff-eval)
