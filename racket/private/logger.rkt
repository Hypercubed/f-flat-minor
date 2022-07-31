#lang racket/base

(define-logger ff)

(define (ff-log-level level)
  (define ff-receiver (make-log-receiver ff-logger level))
  (void 
  (thread 
    (λ () (let loop () 
            (define v (sync ff-receiver))
            (printf "[~a] ~a\n" (vector-ref v 0) (vector-ref v 1)) 
            (loop))))))

(provide log-ff-info ff-log-level)