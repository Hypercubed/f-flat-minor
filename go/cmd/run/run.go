package main

import (
	"flag"
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

	inFlagPtr := flag.String("in", "-", "the input file")
	flag.Parse()

	code := ""

	if *inFlagPtr != "" && *inFlagPtr != "-" {
		data, err := os.ReadFile(*inFlagPtr)
		check(err)
		code = string(data)
	} else {
		data, err := ioutil.ReadAll(os.Stdin)
		check(err)
		code = string(data)
	}

	tokens := compiler.Tokenize(code)

	ir := compiler.CompileToIR(tokens, *inFlagPtr)

	bigInt := compiler.CompileToBigIntArray(ir)

	engine.ExecuteBigIntCode(bigInt)
}
