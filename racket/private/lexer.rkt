#lang br
(require brag/support ff/private/ops ff/private/symbols)

(define user_symbols (make-hash))

(define next-code!
  (let ([n 0])
  (λ ()
    (set! n (sub1 n))
    n)))

(define (add-id id code)
  (hash-set! user_symbols (string-downcase id) code)
  code)

(define (lookup id)
  (set! id (string-downcase id))
  (cond
    [(hash-has-key? user_symbols id)
      (hash-ref user_symbols id)
    ]
    [(hash-has-key? system_symbols id)
      (hash-ref system_symbols id)
    ]
    [#t (add-id id (next-code!))]
  ))

(define-lex-abbrev id (:: (:or symbolic punctuation alphabetic) (:* (:or symbolic punctuation alphabetic numeric))))
(define-lex-abbrev integer (:: (:or "-" "") (:+ numeric)))
(define-lex-abbrev comment (from/to "/*" "*/"))
(define-lex-abbrev string (from/to "\'" "\'"))
(define-lex-abbrev pointer (:: "[" id "]"))
(define-lex-abbrev marker (:: id ":"))
(define-lex-abbrev command (:: "." id))

(define (unescape str)
  (string-replace (string-replace (string-replace str "\\t" "\t") "\\s" " ") "\\n" "\n"))

(define ff-lexer
  (lexer-src-pos
   [comment (token 'COMMENT lexeme #:skip? #t)]
   [whitespace (token 'WHITESPACE lexeme #:skip? #t)]
   [command (token 'COMMENT lexeme #:skip? #t)]
   [string (token 'STR (unescape (string-trim lexeme "\'")))]
   [pointer (token 'PUSH (lookup (trim-ends "[" lexeme "]")))]
   [marker (token 'MRKR (lookup (string-trim lexeme ":")))]
   [integer (token 'PUSH (string->number lexeme))]
   [id (token 'CALL (lookup lexeme))]
))

(provide ff-lexer)

(module+ test
  (define (lex str)
    (apply-port-proc ff-lexer str))

  (lex "1 2 3 /* test */ add+ 'Hello' [world]")
)