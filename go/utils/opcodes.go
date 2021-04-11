package utils

const (
	OP_NOP    = 0
	OP_CALL   = 1
	OP_SDEF   = ':'
	OP_DEF    = ';'
	OP_MARK   = '['
	OP_UNMARK = ']'
	OP_PRN    = '.'
	OP_PUTC   = 2
	OP_DROP   = 8
	OP_SWAP   = '$'
	OP_DUP    = '!'
	OP_ADD    = '+'
	OP_SUB    = '-'
	OP_MUL    = '*'
	OP_DIV    = '/'
	OP_EQ     = '='
	OP_IF     = '?'
	OP_PUSHR  = 14
	OP_PULLR  = 15
	OP_MOD    = '%'
)

const (
	SYM_NOP    = "nop"
	SYM_CALL   = "eval"
	SYM_SDEF   = ":"
	SYM_DEF    = ";"
	SYM_PRN    = "."
	SYM_PUTC   = "putc"
	SYM_DROP   = "drop"
	SYM_SWAP   = "swap"
	SYM_DUP    = "dup"
	SYM_ADD    = "+"
	SYM_SUB    = "-"
	SYM_MUL    = "*"
	SYM_DIV    = "/"
	SYM_EQ     = "="
	SYM_IF     = "?"
	SYM_PUSHR  = "q<"
	SYM_PULLR  = "q>"
	SYM_MOD    = "%"
	SYM_MARK   = "["
	SYM_UNMARK = "]"
)
