#lang racket

(require readline/readline)
(require ff/private/evaluate)

(define (ff-run-repl #:pp [pp #t] #:echo [echo #t])
  (define ns (make-base-namespace))
  (let loop ()
      (define x (readline "F♭m> "))
      (unless (or (eof-object? x) (equal? x '(unquote exit)))
        (add-history x)
        (ff-eval x ns #:pp pp)
        (when echo (ff-eval "." ns #:pp pp))
        (loop)))
)
(provide ff-run-repl ff-eval)