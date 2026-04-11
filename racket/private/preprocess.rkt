#lang racket/base

(require racket/file
         racket/list
         racket/path
         racket/port
         racket/runtime-path
         racket/set
         racket/string)

(define-runtime-path built-in-stdlib-root "../../ff/lib")

(define (path-list-separator)
  (if (eq? (system-type 'os) 'windows) ";" ":"))

(define (canonicalize-existing-path path)
  (simplify-path (path->complete-path path) #t))

(define (env-stdlib-roots)
  (define raw (getenv "FBM_STDLIB_PATH"))
  (if (or (not raw) (string=? raw ""))
      '()
      (for/list ([root (in-list (string-split raw (path-list-separator) #:trim? #f))]
                 #:unless (string=? root ""))
        (canonicalize-existing-path root))))

(define (default-stdlib-roots)
  (cons (canonicalize-existing-path built-in-stdlib-root)
        (env-stdlib-roots)))

(define current-stdlib-roots
  (make-parameter (default-stdlib-roots)))

(define (strip-surrounding-quotes specifier)
  (define trimmed (string-trim specifier))
  (if (and (>= (string-length trimmed) 2)
           (char=? (string-ref trimmed 0) #\")
           (char=? (string-ref trimmed (sub1 (string-length trimmed))) #\"))
      (substring trimmed 1 (sub1 (string-length trimmed)))
      trimmed))

(define (directive-argument line)
  (define parts (string-split (string-trim line)))
  (and (>= (length parts) 2)
       (strip-surrounding-quotes (second parts))))

(define (source-directory source-path)
  (cond
    [(path-string? source-path)
     (define complete-path (path->complete-path source-path))
     (or (path-only complete-path) (current-directory))]
    [else (current-directory)]))

(define (directory-index-candidates candidate-path)
  (if (directory-exists? candidate-path)
      (let* ([directory-path (simplify-path candidate-path)]
             [basename (path->string (file-name-from-path directory-path))])
        (list (build-path directory-path (string-append basename ".ffp"))
              (build-path directory-path (string-append basename ".ff"))))
      '()))

(define (canonical-file-if-exists candidate-path)
  (and (file-exists? candidate-path)
       (canonicalize-existing-path candidate-path)))

(define (resolve-existing-candidate-paths candidate-paths)
  (for/or ([candidate (in-list candidate-paths)])
    (canonical-file-if-exists candidate)))

(define (resolve-relative-candidates candidate-path)
  (append (list candidate-path)
          (directory-index-candidates candidate-path)))

(define (resolve-stdlib-candidates candidate-path)
  (append (list candidate-path
                (path-replace-extension candidate-path #".ffp")
                (path-replace-extension candidate-path #".ff"))
          (directory-index-candidates candidate-path)))

(define (resolve-filesystem-import specifier source-path)
  (define raw-path (string->path specifier))
  (define candidate-path
    (if (absolute-path? raw-path)
        raw-path
        (build-path (source-directory source-path) raw-path)))
  (or (resolve-existing-candidate-paths (resolve-relative-candidates candidate-path))
      (error 'preprocess
             "import error: '~a' not found from '~a'"
             specifier
             (if (path-string? source-path)
                 (path->string (path->complete-path source-path))
                 "stdin"))))

(define (stdlib-specifier? specifier)
  (and (>= (string-length specifier) 2)
       (char=? (string-ref specifier 0) #\<)
       (char=? (string-ref specifier (sub1 (string-length specifier))) #\>)))

(define (resolve-stdlib-import specifier)
  (define logical-path
    (substring specifier 1 (sub1 (string-length specifier))))
  (define stdlib-roots (current-stdlib-roots))
  (or (for/or ([root (in-list stdlib-roots)])
        (resolve-existing-candidate-paths
         (resolve-stdlib-candidates (build-path root (string->path logical-path)))))
      (error 'preprocess
             "import error: stdlib import '~a' not found in roots: ~a"
             specifier
             (string-join (map path->string stdlib-roots) ", "))))

(define (resolve-import-path specifier source-path)
  (if (stdlib-specifier? specifier)
      (resolve-stdlib-import specifier)
      (resolve-filesystem-import specifier source-path)))

(define (preprocess-file filepath imported)
  (call-with-input-file filepath
    (lambda (input-port)
      (preprocess* filepath input-port imported))))

(define (do-load source-path line imported)
  (define specifier (directive-argument line))
  (unless specifier
    (error 'preprocess "load error: missing target in '~a'" line))
  (preprocess-file (resolve-import-path specifier source-path) imported))

(define (do-import source-path line imported)
  (define specifier (directive-argument line))
  (unless specifier
    (error 'preprocess "import error: missing target in '~a'" line))
  (define filepath (resolve-import-path specifier source-path))
  (if (set-member? imported filepath)
      ""
      (begin
        (set-add! imported filepath)
        (preprocess-file filepath imported))))

(define (process-line line [source-path (current-directory)] [imported (mutable-set)])
  (cond
    [(string-prefix? line "#") ""]
    [(< (string-length line) 2) line]
    [(string-prefix? line ".")
     (define cmd (string-trim (car (string-split line))))
     (cond
       [(< (string-length cmd) 2) line]
       [(equal? cmd ".load") (do-load source-path line imported)]
       [(equal? cmd ".import") (do-import source-path line imported)]
       [(equal? cmd ".m") line]
       [else ""])]
    [else line]))

(define (preprocess* path port imported)
  (define lines (port->lines port))
  (string-join (map (lambda (line) (process-line line path imported)) lines) "\n"))

(define (preprocess path port)
  (preprocess* path port (mutable-set)))

(provide current-stdlib-roots
         default-stdlib-roots
         preprocess)
