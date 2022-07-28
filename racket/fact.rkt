#lang racket/base

;;; This is a base rase implementation of factorial used as a benchmark.

; (: factorial (-> Integer Integer))
(define (factorial n)
  (if (= 0 n)
      1
      (* n (factorial (- n 1)))))

(define out (current-output-port))

(display "Factorial 100:\n[ " out)
(display (factorial 100) out)
(display " ]\n" out)