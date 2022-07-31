#lang racket/base

(require racket/string racket/list)

(define (encode s)
  (define vlqs (map vlq-encode (bigcode->codes s)))
  (base64-encode (flatten vlqs)))

(define (decode s)
  (define decoded (base64-decode s))
  (define vlqs (map vlq-deencode (codes->bigcode decoded)))
  (flatten (reverse (map re-pair vlqs))))

(define (re-pair x)
 (define lsb (bitwise-and x 1))
 (set! x (arithmetic-shift x -1))
 (list x lsb))

(define (bigcode->codes s [out '()])
  (if (empty? s)
    out
    (let ([x (first s)] [y (second s)])
      (bigcode->codes (cddr s) (cons (bigcode->int x y) out)))))

(define (codes->bigcode s [o '()] [v '()])
  (if (empty? s)
    o
    (let ([sextet (first s)])
      (set! v (cons sextet v))
      (when (zero? (bitwise-and sextet VLQ_CONTINUATION_BIT))
        (set! o (cons v o))
        (set! v '())
      )
      (codes->bigcode (rest s) o v))))

(define (bigcode->int x y)
  (bitwise-ior (arithmetic-shift x 1) y))

(define (signed->unsigned x)
  (define o (arithmetic-shift (abs x) 1))
  (if (negative? x)
    (bitwise-ior o 1)
    o))

(define (unsigned->signed x)
  (define lsb (bitwise-and x 1))
  (define o (arithmetic-shift x -1))
  (if (zero? lsb)
    o
    (* -1 o)))

(define VLQ_BASE_SHIFT 5)
(define VLQ_BASE_MASK #b11111)
(define VLQ_CONTINUATION_BIT #b100000)

(define (sextets s [o '()])
  (if (zero? s)
    (cons 0 o)
    (let ([sextet (bitwise-and s VLQ_BASE_MASK)] [z (arithmetic-shift s -5)])
      (if (zero? z)
        (cons sextet o)
        (sextets z (cons (bitwise-ior sextet VLQ_CONTINUATION_BIT) o))))))

(define (unsextets sextets)
  (foldl (lambda (sextet acc)
    (set! acc (arithmetic-shift acc 5))
    (bitwise-ior acc (bitwise-and sextet VLQ_BASE_MASK))) 0 sextets))

(define (vlq-encode x)
  (sextets (signed->unsigned x)))

(define (vlq-deencode x)
  (unsigned->signed (unsextets x)))

(define BASE64_ALPHABET "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/")

(define (get-char k) (string (string-ref BASE64_ALPHABET k)))

(define (get-int s) (string-index BASE64_ALPHABET (string s)))

(define (string-index hay needle)
  (define n (string-length needle))
  (define h (string-length hay))
  (and (<= n h) ; if the needle is longer than hay, then the needle can not be found
       (for/or ([i (- h n -1)]
                #:when (string=? (substring hay i (+ i n)) needle))
         i)))

(define (base64-encode s)
  (string-join (reverse (map get-char s)) ""))

(define (base64-decode s)
  (map get-int (string->list s)))

(provide encode decode)
