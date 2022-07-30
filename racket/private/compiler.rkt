#lang br/quicklang

(require ff/private/ops)
(require (for-syntax ff/globals ff/private/ops))

(define-macro (module-begin . PARSE-TREE)
  #`(#%module-begin
    ;;; 'PARSE-TREE
    ; (void . PARSE-TREE)
    (define compiled . PARSE-TREE)
    (provide compiled)
  ))
(provide (rename-out [module-begin #%module-begin]))

(define-macro (ff-program EXPR ...)
  #'(flatten (list EXPR ...)))

(define (ff-marker ID)
  (ff-push ID)
  (ff-call op_mark))

(define (ff-push VAL)
  (list VAL 0))

(define (ff-call OP)
  (list OP 1))

(define (ff-string STR)
  (define chars (map char->integer (string->list STR)))
  (map ff-push chars))

(provide ff-program ff-marker ff-push ff-call ff-string)