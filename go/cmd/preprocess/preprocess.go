package main

import (
	"flag"
	"fmt"
	"io/ioutil"
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

	preprocessed := preprocess.New(*inFlagPtr).Process(code, *inFlagPtr)
	fmt.Println(preprocessed)
}
