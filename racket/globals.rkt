#lang racket/base

(define HEADER "FbAbbCb")

(define *pp* (make-parameter null))
(define *trace* (make-parameter #f))

(provide (all-defined-out))

