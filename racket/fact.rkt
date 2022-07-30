#lang racket/base

;;; This is a base rase implementation of factorial used as a benchmark.

; (: factorial (-> Integer Integer))
(define (factorial n)
  (if (= 0 n)
      1
      (* n (factorial (sub1 n)))))

; (time 
;   (factorial 100)
;   (factorial 1000)
;   (factorial 5000))

(define out (current-output-port))

(display "Factorial 100:\n[ " out)
(display (factorial 100) out)
(display " ]\n" out)