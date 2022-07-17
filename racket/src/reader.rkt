#lang br/quicklang

(require "./ops.rkt" "./symbols.rkt")

(define user_symbols (make-hash))

(define next-code!
  (let ([n 0])
  (λ ()
    (set! n (sub1 n))
    n)))

(define BRA (string (integer->char op_bra)))
(define KET (string (integer->char op_ket)))
(define MARK (string (integer->char op_mark)))

(define (marker? token)
  (and (string? token)
       (> (string-length token) 1)
       (string-suffix? token MARK)))

(define (marker->pointer str)
  (string-append "[" (substring str 0 (sub1 (string-length str))) "]"))

(define (string->ff-chars str)
  (map char->ff-char (string->list (substring str 1 (sub1 (string-length str))))))

(define (char->ff-char chr)
  (string-append "'" (string chr) "'"))

(define (pointer? token)
  (and (string? token)
       (> (string-length token) 2)
       (string-prefix? token BRA)
       (string-suffix? token KET)))

(define (pointer->token str)
  (substring str 1 (sub1 (string-length str))))

(define (ff-char? token)
  (and (string? token)
       (eq? (string-length token) 3)
       (string-prefix? token "'")
       (string-suffix? token "'")))

(define (ff-string? token)
  (and (string? token)
       (> (string-length token) 4)
       (string-prefix? token "'")
       (string-suffix? token "'")))

(define (add-token token code)
  (hash-set! user_symbols token code)
  code)

(define (lookup token)
  (cond
    [(pointer? token)
      (lookup (pointer->token token))
    ]
    [(hash-has-key? system_symbols token)
      (hash-ref system_symbols token)
    ]
    [(hash-has-key? user_symbols token)
      (hash-ref user_symbols token)
    ]
    [#t (add-token token (next-code!))]
  ))

(define (expand token)
  (cond
    [(marker? token) (list (marker->pointer token) ":")]
    [(ff-string? token) (string->ff-chars token)]
    [else token]
  ))

(define (read-line line)
  (if (string-prefix? line ";;;") '() (string-split line)))

(define (tokenize port)
  (flatten (map expand (flatten (map read-line (port->lines port))))))

(define (get-datum token)
  (cond
    [(integer? (string->number token)) (format-datum '(push ~a) token)]
    [(pointer? token) (format-datum '(push ~a) (lookup token))]
    [(ff-char? token) (format-datum '(push ~a) (char->integer (string-ref token 1)))]
    [else (format-datum '(call ~a) (lookup token))]
  ))

;;; Reader
(define (read-tokens src-tokens)
  (define src-datums (map get-datum src-tokens))
  (define module-datum `(module anything "./src/expander.rkt" ,@src-datums))
  (datum->syntax #f module-datum)
)

(define (read-syntax path port)
  (read-tokens (tokenize port)))

(provide read-syntax)