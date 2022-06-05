package engine

import (
	"fmt"
	. "m/src/utils"
	. "math/big"
	"math/rand"
	"os"
	"time"
)

var stack = []Int(nil)
var r_stack = []Int(nil)
var symbolMap = make(map[string]int64)
var systemDict = make(map[int64]func())
var userDict = make(map[int64][]Int)

func GetStack() []Int {
	return stack
}

func ClearStack() {
	stack = nil
}

func Print() {
	fmt.Print("[ ")
	for i, num := range stack {
		fmt.Print(num.Text(10))
		if i < len(stack)-1 {
			fmt.Print(" ")
		}
	}
	fmt.Println(" ]")
}

func clone(x Int) Int {
	r := NewInt(0)
	return *r.Add(r, &x)
}

func peek() Int {
	l := len(stack)
	if l > 0 {
		return clone(stack[l-1])
	}
	return *NewInt(0)
}

func pop() Int {
	l := len(stack)
	if l > 0 {
		r := clone(stack[l-1])
		stack = stack[:l-1]
		return r
	}
	return *NewInt(0)
}

func push(a Int) {
	stack = append(stack, a)
}

func rPeek() Int {
	l := len(r_stack)
	if l > 0 {
		return clone(r_stack[l-1])
	}
	return *NewInt(0)
}

func rPop() Int {
	l := len(r_stack)
	if l > 0 {
		r := clone(r_stack[l-1])
		r_stack = r_stack[:l-1]
		return r
	}
	return *NewInt(0)
}

func rPush(a Int) {
	r_stack = append(r_stack, a)
}

func defSystem(fn func(), code int64) {
	systemDict[code] = fn
}

func call(c int64) {
	if fn, ok := systemDict[c]; ok {
		fn()
	} else if d, ok := userDict[c]; ok {
		ExecuteBigIntCode(d)
	} else {
		panic(fmt.Sprintf("Unknown opcode %d", c))
	}
}

func Setup() {
	rand := rand.New(rand.NewSource(time.Now().UnixNano()))

	defSystem(func() {
		// nop
	}, OP_NOP)

	defSystem(func() {
		x := pop()
		call(x.Int64())
	}, OP_CALL)

	defSystem(func() {
		x := pop()
		c := rune(x.Int64())
		fmt.Print(string(c))
	}, OP_PUTC)

	defSystem(func() {
		ascii, _, err := GetChar()
		check(err)
		push(*NewInt(int64(ascii)))
	}, OP_GETC)

	defSystem(func() {
		pop()
	}, OP_DROP)

	defSystem(func() {
		rPush(pop())
	}, OP_PUSHR)

	defSystem(func() {
		push(rPop())
	}, OP_PULLR)

	defSystem(func() {
		ClearStack()
	}, OP_CLR)

	defSystem(func() {
		push(peek())
	}, OP_DUP)

	defSystem(func() {
		l := len(stack)
		push(*NewInt(int64(l)))
	}, OP_DEPTH)

	defSystem(func() {
		x := pop()
		y := pop()
		push(x)
		push(y)
	}, OP_SWAP)

	defSystem(func() {
		x := pop()
		y := pop()
		push(*x.Mod(&y, &x))
	}, OP_MOD)

	defSystem(func() {
		x := pop()
		y := pop()
		push(*x.And(&y, &x))
	}, OP_AND)

	defSystem(func() {
		l := len(stack)
		for i := 0; i < l; i++ {
			x := clone(stack[0])
			stack = stack[1:]
			rPush(x)
		}
		rPush(*NewInt(int64(l)))
	}, OP_STASH)

	defSystem(func() {
		x := rPop()
		l := int(x.Int64())
		for i := 0; i < l; i++ {
			x := rPop()
			stack = append([]Int{x}, stack...)
		}
	}, OP_FETCH)

	defSystem(func() {
		x := pop()
		y := pop()
		push(*x.Mul(&y, &x))
	}, OP_MUL)

	defSystem(func() {
		x := pop()
		y := pop()
		push(*y.Add(&y, &x))
	}, OP_ADD)

	defSystem(func() {
		x := pop()
		y := pop()
		push(*y.Sub(&y, &x))
	}, OP_SUB)

	defSystem(func() {
		Print()
	}, OP_PRN)

	defSystem(func() {
		x := pop()
		y := pop()
		push(*x.Div(&y, &x))
	}, OP_DIV)

	defSystem(func() {
		rPush(*NewInt(int64(len(stack))))
	}, OP_MARK)

	defSystem(func() {
		m := rPop()
		mm := int(m.Int64())
		def := append([]Int(nil), stack[mm:]...)
		stack = stack[:mm]
		n := pop()
		userDict[n.Int64()] = def
	}, OP_DEF)

	defSystem(func() {
		x := pop()
		y := pop()
		push(*x.Or(&y, &x))
	}, OP_OR)

	defSystem(func() {
		x := pop()
		push(*x.Not(&x))
	}, OP_NOT)

	defSystem(func() {
		rPush(*NewInt(int64(len(stack))))
	}, OP_BRA)

	defSystem(func() {
		m := rPop()
		mm := int(m.Int64())
		def := append([]Int(nil), stack[mm:]...)
		stack = stack[:mm]
		n := peek()
		userDict[n.Int64()] = def
	}, OP_KET)

	defSystem(func() {
		x := pop()
		y := pop()
		if y.Cmp(&x) == -1 {
			push(*NewInt(1))
		} else {
			push(*NewInt(0))
		}
	}, OP_LT)

	defSystem(func() {
		x := pop()
		y := pop()
		if y.Cmp(&x) == 0 {
			push(*NewInt(1))
		} else {
			push(*NewInt(0))
		}
	}, OP_EQ)

	defSystem(func() {
		x := pop()
		y := pop()
		if y.Cmp(&x) == 1 {
			push(*NewInt(1))
		} else {
			push(*NewInt(0))
		}
	}, OP_GT)

	defSystem(func() {
		t := pop()
		i := pop()
		if i.Cmp(NewInt(0)) != 0 {
			call(t.Int64())
		}
	}, OP_IF)

	defSystem(func() {
		x := pop()
		y := pop()
		push(*x.Exp(&y, &x, nil))
	}, OP_POW)

	defSystem(func() {
		x := pop()
		os.Exit(int(x.Int64()))
	}, OP_EXIT)

	defSystem(func() {
		x := pop()
		push(*x.Rand(rand, &x))
	}, OP_RND)
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

func ExecuteBigIntCode(bc []Int) {
	depth := 0

	for i := 0; i < len(bc); i++ {
		op := bc[i]

		if op.Cmp(NewInt(OP_DEF)) == 0 || op.Cmp(NewInt(OP_KET)) == 0 {
			depth--
		}

		if depth > 0 {
			stack = append(stack, op)
		}

		if op.Cmp(NewInt(0)) == 0 {
			i++
			stack = append(stack, bc[i])
		} else if depth < 1 {
			call(op.Int64())
		}

		if op.Cmp(NewInt(OP_MARK)) == 0 || op.Cmp(NewInt(OP_BRA)) == 0 {
			depth++
		}
	}
}

func FromBase64(s string) []Int {
	bigints := make([]Int, 0)

	for _, c := range Decode(s) {
		op := new(Int).And(&c, NewInt(1))
		v := new(Int).Rsh(&c, 1)
		if op.Sign() == 0 {
			bigints = append(bigints, *op)
		}
		bigints = append(bigints, *v)
	}

	return bigints
}
