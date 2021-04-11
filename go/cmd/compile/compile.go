package main

import (
	"fmt"
	"io/ioutil"
	"m/utils"
	"math/big"
	"os"
	"strconv"
	"strings"
)

type IrInstruction struct {
	value   big.Int
	op      string
	comment string
}

var symbolMap = make(map[string]int64)

var code int64 = 0x80

func nextCode() int64 {
	c := code
	code++
	return c
}

func defSystem(name string, value int64) {
	symbolMap[name] = value
}

func getSymbol(name string) big.Int {
	if c, ok := symbolMap[name]; ok {
		return *big.NewInt(c)
	}
	symbolMap[name] = nextCode()
	return *big.NewInt(symbolMap[name])
}

func printIr(ir []IrInstruction) {
	for _, element := range ir {
		fmt.Printf("%s\t%s\t; %s\n", element.value.Text(10), element.op, element.comment)
	}
}

func lpad(s string, pad string, plength int) string {
	for i := len(s); i < plength; i++ {
		s = pad + s
	}
	return s
}

func printBigIntArray(a []big.Int) {
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

func compileToBigIntArray(ir []IrInstruction) []big.Int {
	var out = make([]big.Int, 0)
	for _, element := range ir {
		if element.op != "call" || element.value.Cmp(big.NewInt(0)) != 0 {
			if element.op == "push" {
				out = append(out, *big.NewInt(0))
			}
			out = append(out, element.value)
		}
	}
	return out
}

func compileToByteArray(ir []IrInstruction) []byte {
	var out = make([]byte, 0)
	for _, element := range ir {
		if element.op != "call" || element.value.Cmp(big.NewInt(0)) != 0 {
			v := element.value.Int64() << 1
			if element.op == "call" {
				v |= 1
			}
			out = AppendSleb128(out, v)
		}
	}
	return out
}

func AppendSleb128(b []byte, v int64) []byte {
	for {
		c := uint8(v & 0x7f)
		s := uint8(v & 0x40)
		v >>= 7
		if (v != -1 || s == 0) && (v != 0 || s != 0) {
			c |= 0x80
		}
		b = append(b, c)
		if c&0x80 == 0 {
			break
		}
	}
	return b
}

func setup() {
	defSystem(utils.SYM_NOP, utils.OP_NOP)
	defSystem(utils.SYM_CALL, utils.OP_CALL)
	defSystem(utils.SYM_SDEF, utils.OP_SDEF)
	defSystem(utils.SYM_DEF, utils.OP_DEF)
	defSystem(utils.SYM_PRN, utils.OP_PRN)
	defSystem(utils.SYM_PUTC, utils.OP_PUTC)
	defSystem(utils.SYM_DROP, utils.OP_DROP)
	defSystem(utils.SYM_SWAP, utils.OP_SWAP)
	defSystem(utils.SYM_DUP, utils.OP_DUP)
	defSystem(utils.SYM_ADD, utils.OP_ADD)
	defSystem(utils.SYM_SUB, utils.OP_SUB)
	defSystem(utils.SYM_MUL, utils.OP_MUL)
	defSystem(utils.SYM_DIV, utils.OP_DIV)
	defSystem(utils.SYM_EQ, utils.OP_EQ)
	defSystem(utils.SYM_IF, utils.OP_IF)
	defSystem(utils.SYM_PUSHR, utils.OP_PUSHR)
	defSystem(utils.SYM_PULLR, utils.OP_PULLR)
	defSystem(utils.SYM_MOD, utils.OP_MOD)
	defSystem(utils.SYM_MARK, utils.OP_MARK)
	defSystem(utils.SYM_UNMARK, utils.OP_UNMARK)
}

func compileToIR(t []string) []IrInstruction {
	var ret = make([]IrInstruction, 0)

	for i := 0; i < len(t); i++ {
		element := t[i]

		if s, err := strconv.ParseInt(element, 10, 64); err == nil {
			ret = append(ret, IrInstruction{value: *big.NewInt(s), op: "push", comment: element})
		} else if strings.HasPrefix(element, "&") {
			name := element[1:]
			value := getSymbol(name)
			ret = append(ret, IrInstruction{value: value, op: "push", comment: element})
		} else if strings.HasPrefix(element, "'") {
			l := len(ret)
			for i := len(element) - 1; i >= 1; i-- {
				a := int64(element[i])
				ret = append(ret, IrInstruction{value: *big.NewInt(a), op: "push", comment: ""})
			}
			ret[l].comment = element
		} else if strings.HasSuffix(element, ":") {
			if len(element) > 1 {
				name := element[:len(element)-1]
				ret = append(ret, IrInstruction{value: getSymbol(name), op: "push", comment: element})
			}
			ret = append(ret, IrInstruction{value: getSymbol(":"), op: "call", comment: element})
		} else if strings.HasSuffix(element, "[") {
			ret = append(ret, IrInstruction{value: *big.NewInt(nextCode()), op: "push", comment: element})
			ret = append(ret, IrInstruction{value: getSymbol("["), op: "call", comment: element})
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
			ret = append(ret, IrInstruction{value: *big.NewInt(0), op: "call", comment: comment})
		} else {
			value := getSymbol(element)
			ret = append(ret, IrInstruction{value: value, op: "call", comment: element})
		}
	}

	return ret
}

func check(e error) {
	if e != nil {
		panic(e)
	}
}

func main() {
	setup()

	data, err := ioutil.ReadAll(os.Stdin)
	check(err)
	code := string(data)

	var tokens = strings.Fields(code)

	var ir = compileToIR(tokens)
	// printIr(ir)
	// fmt.Println("")
	// fmt.Println("")

	// var bigCode = compileToBigIntArray(ir)
	// printBigIntArray(bigCode)
	// fmt.Println("")
	// fmt.Println("")

	var byteCode = compileToByteArray(ir)
	// printByteArray(byteCode)
	// fmt.Println("")
	// fmt.Println("")

	// var out = make([]byte, 0)
	// for _, element := range AppendSleb128(out, 123456) {
	// 	fmt.Printf("%X ", element)
	// }
	// fmt.Println("")

	header := []byte("F♭A𝄫C♭")

	os.Stdout.Write(header)
	os.Stdout.Write(byteCode)
}
