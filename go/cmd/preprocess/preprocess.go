package main

import (
	"flag"
	"fmt"
	"io/ioutil"
	"m/cmd/internal/stdlibroots"
	"m/src/preprocess"
	"os"
)

func check(e error) {
	if e != nil {
		panic(e)
	}
}

func main() {
	inFlagPtr := flag.String("in", "-", "the input file")
	var stdlibRootFlags stdlibroots.Flag
	flag.Var(&stdlibRootFlags, "stdlib-root", "append a standard library search root")
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

	preprocessed := preprocess.NewWithOptions(*inFlagPtr, preprocess.Options{
		StdlibRoots: preprocess.BuildStdlibRoots(stdlibRootFlags.Values()),
	}).Process(code, *inFlagPtr)
	fmt.Println(preprocessed)
}
