package compiler

import (
	"fmt"
	"m/src/engine"
	. "m/src/utils"
	. "math/big"
	"os"
	"path"
	"path/filepath"
	"regexp"
	"strings"
)

type IrInstruction struct {
	value   *Int
	op      string
	comment string
}

var symbolMap = make(map[string]int64)
var code int64 = -1

func defSystem(name string, value int64) {
	symbolMap[name] = value
}

func nextCode() int64 {
	c := code
	code--
	return c
}

func getSymbol(name string) *Int {
	name = strings.ToLower(name)
	if c, ok := symbolMap[name]; ok {
		return NewInt(c)
	}
	symbolMap[name] = nextCode()
	return NewInt(symbolMap[name])
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

func printBigIntArray(a []*Int) {
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

func CompileToBigIntArray(ir []IrInstruction) []*Int {
	out := make([]*Int, 0)
	for _, element := range ir {
		if element.op != "call" || element.value.Cmp(NewInt(0)) != 0 {
			if element.op == "push" {
				out = append(out, NewInt(0))
			}
			out = append(out, element.value)
		}
	}
	return out
}

func CompileToBase64(ir []IrInstruction) string {
	out := make([]Int, 0)
	for _, element := range ir {
		if element.op != "call" || element.value.Cmp(NewInt(0)) != 0 {
			v := NewInt(0).Lsh(element.value, 1)
			if element.op == "call" {
				v = v.Or(v, NewInt(1))
			}
			out = append(out, *v)
		}
	}
	return Encode(out)
}

func Setup() {
	defSystem(SYM_NOP, OP_NOP)
	defSystem(SYM_CALL, OP_CALL)
	defSystem(SYM_PUTC, OP_PUTC)
	defSystem(SYM_GETC, OP_GETC)
	defSystem(SYM_PUTN, OP_PUTN)
	defSystem(SYM_CLOCK, OP_CLOCK)
	defSystem(SYM_DROP, OP_DROP)
	defSystem(SYM_PUSHR, OP_PUSHR)
	defSystem(SYM_PULLR, OP_PULLR)
	defSystem(SYM_SHL, OP_SHL)
	defSystem(SYM_SHR, OP_SHR)
	defSystem(SYM_CLR, OP_CLR)
	defSystem(SYM_RAND, OP_RAND)
	defSystem(SYM_EXIT, OP_EXIT)
	defSystem(SYM_DUP, OP_DUP)
	defSystem(SYM_DEPTH, OP_DEPTH)
	defSystem(SYM_SWAP, OP_SWAP)
	defSystem(SYM_MOD, OP_MOD)
	defSystem(SYM_AND, OP_AND)
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
	defSystem(SYM_OR, OP_OR)
	defSystem(SYM_NOT, OP_NOT)
}

func getInteger(s string) *Int {
	if strings.Contains(s, "e") || strings.Contains(s, "E") {
		if s, ok := new(Float).SetString(s); ok {
			i, _ := s.Int(new(Int))
			return i
		}
	}
	if s, ok := new(Int).SetString(s, 0); ok {
		return s
	}
	return nil
}

var imported = make(map[string]bool)

func CompileToIR(t []string, filename string) []IrInstruction {
	ret := make([]IrInstruction, 0)

	push := func(value *Int, comment string) {
		ret = append(ret, IrInstruction{value: value, op: "push", comment: comment})
	}

	call := func(code *Int, comment string) {
		ret = append(ret, IrInstruction{value: code, op: "call", comment: comment})
	}

	engine.Setup()

	for i := 0; i < len(t); i++ {
		element := t[i]
		number := getInteger(element)

		if number != nil {
			push(number, element)
		} else if strings.HasPrefix(element, ".") && (len(element) > 1) {
			tokens := regexp.MustCompile("\\s").Split(element, 2)
			if tokens[0] == ".load" {
				filepath := getFilepath(tokens[1], filename)
				dat, err := os.ReadFile(filepath)
				check(err)
				ir := CompileToIR(Tokenize(string(dat)), filepath)
				ret = append(ret, ir...)
			} else if tokens[0] == ".import" {
				filepath := getFilepath(tokens[1], filename)
				if !imported[filepath] {
					imported[filepath] = true
					dat, err := os.ReadFile(filepath)
					check(err)
					ir := CompileToIR(Tokenize(string(dat)), filepath)
					ret = append(ret, ir...)
				}
			} else if tokens[0] == ".m" {
				ir := CompileToIR(Tokenize(tokens[1]), filename)
				bigCode := CompileToBigIntArray(ir)
				engine.Run(bigCode)
				for i, item := range engine.GetStack() {
					if i == 0 {
						push(item, "")
					} else {
						push(item, element)
					}
				}
				engine.ClearStack()
			} else if tokens[0] == ".exit" {
				os.Exit(0)
			} else if tokens[0] == ".print" {
				bigCode := CompileToBigIntArray(ret)
				printBigIntArray(bigCode)
			}
		} else if strings.HasPrefix(element, "[") && strings.HasSuffix(element, "]") {
			push(getSymbol(element[1:len(element)-1]), element)
		} else if strings.HasPrefix(element, "'") {
			l := 0
			if strings.HasSuffix(element, "'") {
				l++
			}
			s := convertEsc2Char(element[1 : len(element)-l])
			for i := 0; i < len(s); i++ {
				v := NewInt(int64(s[i]))
				if i == 0 {
					push(v, s)
				} else {
					push(v, "")
				}
			}
		} else if strings.HasSuffix(element, SYM_MARK) {
			if len(element) > 1 {
				name := element[:len(element)-1]
				push(getSymbol(name), name)
			}
			call(NewInt(OP_MARK), SYM_MARK)
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
			call(NewInt(0), comment)
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

	reMacro := regexp.MustCompile("^\\.[^\\s]")

	var tokens []string
	for _, line := range lines {
		if reMacro.Match([]byte(line)) {
			tokens = append(tokens, line)
		} else {
			tokens = append(tokens, strings.Fields(line)...)
		}
	}

	return tokens
}

func convertEsc2Char(str string) string {
	str = strings.Replace(str, "\\0", "\u0000", -1)
	str = strings.Replace(str, "\\b", "\b", -1)
	str = strings.Replace(str, "\\n", "\n", -1)
	str = strings.Replace(str, "\\t", "\t", -1)
	str = strings.Replace(str, "\\r", "\r", -1)
	str = strings.Replace(str, "\\\"", "\"", -1)
	str = strings.Replace(str, "\\'", "'", -1)
	str = strings.Replace(str, "\\\\", "\\", -1)
	str = strings.Replace(str, "\\s", " ", -1)

	return str
}

func getFilepath(filename string, source string) string {
	if filename != "" && !path.IsAbs(filename) {
		relative := path.Join(filepath.Dir(source), filename)
		if _, err := os.Stat(relative); err == nil {
			return relative
		}
	}
	if _, err := os.Stat(filename); err == nil {
		return filename
	}
	panic(fmt.Sprintf("File not found: %s", filename))
}
