package main

import (
	"bufio"
	"errors"
	"fmt"
	"io"
	"m/utils"
	"math/big"
	"os"
)

var stack = make([]big.Int, 0)
var r_stack = make([]big.Int, 0)
var symbolMap = make(map[string]int64)
var systemDict = make(map[int64]func())
var userDict = make(map[int64][]big.Int)

func peek() big.Int {
	i := len(stack) - 1
	x := stack[i]
	r := big.NewInt(0)
	return *r.Add(r, &x)
}

func pop() big.Int {
	i := len(stack) - 1
	x := peek()
	stack = append((stack)[:i])
	return x
}

func defSystem(fn func(), code int64) {
	systemDict[code] = fn
}

func call(c int64) {
	if fn, ok := systemDict[c]; ok {
		fn()
	} else if d, ok := userDict[c]; ok {
		executeBigIntCode(d)
	}
}

func setup() {
	defSystem(func() {
		// nop
	}, utils.OP_NOP)

	defSystem(func() {
		x := pop()
		call(x.Int64())
	}, utils.OP_CALL)

	defSystem(func() {
		name := stack[0]
		def := stack[1:]
		userDict[name.Int64()] = def
		stack = make([]big.Int, 0)
	}, utils.OP_DEF)

	defSystem(func() {
		fmt.Print("[")
		for i, num := range stack {
			fmt.Print(num.Text(10))
			if i < len(stack)-1 {
				fmt.Print(" ")
			}
		}
		fmt.Println("]")
	}, utils.OP_PRN)

	defSystem(func() {
		x := pop()
		c := rune(x.Int64())
		fmt.Print(string(c))
	}, utils.OP_PUTC)

	defSystem(func() {
		pop()
	}, utils.OP_DROP)

	defSystem(func() {
		x := pop()
		y := pop()
		stack = append(stack, x, y)
	}, utils.OP_SWAP)

	defSystem(func() {
		x := peek()
		stack = append(stack, x)
	}, utils.OP_DUP)

	defSystem(func() {
		x := pop()
		y := peek()
		stack[len(stack)-1] = *y.Add(&y, &x)
	}, utils.OP_ADD)

	defSystem(func() {
		x := pop()
		y := peek()
		stack[len(stack)-1] = *y.Sub(&y, &x)
	}, utils.OP_SUB)

	defSystem(func() {
		x := pop()
		y := peek()
		stack[len(stack)-1] = *x.Mul(&y, &x)
	}, utils.OP_MUL)

	defSystem(func() {
		x := pop()
		y := peek()
		stack[len(stack)-1] = *x.Mod(&y, &x)
	}, utils.OP_MOD)

	defSystem(func() {
		x := pop()
		y := peek()
		stack[len(stack)-1] = *x.Div(&x, &y)
	}, utils.OP_DIV)

	defSystem(func() {
		x := pop()
		y := peek()
		if x.Cmp(&y) == 0 {
			stack[len(stack)-1] = *big.NewInt(1)
		} else {
			stack[len(stack)-1] = *big.NewInt(0)
		}
	}, utils.OP_EQ)

	defSystem(func() {
		t := pop()
		i := pop()
		if i.Cmp(big.NewInt(0)) != 0 {
			call(t.Int64())
		}
	}, utils.OP_IF)

	defSystem(func() {
		a := pop()
		r_stack = append(r_stack, a)
	}, utils.OP_PUSHR)

	defSystem(func() {
		i := len(r_stack) - 1
		x := r_stack[i]
		r := big.NewInt(0)
		r_stack = append((r_stack)[:i])
		stack = append(stack, *r.Add(r, &x))
	}, utils.OP_PULLR)
}

func readVarint(r io.Reader, n uint) (int64, error) {
	if n > 64 {
		panic(errors.New("leb128: n must <= 64"))
	}
	p := make([]byte, 1)
	var res int64
	var shift uint
	for {
		_, err := io.ReadFull(r, p)
		if err != nil {
			return 0, err
		}
		b := int64(p[0])
		switch {
		case b < 1<<6 && uint64(b) < uint64(1<<(n-1)):
			res += (1 << shift) * b
			return res, nil
		case b >= 1<<6 && b < 1<<7 && uint64(b)+1<<(n-1) >= 1<<7:
			res += (1 << shift) * (b - 1<<7)
			return res, nil
		case b >= 1<<7 && n > 7:
			res += (1 << shift) * (b - 1<<7)
			shift += 7
			n -= 7
		default:
			return 0, errors.New("leb128: invalid int")
		}
	}
}

func check(e error) {
	if e != nil {
		panic(e)
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

func executeBigIntCode(bc []big.Int) {
	for i := 0; i < len(bc); i++ {
		op := bc[i]
		if op.Cmp(big.NewInt(0)) == 0 {
			v := bc[i+1]
			// fmt.Print(v.Text(10))
			// fmt.Println(" PUSH")
			stack = append(stack, v)
			i++
		} else {
			// fmt.Print(op.Text(10))
			// fmt.Println(" CALL")
			call(op.Int64())
		}
	}
}

func main() {
	setup()

	reader := bufio.NewReader(os.Stdin)

	var out = make([]int64, 0)

	for {
		c, err := readVarint(reader, 64)
		if err != nil {
			break
		}
		out = append(out, c)
	}

	var bout = make([]big.Int, 0)

	for _, value := range out {
		op := value & 1
		v := value >> 1
		if op == 0 {
			bout = append(bout, *big.NewInt(0))
		}
		bout = append(bout, *big.NewInt(v))
	}

	// fmt.Println(" ")
	// printBigIntArray(bout)
	// fmt.Println(" ")
	// fmt.Println(" ")

	executeBigIntCode(bout)
}
