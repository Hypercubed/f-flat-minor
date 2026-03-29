package main

import (
	"flag"
	"fmt"
	"io/ioutil"
	"m/src/compiler"
	"m/src/engine"
	"m/src/preprocess"
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

	preprocessFlagPtr := flag.Bool("preprocess", false, "only preprocess, don't execute")
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

	if *preprocessFlagPtr {
		// Preprocess mode: resolve imports and output flat .ff source
		preprocessed := preprocess.New(*inFlagPtr).Process(code, *inFlagPtr)
		fmt.Println(preprocessed)
		return
	}

	tokens := compiler.Tokenize(code)

	ir := compiler.CompileToIR(tokens, *inFlagPtr)

	bigInt := compiler.CompileToBigIntArray(ir)

	engine.Run(bigInt)
}
