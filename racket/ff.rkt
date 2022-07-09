#lang br/quicklang

(define op_dump (char->integer #\.))
(define op_add  (char->integer #\+))
(define op_sub  (char->integer #\-))
(define op_mul  (char->integer #\*))
(define op_div  (char->integer #\/))
(define op_pow  (char->integer #\^))
(define op_swap (char->integer #\$))
(define op_mod  (char->integer #\%))
(define op_mark (char->integer #\:))
(define op_def  (char->integer #\;))
(define op_pushr 14)
(define op_pullr 15)
(define op_clr 24)

(define (lookup token)
  (match token
    ["." op_dump]
    ["+" op_add]
    ["-" op_sub]
    ["*" op_mul]
    ["/" op_div]
    ["^" op_pow]
    ["swap" op_swap]
    ["%" op_mod]
    [":" op_mark]
    [";" op_def]
    ["q<" op_pushr]
    ["q>" op_pullr]
    ["clr" op_clr]
    [else token]
  ))

;;; Reader
(define (op token)
  (cond
    [(integer? (string->number token)) "push"]
    [#t "call"]
  ))

(define (tokenize port)
  (flatten (map string-split (port->lines port))))

(define (read src-tokens)
  (define values (map lookup src-tokens))
  (define ops (map op src-tokens))
  (define src-datums (format-datums (quote (~a ~a "\"~a\"")) ops values src-tokens))
  ;;; (displayln src-datums)
  (define module-datum `(module anything "ff.rkt" ,@src-datums))
  (datum->syntax #f module-datum)
)

(define (read-syntax path port)
  (read (tokenize port)))
(provide read-syntax)

;;; expander
(define-macro (stacker-module-begin HANDLE-EXPR ...)
  #'(#%module-begin HANDLE-EXPR ... ))
(provide (rename-out [stacker-module-begin #%module-begin]))

;;; engine
(define stack empty)
(define queue empty)

(define (pop-stack!)
  (define arg (first stack))
  (set! stack (rest stack))
  arg)

(define (push-stack! arg)
  (set! stack (cons arg stack)))

(define (pop-queue!)
  (define arg (first queue))
  (set! queue (rest queue))
  arg)

(define (push-queue! arg)
  (set! queue (cons arg queue)))

(define (add-stack!)
  (push-stack! (+ (pop-stack!) (pop-stack!))))

(define (mul-stack!)
  (push-stack! (* (pop-stack!) (pop-stack!))))

(define (div-stack!)
  (let ([a (pop-stack!)] [b (pop-stack!)])
    (push-stack! (quotient b a))))

(define (sub-stack!)
  (let ([a (pop-stack!)] [b (pop-stack!)])
    (push-stack! (- b a))))

(define (pow-stack!)
  (let ([a (pop-stack!)] [b (pop-stack!)])
    (push-stack! (expt b a))))

(define (mod-stack!)
  (let ([a (pop-stack!)] [b (pop-stack!)])
    (push-stack! (modulo b a))))

(define (swap-stack!)
  (let ([a (pop-stack!)] [b (pop-stack!)])
    (push-stack! a)
    (push-stack! b)))

(define (prn-stack!)
  (printf "[ ")
  (for ([x (reverse stack)]) (printf "~s " x))
  (printf "]\n")
  )

(define (clr-stack!)
  (set! stack empty))

(define (pullr!)
  (push-stack! (pop-queue!)))

(define (pushr!)
  (push-queue! (pop-stack!)))

(define (push x [c #f]) (push-stack! x))

(define (call [arg #f] [c #f])

  ;;; (displayln (string? arg))

  (cond
    [(equal? (lookup "+")  arg) (add-stack!)]
    [(equal? op_mul  arg) (mul-stack!)]
    [(equal? op_sub  arg) (sub-stack!)]
    [(equal? op_div  arg) (div-stack!)]
    [(equal? op_pow  arg) (pow-stack!)]
    [(equal? op_dump arg) (prn-stack!)]
    [(equal? op_swap arg) (swap-stack!)]
    [(equal? op_mod  arg) (mod-stack!)]
    [(equal? op_clr  arg) (clr-stack!)]
    [(equal? op_pushr arg) (pushr!)]
    [(equal? op_pullr arg) (pullr!)]
  )
  
  ;;; (printf "~a\t -> ~a~N" arg stack)
)

(provide call push)