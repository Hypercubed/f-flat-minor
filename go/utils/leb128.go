package utils

import (
	"bufio"
	"math/big"
)

var SIGNIFICANT_BITS = uint(7)
var CONTINUE = byte(0x80)
var REST_MASK = byte(0x7f)

// TODO: needs to use big.int
func ReadVarUint(r *bufio.Reader) (uint64, error) {
	var res uint64 = 0
	var shift uint = 0

	for {
		b, err := r.ReadByte()
		if err != nil {
			return 0, err
		}
		res |= (uint64((b & REST_MASK))) << shift
		if b&CONTINUE == 0 {
			return res, nil
		}
		shift += SIGNIFICANT_BITS
	}
}

func ReadVarint(r *bufio.Reader) (int64, error) {
	result, err := ReadVarUint(r)
	if err != nil {
		return 0, err
	}
	sign := result & 1
	result = result >> 1
	if sign == 0 {
		return int64(result), nil
	} else {
		return (int64(result) * -1), nil
	}
}

func AppendUleb128(b []byte, v *big.Int) []byte {
	for {
		z := big.NewInt(0).And(v, big.NewInt(int64(REST_MASK)))
		c := uint8(z.Uint64())
		v = v.Rsh(v, SIGNIFICANT_BITS)
		if v.Sign() != 0 {
			c |= CONTINUE
		}
		b = append(b, c)
		if c&CONTINUE == 0 {
			break
		}
	}
	return b
}

// TODO: needs to use big.int
func AppendSleb128(b []byte, v *big.Int) []byte {
	neg := v.Sign() == -1
	v = v.Lsh(v, 1)
	if neg {
		v = v.Abs(v).Add(v, big.NewInt(1))
	}
	return AppendUleb128(b, v)
}
