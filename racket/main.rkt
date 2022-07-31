#!/usr/bin/env racket

#lang racket/base

(require racket/string racket/path)
(require ff/globals ff/private/logger ff/lang/reader ff/private/preprocess ff/commands/run ff/commands/compile ff/commands/repl ff/commands/execute)

(provide read read-syntax get-info)
(provide ff-eval ff-run-file ff-run-repl)

(ff-log-level 'warning)

(module+ main
  (require racket/cmdline)
  (require racket/match)

  (define pp-only (make-parameter #f))
  (define evaluate (make-parameter ""))
  (define compile (make-parameter #f))
  (define binary (make-parameter null))

  (command-line
    #:usage-help
    "Run with a filename to execute the file."
    "Run with `-` as the filename to read from stdin."
    "Run without filename to enter the REPL."

    #:once-each
    [("--pp-only" "--preprocess-only")
      "run preprocessor to stdout and exit"
      (pp-only #t)
      (*pp* #t)]

    [("--no-pp" "--no-preprocess")
      "Force disable preprocessor"
      (*pp* #f)]

    [("-p" "--preprocess")
      "Force enable preprocessor"
      (*pp* #t)]

    [("-c" "--compile")
      "Compile without running"
      (compile #t)]

    [("-b" "--binary")
      "Execute bigcode (binary)"
      (binary #t)]

    #:multi
    [("-e" "--eval") expression
      "Evaluate expression and exit"
      (evaluate (string-append (evaluate) expression "\n"))]

    #:args ([filename #f])

    (when (and filename (null? (*pp*)) (not (pp-only)))
      (if (bytes=? (path-get-extension filename) #".ffp")
        (*pp* #t)
        (*pp* #f)))

    (when (and filename (null? (binary)))
      (if (bytes=? (path-get-extension filename) #".ffb")
        (binary #t)
        (binary #f)))

    (when (non-empty-string? (evaluate))
      (ff-eval (evaluate))
      (exit)
    )

    (when (pp-only)
      (define port (open-input-file filename))
      (displayln (preprocess filename port))
      (exit))
  
    (if (*pp*)
      (log-ff-info "Running with preprocessor")
      (log-ff-info "Running without preprocessor"))

    (cond
      [(not filename)
        (begin
          (displayln "Welcome to F♭A𝄫C♭")
          (ff-run-repl))]
      [(equal? filename "-") (ff-run-repl #:echo #f)]
      [(compile) (ff-compile-file filename)]
      [(binary) (ff-execute-file filename)]
      [else (ff-run-file filename)]))
)
