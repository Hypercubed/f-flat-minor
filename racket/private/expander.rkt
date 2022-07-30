#lang br/quicklang

(require ff/private/engine ff/private/ops)
(require (for-syntax racket/list))
(require (for-syntax ff/globals ff/private/ops))

(define-macro (module-begin . PARSE-TREE)
  #'(#%module-begin
    (void . PARSE-TREE)
  ))
(provide (rename-out [module-begin #%module-begin]))

(define-macro (ff-program EXPR ...)
  #'(run (flatten (list EXPR ...))))

(define-macro (ff-marker ID)
  #'(list ID 0 op_mark 1))

(define-macro (ff-push VAL)
  #'(list VAL 0))

(define-macro (ff-call OP)
  #'(list OP 1))

(define-macro (ff-string STR)
  (define chars (map char->integer (string->list (syntax->datum #'STR))))
  (define cmds (flatten (map (lambda (x) (list x 0)) chars)))
  #`(list '#,cmds))

(provide ff-program ff-marker ff-push ff-call ff-string)