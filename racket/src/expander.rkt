#lang br/quicklang

(require "./ops.rkt" "./symbols.rkt" "./reader.rkt" "./engine.rkt")

;;; expander
(define-macro (stacker-module-begin HANDLE-EXPR ...)
  #'(#%module-begin HANDLE-EXPR ... ))
(provide (rename-out [stacker-module-begin #%module-begin]))

(provide read-syntax)
(provide call push)