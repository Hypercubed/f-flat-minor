package compiler

import (
	"fmt"
	"m/src/engine"
	. "m/src/utils"
	. "math/big"
	"os"
	"strings"
)

type IrInstruction struct {
	value   Int
	op      string
	comment string
}

var symbolMap = make(map[string]int64)

var code int64 = 0x80

func defSystem(name string, value int64) {
	symbolMap[name] = value
}

func nextCode() int64 {
	c := code
	code++
	return c
}

func getSymbol(name string) Int {
	if c, ok := symbolMap[name]; ok {
		return *NewInt(c)
	}
	symbolMap[name] = nextCode()
	return *NewInt(symbolMap[name])
}

func printIr(ir []IrInstruction) {
	for _, element := range ir {
		fmt.Printf("%s\t%s\t; /* %s */\n", element.value.Text(10), element.op, element.comment)
	}
}

func lpad(s string, pad string, plength int) string {
	for i := len(s); i < plength; i++ {
		s = pad + s
	}
	return s
}

func printBigIntArray(a []Int) {
	for i, element := range a {
		fmt.Printf(lpad(element.Text(16), "0", 2))
		fmt.Printf(" ")
		if i%16 == 15 {
			fmt.Printf("\n")
		}
	}
	fmt.Printf("\n")
	fmt.Printf("%s %d", "BigInts", len(a))
}

func printByteArray(a []byte) {
	for i, element := range a {
		fmt.Printf("%X", element)
		fmt.Printf(" ")
		if i%16 == 15 {
			fmt.Printf("\n")
		}
	}
	fmt.Printf("\n")
	fmt.Printf("%s %d", "Bytes", len(a))
}

func compileToBigIntArray(ir []IrInstruction) []Int {
	var out = make([]Int, 0)
	for _, element := range ir {
		if element.op != "call" || element.value.Cmp(NewInt(0)) != 0 {
			if element.op == "push" {
				out = append(out, *NewInt(0))
			}
			out = append(out, element.value)
		}
	}
	return out
}

func CompileToByteArray(ir []IrInstruction) []byte {
	var out = make([]byte, 0)
	for _, element := range ir {
		if element.op != "call" || element.value.Cmp(NewInt(0)) != 0 {
			v := NewInt(0)
			v = v.Lsh(&element.value, 1)
			if element.op == "call" {
				v = v.Or(v, NewInt(1))
			}
			out = AppendSleb128(out, v)
		}
	}
	return out
}

func Setup() {
	defSystem(SYM_NOP, OP_NOP)
	defSystem(SYM_CALL, OP_CALL)
	defSystem(SYM_PUTC, OP_PUTC)
	defSystem(SYM_GETC, OP_GETC)
	defSystem(SYM_DROP, OP_DROP)
	defSystem(SYM_PUSHR, OP_PUSHR)
	defSystem(SYM_PULLR, OP_PULLR)
	defSystem(SYM_CLR, OP_CLR)
	defSystem(SYM_DUP, OP_DUP)
	defSystem(SYM_DEPTH, OP_DEPTH)
	defSystem(SYM_SWAP, OP_SWAP)
	defSystem(SYM_MOD, OP_MOD)
	defSystem(SYM_STASH, OP_STASH)
	defSystem(SYM_FETCH, OP_FETCH)
	defSystem(SYM_MUL, OP_MUL)
	defSystem(SYM_ADD, OP_ADD)
	defSystem(SYM_SUB, OP_SUB)
	defSystem(SYM_PRN, OP_PRN)
	defSystem(SYM_DIV, OP_DIV)
	defSystem(SYM_MARK, OP_MARK)
	defSystem(SYM_DEF, OP_DEF)
	defSystem(SYM_LT, OP_LT)
	defSystem(SYM_EQ, OP_EQ)
	defSystem(SYM_GT, OP_GT)
	defSystem(SYM_IF, OP_IF)
	defSystem(SYM_BRA, OP_BRA)
	defSystem(SYM_KET, OP_KET)
	defSystem(SYM_POW, OP_POW)
}

func CompileToIR(t []string) []IrInstruction {
	var ret = make([]IrInstruction, 0)

	push := func(value Int, comment string) {
		ret = append(ret, IrInstruction{value: value, op: "push", comment: comment})
	}

	call := func(code Int, comment string) {
		ret = append(ret, IrInstruction{value: code, op: "call", comment: comment})
	}

	engine.Setup()

	for i := 0; i < len(t); i++ {
		element := t[i]

		if s, ok := new(Int).SetString(element, 0); ok {
			push(*s, element)
		} else if strings.HasPrefix(element, ".") && len(element) > 1 {
			tokens := strings.SplitN(element, " ", 2)
			if strings.HasPrefix(tokens[0], ".load") {
				dat, err := os.ReadFile(tokens[1])
				check(err)
				ir := CompileToIR(Tokenize(string(dat)))
				ret = append(ret, ir...)
			} else if strings.HasPrefix(element, ".m") {
				ir := CompileToIR(Tokenize(tokens[1]))
				bigCode := compileToBigIntArray(ir)
				engine.ExecuteBigIntCode(bigCode)
				for _, item := range engine.GetStack() {
					push(item, "")
				}
				engine.ClearStack()
			}
		} else if strings.HasPrefix(element, "&") {
			push(getSymbol(element[1:]), element)
		} else if strings.HasPrefix(element, "'") {
			l := len(ret)
			for i := len(element) - 1; i >= 1; i-- {
				push(*NewInt(int64(element[i])), "")
			}
			ret[l].comment = element
		} else if strings.HasSuffix(element, SYM_MARK) {
			if len(element) > 1 {
				name := element[:len(element)-1]
				push(getSymbol(name), name)
			}
			call(*NewInt(OP_MARK), ":")
		} else if element == "/*" {
			i++
			var comment = element + " "
			for ; i < len(t); i++ {
				element = t[i]
				comment += element + " "
				if element == "*/" {
					break
				}
			}
			call(*NewInt(0), comment)
		} else if element == "[" {
			push(*NewInt(nextCode()), element)
			call(*NewInt(OP_BRA), element)
		} else {
			call(getSymbol(element), element)
		}
	}

	return ret
}

func check(e error) {
	if e != nil {
		panic(e)
	}
}

func Tokenize(code string) []string {
	lines := strings.Split(code, "\n")

	var tokens []string
	for _, line := range lines {
		if strings.HasPrefix(line, ".") {
			tokens = append(tokens, line)
		} else {
			tokens = append(tokens, strings.Fields(line)...)
		}
	}

	return tokens
}
