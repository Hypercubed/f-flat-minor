package utils

// f-flat-minor v0

const (
	OP_NOP   = 0
	OP_CALL  = 1
	OP_PUTC  = 2
	// GETC
	OP_DROP  = 8
	OP_PUSHR = 14
	OP_PULLR = 15
	// CLR
	OP_DUP   = '!'
	// DEPTH
	OP_SWAP  = '$'
	OP_MOD   = '%'
	// STASH
	// FETCH
	OP_MUL   = '*'
	OP_ADD   = '+'
	OP_SUB   = '-'
	OP_PRN   = '.'
	OP_DIV   = '/'
	OP_MARK  = ':'
	OP_DEF   = ';'
	// LT
	OP_EQ    = '='
	// GT
	OP_IF    = '?'
	// BRA
	// KET
	// POW
)

const (
	SYM_NOP   = "nop"
	SYM_CALL  = "eval"
	SYM_PUTC  = "putc"
	// getc
	SYM_DROP  = "drop"
	SYM_PUSHR = "q<"
	SYM_PULLR = "q>"
	// clr
	SYM_DUP   = "dup"
	// depth
	SYM_SWAP  = "swap"
	SYM_MOD   = "%"
	// (
	// )
	SYM_MUL   = "*"
	SYM_ADD   = "+"
	SYM_SUB   = "-"
	SYM_PRN   = "."
	SYM_DIV   = "/"
	SYM_MARK  = ":"
	SYM_DEF   = ";"
	// <
	SYM_EQ    = "="
	// >
	SYM_IF    = "?"
	// [
	// ]
	// ^
)
