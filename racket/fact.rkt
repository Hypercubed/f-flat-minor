#lang racket/base

(define (factorial n)
  (if (= 0 n)
      1
      (* n (factorial (- n 1)))))

(display "Factorial 100:\n[ ")
(display (factorial 100))
(display " ]\n")