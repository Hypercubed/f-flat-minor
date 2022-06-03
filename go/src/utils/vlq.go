package utils

import (
	. "math/big"
	"strings"
)

var BASE64_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"

var VLQ_BASE_SHIFT = uint(5)
var VLQ_BASE = NewInt(0b100000) // 0b100000
var VLQ_CONTINUATION_BIT = uint64(0b100000)
var VLQ_BASE_MASK = NewInt(0b11111)

var ONE = NewInt(1)

func Encode(ints []Int) string {
	out := ""

	for _, x := range ints {
		x = toVLQSigned(x)
		for _, b := range vlqEncode(x) {
			out += base64Encode(b)
		}
	}

	return out
}

func Decode(data string) []Int {
	out := []Int{}
	vlqs := [][]byte{}
	vlq := []byte{}

	for _, x := range data {
		sextet := base64Decode(string(x))
		vlq = append([]byte{byte(sextet)}, vlq...)
		if (uint64(sextet) & VLQ_CONTINUATION_BIT) == 0 {
			vlqs = append(vlqs, vlq)
			vlq = []byte{}
		}
	}

	for _, vlq := range vlqs {
		x := vlqDecode(vlq)
		x = fromVLQSigned(x)
		out = append(out, x)
	}

	return out
}

func vlqDecode(vlq []byte) Int {
	x := NewInt(0)
	for _, sextet := range vlq {
		x.Lsh(x, VLQ_BASE_SHIFT)
		s := NewInt(int64(sextet))
		x.Or(x, s.And(s, VLQ_BASE_MASK))
	}
	return *x
}

func fromVLQSigned(x Int) Int {
	isNeg := NewInt(0).And(&x, ONE).Sign() == 1
	x.Rsh(&x, 1)
	if isNeg {
		x.Neg(&x)
	}
	return x
}

func toVLQSigned(x Int) Int {
	isNeg := x.Sign() == -1
	x.Abs(&x)
	x.Lsh(&x, 1)

	if isNeg {
		x.Add(&x, ONE)
	}
	return x
}

func vlqEncode(x Int) []byte {
	if x.Sign() == 0 {
		return []byte{0}
	}

	sextets := []byte{}
	for x.Sign() > 0 {
		sextet := NewInt(0).And(&x, VLQ_BASE_MASK).Uint64()
		x.Rsh(&x, 5)
		if x.Sign() > 0 {
			sextet = sextet | VLQ_CONTINUATION_BIT
		}
		sextets = append(sextets, byte(sextet))
	}
	return sextets
}

func base64Decode(char string) int {
	return strings.Index(BASE64_ALPHABET, char)
}

func base64Encode(sextet byte) string {
	return string(BASE64_ALPHABET[sextet])
}
