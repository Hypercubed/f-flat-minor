package engine

import (
	"fmt"
	. "m/src/utils"
	. "math/big"
	"math/rand"
	"os"
	"time"
)

var nextAnonOp = MAX_SYSTEM_OP_CODE + 1

var stack = []*Int(nil)
var queue = []*Int(nil)

var systemDict = make(map[byte]func())
var userDict = make(map[int64][]*Int)

var setupRan = false

func GetStack() []*Int {
	return stack
}

func ClearStack() {
	stack = nil
}

// Prints the stack
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

// Clone returns a copy of x.
func clone(x *Int) *Int {
	return NewInt(0).Set(x)
}

// If the stack is not empty, return a pointer to the last element in the stack.
func peek() *Int {
	l := len(stack)
	if l > 0 {
		return stack[l-1]
	}
	panic("Peek: Stack is empty")
}

// If the stack is not empty, pop the last element off the stack and return it
func pop() *Int {
	l := len(stack)
	if l > 0 {
		r := stack[l-1]
		stack = stack[:l-1]
		return r
	}
	panic("Pop: Stack is empty")
}

// Push takes a pointer to an Int and appends it to the stack.
func push(a *Int) {
	stack = append(stack, a)
}

// If the queue is not empty, remove the last element from the queue and return it.
func queuePop() *Int {
	l := len(queue)
	if l > 0 {
		r := queue[l-1]
		queue = queue[:l-1]
		return r
	}
	panic("Queue is empty")
}

// Append the value of the pointer to the queue.
func queuePush(a *Int) {
	queue = append(queue, a)
}

// It takes a function and an integer, and adds the function to a map of functions, indexed by the
// integer
func defSystem(fn func(), code int) {
	if _, ok := systemDict[byte(code)]; ok {
		panic("System opcode already defined")
	}
	systemDict[byte(code)] = fn
}

func defUser(def []*Int, code int64) {
	if _, ok := userDict[code]; ok {
		panic("User word already defined")
	}
	userDict[code] = def
}

func call(c *Int) {
	if c.Sign() == -1 || c.Cmp(NewInt(int64(MAX_SYSTEM_OP_CODE))) == 1 {
		if d, ok := userDict[c.Int64()]; ok {
			queue = append(d, queue...)
			return
		} else {
			panic(fmt.Sprintf("Unknown user opcode %d", c))
		}
	} else {
		if fn, ok := systemDict[byte(c.Int64())]; ok {
			defer fn()
		} else {
			panic(fmt.Sprintf("Unknown system opcode %d", c))
		}
	}
}

func Setup() {
	if setupRan {
		return
	}

	rand := rand.New(rand.NewSource(time.Now().UnixNano()))

	defSystem(func() {
		// nop
	}, OP_NOP)

	defSystem(func() {
		x := pop()
		call(x)
	}, OP_CALL)

	defSystem(func() {
		c := rune(pop().Int64())
		fmt.Print(string(c))
	}, OP_PUTC)

	defSystem(func() {
		ascii, _, err := GetChar()
		check(err)
		push(NewInt(int64(ascii)))
	}, OP_GETC)

	defSystem(func() {
		s := pop().Text(10)
		fmt.Print(s)
	}, OP_PRINT)

	defSystem(func() {
		push(NewInt(int64(time.Now().Unix())))
	}, OP_CLOCK)

	defSystem(func() {
		pop()
	}, OP_DROP)

	defSystem(func() {
		x, y := pop(), peek()
		y.Lsh(y, uint(x.Int64()))
	}, OP_SHL)

	defSystem(func() {
		x, y := pop(), peek()
		y.Rsh(y, uint(x.Int64()))
	}, OP_SHR)

	defSystem(func() {
		queuePush(pop())
	}, OP_PUSHR)

	defSystem(func() {
		push(queuePop())
	}, OP_PULLR)

	defSystem(func() {
		ClearStack()
	}, OP_CLR)

	defSystem(func() {
		x := peek()
		x.Rand(rand, x)
	}, OP_RAND)

	defSystem(func() {
		x := pop()
		os.Exit(int(x.Int64()))
	}, OP_EXIT)

	defSystem(func() {
		push(clone(peek()))
	}, OP_DUP)

	defSystem(func() {
		l := len(stack)
		push(NewInt(int64(l)))
	}, OP_DEPTH)

	defSystem(func() {
		x, y := pop(), pop()
		push(x)
		push(y)
	}, OP_SWAP)

	defSystem(func() {
		x, y := pop(), peek()
		y.Mod(y, x)
	}, OP_MOD)

	defSystem(func() {
		x, y := pop(), peek()
		y.And(y, x)
	}, OP_AND)

	defSystem(func() {
		l := len(stack)
		for i := 0; i < l; i++ {
			x := stack[0]
			stack = stack[1:]
			queuePush(x)
		}
		queuePush(NewInt(int64(l)))
	}, OP_STASH)

	defSystem(func() {
		x := queuePop()
		l := int(x.Int64())
		for i := 0; i < l; i++ {
			x := queuePop()
			stack = append([]*Int{x}, stack...)
		}
	}, OP_FETCH)

	defSystem(func() {
		x, y := pop(), peek()
		y.Mul(y, x)
	}, OP_MUL)

	defSystem(func() {
		x, y := pop(), peek()
		y.Add(y, x)
	}, OP_ADD)

	defSystem(func() {
		x, y := pop(), peek()
		y.Sub(y, x)
	}, OP_SUB)

	defSystem(func() {
		Print()
	}, OP_PRN)

	defSystem(func() {
		x, y := pop(), peek()
		y.Div(y, x)
	}, OP_DIV)

	defSystem(func() {
		l := len(stack)
		queuePush(NewInt(int64(l)))
	}, OP_MARK)

	defSystem(func() {
		mm := int(queuePop().Int64())
		def := append([]*Int(nil), stack[mm:]...)
		stack = stack[:mm]
		defUser(def, pop().Int64())
	}, OP_DEF)

	defSystem(func() {
		x, y := pop(), pop()
		if y.Cmp(x) == -1 {
			push(NewInt(1))
		} else {
			push(NewInt(0))
		}
	}, OP_LT)

	defSystem(func() {
		x, y := pop(), pop()
		if y.Cmp(x) == 0 {
			push(NewInt(1))
		} else {
			push(NewInt(0))
		}
	}, OP_EQ)

	defSystem(func() {
		x, y := pop(), pop()
		if y.Cmp(x) == 1 {
			push(NewInt(1))
		} else {
			push(NewInt(0))
		}
	}, OP_GT)

	defSystem(func() {
		x, y := pop(), pop()
		if y.Cmp(NewInt(0)) != 0 {
			call(x)
		}
	}, OP_IF)

	defSystem(func() {
		queuePush(NewInt(int64(len(stack))))
	}, OP_BRA)

	defSystem(func() {
		mm := int(queuePop().Int64())
		def := append([]*Int(nil), stack[mm:]...)
		stack = stack[:mm]
		nextAnonOp++
		op := int64(nextAnonOp)
		defUser(def, op)
		if depth > 0 {
			push(NewInt(0))
		}
		push(NewInt(op))
	}, OP_KET)

	defSystem(func() {
		x, y := pop(), peek()
		y.Exp(y, x, nil)
	}, OP_POW)

	defSystem(func() {
		x, y := pop(), peek()
		y.Or(y, x)
	}, OP_OR)

	defSystem(func() {
		x := peek()
		x.Not(x)
	}, OP_NOT)

	setupRan = true
}

func check(e error) {
	if e != nil {
		panic(e)
	}
}

var MARK = NewInt(OP_MARK)
var DEF = NewInt(OP_DEF)

var BRA = NewInt(OP_BRA)
var KET = NewInt(OP_KET)
var depth = 0

func Run(bc []*Int) {
	queue = bc

	for len(queue) > 0 {
		op := queue[0]
		queue = queue[1:]

		if op.Cmp(DEF) == 0 || op.Cmp(KET) == 0 {
			depth--
		}

		if depth > 0 {
			push(clone(op))
		}

		if op.Cmp(NewInt(0)) == 0 {
			push(clone(queue[0]))
			queue = queue[1:]
		} else if depth < 1 {
			call(op)
		}

		if op.Cmp(MARK) == 0 || op.Cmp(BRA) == 0 {
			depth++
		}
	}
}

func FromBase64(s string) []*Int {
	bigints := make([]*Int, 0)

	for _, c := range Decode(s) {
		op := new(Int).And(&c, NewInt(1))
		v := new(Int).Rsh(&c, 1)
		if op.Sign() == 0 {
			bigints = append(bigints, op)
		}
		bigints = append(bigints, v)
	}

	return bigints
}
