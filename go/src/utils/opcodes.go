package utils

// f-flat-minor v2

const (
	OP_NOP   = 0
	OP_CALL  = 1
	OP_PUTC  = 2
	OP_GETC  = 3
	OP_PUTN  = 5
	OP_CLOCK = 6
	OP_DROP  = 8
	OP_PUSHR = 14
	OP_PULLR = 15
	OP_SHL   = 16
	OP_SHR   = 17
	OP_CLR   = 24
	OP_RAND  = 26
	OP_EXIT  = 27
	OP_DUP   = '!'
	OP_DEPTH = '#'
	OP_SWAP  = '$'
	OP_MOD   = '%'
	OP_AND   = '&'
	OP_STASH = '('
	OP_FETCH = ')'
	OP_MUL   = '*'
	OP_ADD   = '+'
	OP_SUB   = '-'
	OP_PRN   = '.'
	OP_DIV   = '/'
	OP_MARK  = ':'
	OP_DEF   = ';'
	OP_LT    = '<'
	OP_EQ    = '='
	OP_GT    = '>'
	OP_IF    = '?'
	OP_BRA   = '['
	OP_KET   = ']'
	OP_POW   = '^'
	OP_OR    = '|'
	OP_NOT   = '~'
)

const (
	SYM_NOP   = "nop"
	SYM_CALL  = "eval"
	SYM_PUTC  = "putc"
	SYM_GETC  = "getc"
	SYM_PUTN  = "putn"
	SYM_CLOCK = "clock"
	SYM_DROP  = "drop"
	SYM_PUSHR = "q<"
	SYM_PULLR = "q>"
	SYM_SHL   = "<<"
	SYM_SHR   = ">>"
	SYM_CLR   = "clr"
	SYM_RAND  = "rand"
	SYM_EXIT  = "exit"
	SYM_DUP   = "dup"
	SYM_DEPTH = "depth"
	SYM_SWAP  = "swap"
	SYM_MOD   = "%"
	SYM_AND   = "&"
	SYM_STASH = "("
	SYM_FETCH = ")"
	SYM_MUL   = "*"
	SYM_ADD   = "+"
	SYM_SUB   = "-"
	SYM_PRN   = "."
	SYM_DIV   = "/"
	SYM_MARK  = ":"
	SYM_DEF   = ";"
	SYM_LT    = "<"
	SYM_EQ    = "="
	SYM_GT    = ">"
	SYM_IF    = "?"
	SYM_BRA   = "["
	SYM_KET   = "]"
	SYM_POW   = "^"
	SYM_OR    = "|"
	SYM_NOT   = "~"
)

var MAX_SYSTEM_OP_CODE = 0xFF
