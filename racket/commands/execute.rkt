#lang racket/base

(require racket/list racket/string)
(require "../globals.rkt"
         "../private/engine.rkt"
         "../private/vlq.rkt")

(define (read-file filename)
  (with-input-from-file filename
    (lambda ()
      (let loop ((lst null))
        (define new (read-char))
        (if (eof-object? new)
            (apply string lst)
            (loop (append lst (list new))))))))

(define (ff-execute-file filename)
  (define encoded (string-replace (read-file filename) HEADER ""))
  (run (decode encoded)))

(provide ff-execute-file)
