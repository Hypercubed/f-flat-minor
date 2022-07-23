#lang br/quicklang

(require ff/src/engine ff/src/ops)

(define-macro (module-begin . PARSE-TREE)
  #'(#%module-begin
    ;;; 'PARSE-TREE
    (void . PARSE-TREE)
  ))
(provide (rename-out [module-begin #%module-begin]))

(define-macro (ff-program EXPR ...)
  #'(list EXPR ...))

(define-macro (ff-marker ID)
  #'(begin (push ID) (call op_mark)))

(define-macro (ff-push VAL)
  #'(push VAL))

(define-macro (ff-call OP)
  #'(call OP))

(define-macro (ff-string STR)
  (define chars (map char->integer (string->list (syntax->datum #'STR))))
  #`(map push '#,chars))

(provide ff-program ff-marker ff-push ff-call ff-string)