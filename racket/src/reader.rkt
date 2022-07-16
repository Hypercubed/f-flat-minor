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

(define (pointer? token)
  (and (string? token)
       (string-length token)
       (string-prefix? token BRA)
       (string-suffix? token KET)))

(define (pointer->token str)
  (substring str 1 (sub1 (string-length str))))

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

(define (tokenize port)
  (flatten (map string-split (port->lines port))))

(define (get-datum token)
  (cond
    [(integer? (string->number token)) (format-datum '(push ~a) token)]
    [(pointer? token) (format-datum '(push ~a) (lookup token))]
    [#t (format-datum '(call ~a) (lookup token))]
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