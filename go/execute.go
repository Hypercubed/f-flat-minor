package main

import (
	"fmt"
	"math/big"
	"strconv"
	"strings"
)

var stack = make([]big.Int, 0)
var symbolMap = make(map[string]int64)
var systemDict = make(map[int64]func())
var userDict = make(map[int64][]string)

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

var code int64 = 0

func defSystem(name string, fn func()) {
	symbolMap[name] = code
	systemDict[code] = fn
	code++
}

func defUser(name string, def []string) {
	symbolMap[name] = code
	userDict[code] = def
	code++
}

func call(c int64) {
	if fn, ok := systemDict[c]; ok {
		fn()
	} else if d, ok := userDict[c]; ok {
		eval(d)
	}
}

func setup() {
	defSystem("nop", func() {
		// nop
	})

	defSystem("call", func() {
		x := pop()
		call(x.Int64())
	})

	defSystem(".", func() {
		fmt.Print("[")
		for i, num := range stack {
			fmt.Print(num.Text(10))
			if i < len(stack)-1 {
				fmt.Print(" ")
			}
		}
		fmt.Println("]")
	})

	defSystem("putc", func() {
		x := pop()
		c := rune(x.Int64())
		fmt.Print(string(c))
	})

	defSystem("drop", func() {
		pop()
	})

	defSystem("swap", func() {
		x := pop()
		y := pop()
		stack = append(stack, x, y)
	})

	defSystem("dup", func() {
		x := peek()
		stack = append(stack, x)
	})

	defSystem("+", func() {
		x := pop()
		y := peek()
		stack[len(stack)-1] = *y.Add(&x, &y)
	})

	defSystem("-", func() {
		x := pop()
		y := peek()
		stack[len(stack)-1] = *y.Sub(&y, &x)
	})

	defSystem("*", func() {
		x := pop()
		y := peek()
		stack[len(stack)-1] = *x.Mul(&x, &y)
	})

	defSystem("/", func() {
		x := pop()
		y := peek()
		stack[len(stack)-1] = *x.Div(&x, &y)
	})

	defSystem("=", func() {
		x := pop()
		y := peek()
		if x.Cmp(&y) == 0 {
			stack[len(stack)-1] = *big.NewInt(1)
		} else {
			stack[len(stack)-1] = *big.NewInt(0)
		}
	})

	defSystem("?", func() { // if
		t := pop()
		i := pop()
		if i.Cmp(big.NewInt(0)) != 0 {
			call(t.Int64())
		}
	})

	defSystem("dip", func() { // if
		a := pop()
		b := pop()
		call(a.Int64())
		stack = append(stack, b)
	})
}

func eval(t []string) {
	for i := 0; i < len(t); i++ {
		element := t[i]
		if s, err := strconv.ParseInt(element, 10, 64); err == nil {
			stack = append(stack, *big.NewInt(s))
		} else if strings.HasPrefix(element, "&") {
			name := element[1:]
			if c, ok := symbolMap[name]; ok {
				stack = append(stack, *big.NewInt(c))
			}
		} else if strings.HasPrefix(element, "'") {
			for i := len(element) - 1; i >= 1; i-- {
				a := int64(element[i])
				stack = append(stack, *big.NewInt(a))
			}
		} else if c, ok := symbolMap[element]; ok {
			call(c)
		} else if strings.HasSuffix(element, ":") {
			name := element[:len(element)-1]
			def := make([]string, 0)
			i++
			for ; i < len(t); i++ {
				element = t[i]
				if element == ";" {
					break
				}
				def = append(def, element)
			}
			defUser(name, def)
		} else if element == "/*" {
			i++
			for ; i < len(t); i++ {
				element = t[i]
				if element == "*/" {
					break
				}
			}
		}
	}
}

func main() {
	setup()

	eval(strings.Fields(`

        /* common definitions */
        --: 1 - ;
        not: 0 = ;
        rot: &swap dip swap ;
        choose: &swap ? drop ;
        ifte: rot choose call ;

        /* define factorial */
        fact_t: drop 1 ;
        fact_f: dup -- fact * ;
        fact: dup &fact_t &fact_f ifte ;

        /* string printing */
        print_t: drop ;
        print_f: putc print ;
        print: dup &print_t &print_f ifte ;
        println: print 10 putc ;

        0 'Factorial print
        32 putc
        0 '100 println

        100 fact .

  `))
}
