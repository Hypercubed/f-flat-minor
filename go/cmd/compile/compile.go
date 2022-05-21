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

func defSystem(name string, value int64) {
	symbolMap[name] = value
}

func nextCode() int64 {
  c := code
  code++
  return c
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
	defSystem(utils.SYM_PUTC, utils.OP_PUTC)
  defSystem(utils.SYM_GETC, utils.OP_GETC)
	defSystem(utils.SYM_DROP, utils.OP_DROP)
	defSystem(utils.SYM_PUSHR, utils.OP_PUSHR)
	defSystem(utils.SYM_PULLR, utils.OP_PULLR)
  defSystem(utils.SYM_CLR, utils.OP_CLR)
	defSystem(utils.SYM_DUP, utils.OP_DUP)
  defSystem(utils.SYM_DEPTH, utils.OP_DEPTH)
	defSystem(utils.SYM_SWAP, utils.OP_SWAP)
	defSystem(utils.SYM_MOD, utils.OP_MOD)
  defSystem(utils.SYM_STASH, utils.OP_STASH)
  defSystem(utils.SYM_FETCH, utils.OP_FETCH)
	defSystem(utils.SYM_MUL, utils.OP_MUL)
	defSystem(utils.SYM_ADD, utils.OP_ADD)
	defSystem(utils.SYM_SUB, utils.OP_SUB)
	defSystem(utils.SYM_PRN, utils.OP_PRN)
	defSystem(utils.SYM_DIV, utils.OP_DIV)
	defSystem(utils.SYM_MARK, utils.OP_MARK)
	defSystem(utils.SYM_DEF, utils.OP_DEF)
  defSystem(utils.SYM_LT, utils.OP_LT)
	defSystem(utils.SYM_EQ, utils.OP_EQ)
  defSystem(utils.SYM_GT, utils.OP_GT)
	defSystem(utils.SYM_IF, utils.OP_IF)
  defSystem(utils.SYM_BRA, utils.OP_BRA)
  defSystem(utils.SYM_KET, utils.OP_KET)
  defSystem(utils.SYM_POW, utils.OP_POW)
}

func compileToIR(t []string) []IrInstruction {
	var ret = make([]IrInstruction, 0)

  push := func (value big.Int, comment string) {
    ret = append(ret, IrInstruction{value: value, op: "push", comment: comment})
  }

  call := func (code big.Int, comment string) {
    ret = append(ret, IrInstruction{value: code, op: "call", comment: comment})
  }

	for i := 0; i < len(t); i++ {
		element := t[i]

		if s, err := strconv.ParseInt(element, 10, 64); err == nil {
      push(*big.NewInt(s), element)
    } else if strings.HasPrefix(element, ".") && len(element) > 1 {
      switch element {
        case ".load":
          i++
          filename := t[i]
          dat, err := os.ReadFile(filename)
          check(err)
          tokens := strings.Fields(string(dat))
          ir := compileToIR(tokens)
          ret = append(ret, ir...)
      }
		} else if strings.HasPrefix(element, "&") {
			push(getSymbol(element[1:]), element)
		} else if strings.HasPrefix(element, "'") {
			l := len(ret)
			for i := len(element) - 1; i >= 1; i-- {
        push(*big.NewInt(int64(element[i])), "")
			}
			ret[l].comment = element
		} else if strings.HasSuffix(element, utils.SYM_MARK) {
			if len(element) > 1 {
				name := element[:len(element)-1]
        push(getSymbol(name), name)
			}
      call(*big.NewInt(utils.OP_MARK), ":")
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
      call(*big.NewInt(0), comment)
		} else if element == "[" {
      push(*big.NewInt(nextCode()), element)
      call(*big.NewInt(utils.OP_BRA), element)
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

func main() {
	setup()

	data, err := ioutil.ReadAll(os.Stdin)
	check(err)
	code := string(data)

	tokens := strings.Fields(code)

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
