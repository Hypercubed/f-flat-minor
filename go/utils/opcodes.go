package utils

const (
	OP_NOP   = 0
	OP_CALL  = 1
	OP_DEF   = ';'
	OP_PRN   = '.'
	OP_PUTC  = '@'
	OP_DROP  = '$'
	OP_SWAP  = '%'
	OP_DUP   = '!'
	OP_ADD   = '+'
	OP_SUB   = '-'
	OP_MUL   = '*'
	OP_DIV   = '/'
	OP_EQ    = '='
	OP_IF    = '?'
	OP_PUSHR = 's'
	OP_PULLR = 'u'
	OP_MOD   = 'm'
)

const (
	SYM_NOP   = "nop"
	SYM_CALL  = "eval"
	SYM_DEF   = ";"
	SYM_PRN   = "."
	SYM_PUTC  = "putc"
	SYM_DROP  = "drop"
	SYM_SWAP  = "swap"
	SYM_DUP   = "dup"
	SYM_ADD   = "+"
	SYM_SUB   = "-"
	SYM_MUL   = "*"
	SYM_DIV   = "/"
	SYM_EQ    = "="
	SYM_IF    = "?"
	SYM_PUSHR = "q<"
	SYM_PULLR = "q>"
	SYM_MOD   = "%"
)
