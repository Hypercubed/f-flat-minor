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

var stack = []big.Int(nil)
var r_stack = []big.Int(nil)
var symbolMap = make(map[string]int64)
var systemDict = make(map[int64]func())
var userDict = make(map[int64][]big.Int)

func clone(x big.Int) big.Int {
	r := big.NewInt(0)
	return *r.Add(r, &x)
}

func peek() big.Int {
	l := len(stack)
	if l > 0 {
		return clone(stack[l-1])
	}
	return *big.NewInt(0)
}

func pop() big.Int {
	l := len(stack)
	if l > 0 {
		r := clone(stack[l-1])
		stack = stack[:l-1]
		return r
	}
	return *big.NewInt(0)
}

func push(a big.Int) {
	stack = append(stack, a)
}

func rpeek() big.Int {
	l := len(r_stack)
	if l > 0 {
		return clone(r_stack[l-1])
	}
	return *big.NewInt(0)
}

func rpop() big.Int {
	l := len(r_stack)
	if l > 0 {
		r := clone(r_stack[l-1])
		r_stack = r_stack[:l-1]
		return r
	}
	return *big.NewInt(0)
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
		x := pop()
		c := rune(x.Int64())
		fmt.Print(string(c))
	}, utils.OP_PUTC)

	defSystem(func() {
		panic(errors.New("OP_GETC not defined"))
	}, utils.OP_GETC)

	defSystem(func() {
		pop()
	}, utils.OP_DROP)

	defSystem(func() {
		a := pop()
		r_stack = append(r_stack, a)
	}, utils.OP_PUSHR)

	defSystem(func() {
		push(rpop())
	}, utils.OP_PULLR)

	defSystem(func() {
		stack = nil
	}, utils.OP_CLR)

	defSystem(func() {
		push(peek())
	}, utils.OP_DUP)

	defSystem(func() {
		l := len(stack)
		push(*big.NewInt(int64(l)))
	}, utils.OP_DEPTH)

	defSystem(func() {
		x := pop()
		y := pop()
		push(x)
		push(y)
	}, utils.OP_SWAP)

	defSystem(func() {
		x := pop()
		y := pop()
		push(*x.Mod(&y, &x))
	}, utils.OP_MOD)

	defSystem(func() {
		panic(errors.New("OP_LSTASH not defined"))
	}, utils.OP_STASH)

	defSystem(func() {
		panic(errors.New("OP_FETCH not defined"))
	}, utils.OP_FETCH)

	defSystem(func() {
		x := pop()
		y := pop()
		push(*x.Mul(&y, &x))
	}, utils.OP_MUL)

	defSystem(func() {
		x := pop()
		y := pop()
		push(*y.Add(&y, &x))
	}, utils.OP_ADD)

	defSystem(func() {
		x := pop()
		y := pop()
		push(*y.Sub(&y, &x))
	}, utils.OP_SUB)

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
		y := pop()
		push(*x.Div(&x, &y))
	}, utils.OP_DIV)

	defSystem(func() {
		m := len(stack)
		r_stack = append(r_stack, *big.NewInt(int64(m)))
	}, utils.OP_MARK)

	defSystem(func() {
		m := len(stack)
		r_stack = append(r_stack, *big.NewInt(int64(m)))
	}, utils.OP_BRA)

	defSystem(func() {
		m := rpop()
		mm := int(m.Int64())
		def := append([]big.Int(nil), stack[mm:]...)
		stack = stack[:mm]
		n := pop()
		userDict[n.Int64()] = def
	}, utils.OP_DEF)

	defSystem(func() {
		m := rpop()
		mm := int(m.Int64())
		def := append([]big.Int(nil), stack[mm:]...)
		stack = stack[:mm]
		n := peek()
		userDict[n.Int64()] = def
	}, utils.OP_KET)

	defSystem(func() {
		x := pop()
		y := pop()
		if y.Cmp(&x) == -1 {
			push(*big.NewInt(1))
		} else {
			push(*big.NewInt(0))
		}
	}, utils.OP_LT)

	defSystem(func() {
		x := pop()
		y := pop()
		if x.Cmp(&y) == 0 {
			push(*big.NewInt(1))
		} else {
			push(*big.NewInt(0))
		}
	}, utils.OP_EQ)

	defSystem(func() {
		x := pop()
		y := pop()
		if y.Cmp(&x) == 1 {
			push(*big.NewInt(1))
		} else {
			push(*big.NewInt(0))
		}
	}, utils.OP_GT)

	defSystem(func() {
		t := pop()
		i := pop()
		if i.Cmp(big.NewInt(0)) != 0 {
			call(t.Int64())
		}
	}, utils.OP_IF)

	defSystem(func() {
		x := pop()
		y := pop()
		push(*x.Exp(&x, &y, nil))
	}, utils.OP_POW)
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
	var depth = 0

	for i := 0; i < len(bc); i++ {
		op := bc[i]

		if op.Cmp(big.NewInt(utils.OP_DEF)) == 0 || op.Cmp(big.NewInt(utils.OP_KET)) == 0 {
			depth--
		}

		if depth > 0 {
			stack = append(stack, op)
		}

		if op.Cmp(big.NewInt(0)) == 0 {
			stack = append(stack, bc[i+1])
			i++
		} else if depth < 1 {
			call(op.Int64())
		}

		if op.Cmp(big.NewInt(utils.OP_MARK)) == 0 || op.Cmp(big.NewInt(utils.OP_BRA)) == 0 {
			depth++
		}
	}
}

func main() {
	setup()

	reader := bufio.NewReader(os.Stdin)

	header := []byte("F♭A𝄫C♭")

	for i := 0; i < len(header); i++ {
		c, err := reader.ReadByte()
		if (err == io.EOF) || (c != header[i]) {
			panic("Invalid Header")
		}
	}

	var out = make([]int64, 0)

	for {
		c, err := utils.ReadVarint(reader)
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
