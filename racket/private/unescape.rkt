#lang racket/base

;; Match Go / TypeScript F♭m string escapes for lexer preprocessing.

(define (hex->char hex)
  (define n (string->number hex 16))
  (cond
    [(not n) (string-append "[hex error: " hex "]")]
    [(<= n #xFFFF) (string (integer->char n))]
    [(<= n #x10FFFF)
     (define adj (- n #x10000))
     (string (integer->char (bitwise-ior #xD800 (arithmetic-shift adj -10)))
             (integer->char (bitwise-ior #xDC00 (bitwise-and adj #x3FF))))]
    [else (string-append "[hex error: out of range]")]))

(define (ff-unescape str)
  (define s str)
  (set! s (regexp-replace* #px"\\\\U([0-9a-fA-F]{8})" s
                           (lambda (_ m) (hex->char m))))
  (set! s (regexp-replace* #px"\\\\u([0-9a-fA-F]{4})" s
                           (lambda (_ m) (hex->char m))))
  (set! s (string-replace s "\\0" "\u0000"))
  (set! s (string-replace s "\\b" "\b"))
  (set! s (string-replace s "\\t" "\t"))
  (set! s (string-replace s "\\n" "\n"))
  (set! s (string-replace s "\\v" "\v"))
  (set! s (string-replace s "\\f" "\f"))
  (set! s (string-replace s "\\r" "\r"))
  (set! s (string-replace s "\\'" "'"))
  (set! s (string-replace s "\\\"" "\""))
  (set! s (string-replace s "\\s" " "))
  (set! s (string-replace s "\\\\" "\\"))
  s)

(provide ff-unescape)
