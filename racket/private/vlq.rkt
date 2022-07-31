#lang racket/base

(require racket/string racket/list)

(define VLQ_BASE_SHIFT 5)
(define VLQ_BASE_MASK #b11111)
(define VLQ_CONTINUATION_BIT #b100000)

(define BASE64_ALPHABET "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/")
(define BASE64_ALPHABET_LIST (string->list BASE64_ALPHABET))

(define (encode lst)
  (define vlqs (map vlq-encode (bigcode->codes lst)))
  (base64-encode (reverse (flatten vlqs))))

(define (decode str)
  (define decoded (base64-decode str))
  (define vlqs (map vlq-deencode (codes->bigcode decoded)))
  (flatten (reverse (map re-pair vlqs))))

(define (re-pair x)
 (define lsb (bitwise-and x 1))
 (list (arithmetic-shift x -1) lsb))

(define (bigcode->codes s [out '()])
  (if (empty? s)
    out
    (let ([x (first s)] [y (second s)])
      (bigcode->codes (cddr s) (cons (bigcode->int x y) out)))))

(define (codes->bigcode s [o '()] [v '()])
  (if (empty? s)
    o
    (let ([sextet (car s)])
      (if (zero? (bitwise-and sextet VLQ_CONTINUATION_BIT))
        (codes->bigcode (cdr s) (cons (cons sextet v) o))
        (codes->bigcode (cdr s) o (cons sextet v))
      ))))

(define (bigcode->int x y)
  (bitwise-ior (arithmetic-shift x 1) y))

(define (signed->unsigned x)
  (define o (arithmetic-shift (abs x) 1))
  (if (negative? x) (bitwise-ior o 1) o))

(define (unsigned->signed x)
  (define lsb (bitwise-and x 1))
  (define o (arithmetic-shift x -1))
  (if (zero? lsb) o (- o)))

(define (sextets s [o '()])
  (if (zero? s)
    (cons 0 o)
    (let ([sextet (bitwise-and s VLQ_BASE_MASK)] [z (arithmetic-shift s (- VLQ_BASE_SHIFT))])
      (if (zero? z)
        (cons sextet o)
        (sextets z (cons (bitwise-ior sextet VLQ_CONTINUATION_BIT) o))))))

(define (unsextets sextets)
  (foldl (lambda (sextet acc)
    (bitwise-ior
      (arithmetic-shift acc VLQ_BASE_SHIFT)
      (bitwise-and sextet VLQ_BASE_MASK)))
    0 sextets))

(define (vlq-encode x)
  (sextets (signed->unsigned x)))

(define (vlq-deencode x)
  (unsigned->signed (unsextets x)))

(define (get-char k) (string (string-ref BASE64_ALPHABET k)))
(define (get-int s) (index-of BASE64_ALPHABET_LIST s))

(define (base64-encode s)
  (string-join (map get-char s) ""))

(define (base64-decode s)
  (map get-int (string->list s)))

(provide encode decode)
