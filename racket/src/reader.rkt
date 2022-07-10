#lang br/quicklang

(require "./ops.rkt")
(require "./symbols.rkt")

(define next-op 0)

(define (pointer->token str)
  (substring str 1 (- (string-length str) 1))
)

(define (add-token token)
  (set! next-op (- next-op 1))
  (hash-set! symbols token next-op)
  next-op
)

(define (lookup token)
  (cond
    [(integer? (string->number token)) token]
    [(pointer? token)
      (define x (pointer->token token))
      (if (hash-has-key? symbols x)
        (hash-ref symbols x)
        (add-token x)
      )
    ]
    [(hash-has-key? symbols token) (hash-ref symbols token)]
    [#t (add-token token)]
  )
)

;;; Reader
(define (pointer? token)
  (and (string? token)
       (string-length token)
       (eq? (string-ref token 0) #\[) ; also check ends with ]
  )
)

(define (get-op token)
  (cond
    [(integer? (string->number token)) "push"]
    [(pointer? token) "push"]
    [#t "call"]
  ))

(define (tokenize port)
  (flatten (map string-split (port->lines port))))

(define (read src-tokens)
  (define values (map lookup src-tokens))
  (define ops (map get-op src-tokens))
  (define src-datums (format-datums '(~a ~a) ops values))
  ;;; (displayln src-datums)
  (define module-datum `(module anything
    "./src/expander.rkt"
    ;;; br
  ,@src-datums))
  (datum->syntax #f module-datum)
)

(define (read-syntax path port)
  (read (tokenize port)))
(provide read-syntax)