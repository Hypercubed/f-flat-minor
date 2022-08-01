#lang br/quicklang

(require ff/private/engine ff/private/ops)
(require (for-syntax ff/private/ops))

(define-macro (module-begin PARSE-TREE ...)
  #'(#%module-begin
    ;;; 'PARSE-TREE
    PARSE-TREE ...
  ))
(provide (rename-out [module-begin #%module-begin]))

(define-macro (ff-program EXPR ...)
  #'(void EXPR ...))

(define-macro (ff-marker ID)
  #`(begin (push ID) (call op_mark)))

(define-macro (ff-push VAL)
  #'(push VAL))

(define-macro (ff-call OP)
  (define op (syntax-e #'OP))
  (cond
    ;;; These are for readability when expanded
    [(equal? op op_nop) #'(call op_nop)]
    [(equal? op op_eval) #'(call op_eval)]
    [(equal? op op_putc) #'(call op_putc)]
    [(equal? op op_putn) #'(call op_putn)]
    [(equal? op op_drop) #'(call op_drop)]
    [(equal? op op_pushr) #'(call op_pushr)]
    [(equal? op op_pullr) #'(call op_pullr)]
    [(equal? op op_shiftr) #'(call op_shiftr)]
    [(equal? op op_shiftl) #'(call op_shiftl)]
    [(equal? op op_dup) #'(call op_dup)]
    [(equal? op op_depth) #'(call op_depth)]
    [(equal? op op_and) #'(call op_and)]
    [(equal? op op_mul) #'(call op_mul)]
    [(equal? op op_add) #'(call op_add)]
    [(equal? op op_sub) #'(call op_sub)]
    [(equal? op op_div) #'(call op_div)]
    [(equal? op op_mark) #'(call op_mark)]
    [(equal? op op_def) #'(call op_def)]
    [(equal? op op_lt) #'(call op_lt)]
    [(equal? op op_eq) #'(call op_eq)]
    [(equal? op op_gt) #'(call op_gt)]
    [(equal? op op_when) #'(call op_when)]
    [(equal? op op_bra) #'(call op_bra)]
    [(equal? op op_ket) #'(call op_ket)]
    [(equal? op op_pow) #'(call op_pow)]
    [(equal? op op_or) #'(call op_or)]
    [(equal? op op_not) #'(call op_not)]
    [else #'(call OP)]))

(define-macro (ff-string STR)
  (define ints (map char->integer (string->list (syntax->datum #'STR))))
  (with-pattern ([(INTS ...) ints])
    #`(begin (push INTS) ...)))

(provide ff-program ff-marker ff-push ff-call ff-string)