package main

import (
	"io/ioutil"
	"m/src/compiler"
	"m/src/engine"
	"os"
)

func check(e error) {
	if e != nil {
		panic(e)
	}
}

func main() {
	compiler.Setup()
	engine.Setup()

	data, err := ioutil.ReadAll(os.Stdin)
	check(err)
	code := string(data)

	tokens := compiler.Tokenize(code)

	ir := compiler.CompileToIR(tokens)

	bigInt := compiler.CompileToBigIntArray(ir)

	engine.ExecuteBigIntCode(bigInt)
}
