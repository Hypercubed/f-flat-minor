#lang racket/base

(require racket/string racket/list)

(define (encode s)
  (define vlqs (map vlq-encode (bigcode->codes s)))
  (base64-encode (flatten vlqs)))

(define (bigcode->codes s [out '()])
  (if (empty? s)
    out
    (let ([x (first s)] [y (second s)])
      (bigcode->codes (cddr s) (cons (bigcode->int x y) out)))))

(define (bigcode->int x y)
  (bitwise-ior (arithmetic-shift x 1) y))

(define (signed->unsigned x)
  (define o (arithmetic-shift (abs x) 1))
  (if (negative? x)
    (bitwise-ior o 1)
    o))

(define VLQ_BASE_MASK #b11111)
(define VLQ_CONTINUATION_BIT #b100000)

(define (sextets s [o '()])
  (if (zero? s)
    (cons 0 o)
    (let ([sextet (bitwise-and s VLQ_BASE_MASK)] [z (arithmetic-shift s -5)])
      (if (zero? z)
        (cons sextet o)
        (sextets z (cons (bitwise-ior sextet VLQ_CONTINUATION_BIT) o))
      )
    )
  )
)

(define (vlq-encode x)
  (sextets (signed->unsigned x)))

(define BASE64_ALPHABET "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/")

(define (get-char k) (string (string-ref BASE64_ALPHABET k)))

(define (base64-encode s)
  (string-join (reverse (map get-char s)) ""))

(provide encode)
