#lang br/quicklang

(require "engine.rkt" "ops.rkt")

(define-macro (module-begin PARSE-TREE)
  #'(#%module-begin
     PARSE-TREE))
(provide (rename-out [module-begin #%module-begin]))

(define-macro (ff-program EXPR ...)
  #'(void EXPR ...))

(define-macro (ff-marker ID)
  #'(begin (push ID) (call op_mark)))

(define-macro (ff-push VAL)
  #'(push VAL))

(define-macro (ff-call OP)
  #'(call OP))

(define-macro (ff-string STR)
  #'(map push (map char->integer (string->list STR))))

(provide ff-program ff-marker ff-push ff-call ff-string)