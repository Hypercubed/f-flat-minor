#!/usr/bin/env racket

#lang racket/base

(require racket/string)
(require ff/globals ff/lang/reader ff/private/preprocess ff/commands/run ff/commands/compile ff/commands/repl)

(provide read read-syntax get-info)
(provide ff-eval ff-run-file ff-run-repl)

(module+ main
  (require racket/cmdline)
  (require racket/match)

  (define pp-only (make-parameter #f))
  (define evaluate (make-parameter ""))
  (define compile (make-parameter #f))

  (command-line
    #:usage-help
    "Run with a filename to execute the file."
    "Run with `-` as the filename to read from stdin."
    "Run without filename to enter the REPL."

    #:once-each
    [("--pp-only")
      "run preprocessor to stdout and exit"
      (pp-only #t)]


    [("--no-pp")
      "Disable preprocessor"
      (*pp* #f)]

    [("-c" "--compile")
      "Compile without running"
      (compile #t)]

    #:multi
    [("-e" "--eval") expression
      "Evaluate expression and exit"
      (evaluate (string-append (evaluate) expression "\n"))]

    #:args ([filename #f])

    (when (non-empty-string? (evaluate))
      (ff-eval (evaluate))
      (exit)
    )

    (when (pp-only)
      (define port (open-input-file filename))
      (displayln (preprocess filename port))
      (exit)
    )

    (cond
      [(not filename)
        (begin
          (displayln "Welcome to F♭A𝄫C♭")
          (ff-run-repl))]
      [(equal? filename "-") (ff-run-repl #:echo #f)]
      [(compile) (ff-compile-file filename)]
      [else (ff-run-file filename)]))
)
