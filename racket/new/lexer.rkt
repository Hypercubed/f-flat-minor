#lang br
(require brag/support)
(require "../src/ops.rkt" "../src/symbols.rkt")

(define user_symbols (make-hash))

(define next-code!
  (let ([n 0])
  (λ ()
    (set! n (sub1 n))
    n)))

(define (add-id id code)
  (hash-set! user_symbols id code)
  code)

(define (lookup id)
  (cond
    [(hash-has-key? user_symbols id)
      (hash-ref user_symbols id)
    ]
    [(hash-has-key? system_symbols id)
      (hash-ref system_symbols id)
    ]
    [#t (add-id id (next-code!))]
  ))

(define-lex-abbrev id (:seq (:or symbolic punctuation alphabetic) (:* (union symbolic punctuation alphabetic numeric))))
(define-lex-abbrev integer (:seq (:or "-" "") (:+ numeric)))
(define-lex-abbrev comment (from/to "/*" "*/"))
(define-lex-abbrev string (from/to "\'" "\'"))
(define-lex-abbrev pointer (:seq "[" id "]"))
(define-lex-abbrev marker (:seq id ":"))

(define ff-lexer
  (lexer
   [comment (token 'COMMENT lexeme #:skip? #t)]
   [whitespace (token 'WHITESPACE lexeme #:skip? #t)]
   [string (token 'STR (string-trim lexeme "\'"))]
   [pointer (token 'PUSH (lookup (string-trim (string-trim lexeme "[") "]")))]
   [marker (token 'MRKR (lookup (string-trim lexeme ":")))]
   [integer (token 'PUSH (string->number lexeme))]
   [id (token 'CALL (lookup lexeme))]
))

(provide ff-lexer)