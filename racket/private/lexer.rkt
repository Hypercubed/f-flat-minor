#lang racket/base

(require racket/string brag/support)
(require ff/private/ops ff/private/symbols)

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

(define (->number str)
  (set! str (string-replace str "_" ""))
  (set! str (string-replace str "-0b" "#b-"))
  (set! str (string-replace str "-0x" "#x-"))
  (set! str (string-replace str "-0o" "#o-"))
  (set! str (string-replace str "0b" "#b"))
  (set! str (string-replace str "0x" "#x"))
  (set! str (string-replace str "0o" "#o"))
  (string->number str))

(define-lex-abbrev id (:: (:or symbolic punctuation alphabetic) (:* (:or symbolic punctuation alphabetic numeric))))
(define-lex-abbrev decimal (:: (:or "-" "") (:+ (:or numeric "_" "e" "E"))))
(define-lex-abbrev hex (:: (:or "-" "") "0x" (:+ (:or numeric "_" "A" "B" "C" "D" "E" "F" "a" "b" "c" "d" "e" "f"))))
(define-lex-abbrev bin (:: (:or "-" "") "0b" (:+ (:or "_" "1" "0"))))
(define-lex-abbrev oct (:: (:or "-" "") "0o" (:+ (:or "_" "0" "1" "2" "3" "4" "5" "6" "7"))))
(define-lex-abbrev comment (from/to "/*" "*/"))
(define-lex-abbrev string (from/to "\'" "\'"))
(define-lex-abbrev pointer (:: "[" id "]"))
(define-lex-abbrev marker (:: id ":"))
(define-lex-abbrev command (:: "." id))

(define (unescape str)
  (string-replace (string-replace (string-replace str "\\t" "\t") "\\s" " ") "\\n" "\n"))

(define ff-lexer
  (lexer
   [comment (token 'COMMENT lexeme #:skip? #t)]
   [whitespace (token 'WHITESPACE lexeme #:skip? #t)]
   [command (token 'COMMENT lexeme #:skip? #t)]
   [string (token 'STR (unescape (string-trim lexeme "\'")))]
   [pointer (token 'PUSH (lookup (trim-ends "[" lexeme "]")))]
   [marker (token 'MRKR (lookup (string-trim lexeme ":")))]
   [decimal (token 'PUSH (->number lexeme))]
   [bin (token 'PUSH (->number lexeme))]
   [hex (token 'PUSH (->number lexeme))]
   [oct (token 'PUSH (->number lexeme))]
   [id (token 'CALL (lookup lexeme))]
))

(provide ff-lexer)

(module+ test
  (define (lex str)
    (apply-port-proc ff-lexer str))

  (lex "1 2 3 /* test */ add+ 'Hello' [world]")
)