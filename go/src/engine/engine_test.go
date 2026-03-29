package engine

import (
	. "m/src/utils"
	"math/big"
	"testing"
)

func resetEngineStateForTest() {
	nextAnonOp = MAX_SYSTEM_OP_CODE + 1
	stack = nil
	queue = nil
	systemDict = make(map[byte]func())
	userDict = make(map[int64][]*big.Int)
	setupRan = false
	depth = 0
	Setup()
}

func ints(values ...int64) []*big.Int {
	out := make([]*big.Int, 0, len(values))
	for _, value := range values {
		out = append(out, big.NewInt(value))
	}
	return out
}

func assertStack(t *testing.T, expected ...int64) {
	t.Helper()

	if len(stack) != len(expected) {
		t.Fatalf("expected stack size %d, got %d", len(expected), len(stack))
	}

	for i, want := range expected {
		if stack[i].Cmp(big.NewInt(want)) != 0 {
			t.Fatalf("expected stack[%d] = %d, got %s", i, want, stack[i].String())
		}
	}
}

func TestConsExecutionCases(t *testing.T) {
	tests := []struct {
		name     string
		code     []*big.Int
		expected []int64
	}{
		{
			name:     "zero_eval_depth_with_sentinel",
			code:     ints(0, 999, 0, 0, OP_CALL, OP_DEPTH),
			expected: []int64{999, 1},
		},
		{
			name:     "empty_quote",
			code:     ints(0, 4, OP_BRA, OP_KET, OP_CONS, OP_CALL),
			expected: []int64{4},
		},
		{
			name:     "zero_quote",
			code:     ints(0, 4, 0, 0, OP_CONS, OP_CALL),
			expected: []int64{4},
		},
		{
			name:     "push_then_add_quote",
			code:     ints(0, 1, OP_BRA, 0, 2, OP_ADD, OP_KET, OP_CONS, OP_CALL),
			expected: []int64{3},
		},
		{
			name:     "push_then_square_quote",
			code:     ints(0, 4, OP_BRA, OP_DUP, OP_MUL, OP_KET, OP_CONS, OP_CALL),
			expected: []int64{16},
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			resetEngineStateForTest()
			Run(tt.code)
			assertStack(t, tt.expected...)
		})
	}
}

func TestConsCapturesLiteralWhenNested(t *testing.T) {
	resetEngineStateForTest()

	depth = 1
	push(big.NewInt(4))
	push(big.NewInt(0))

	systemDict[byte(OP_CONS)]()

	if len(stack) != 2 {
		t.Fatalf("expected nested cons to leave 2 values on the stack, got %d", len(stack))
	}

	if stack[0].Sign() != 0 {
		t.Fatalf("expected nested cons to prepend literal tag 0, got %s", stack[0].String())
	}

	op := stack[1].Int64()
	if op <= int64(MAX_SYSTEM_OP_CODE) {
		t.Fatalf("expected nested cons to allocate an anonymous op, got %d", op)
	}

	def, ok := userDict[op]
	if !ok {
		t.Fatalf("expected anonymous op %d to be defined", op)
	}

	if len(def) != 2 {
		t.Fatalf("expected cons with 0 tail to encode [0 x], got %d items", len(def))
	}

	if def[0].Sign() != 0 || def[1].Cmp(big.NewInt(4)) != 0 {
		t.Fatalf("expected cons with 0 tail to encode [0 4], got [%s %s]", def[0].String(), def[1].String())
	}
}

func TestDivisionSemanticsTruncateTowardZero(t *testing.T) {
	tests := []struct {
		name     string
		lhs      int64
		rhs      int64
		op       byte
		expected int64
	}{
		{name: "div_negative_positive", lhs: -3, rhs: 2, op: OP_DIV, expected: -1},
		{name: "mod_negative_positive", lhs: -3, rhs: 2, op: OP_MOD, expected: -1},
		{name: "div_positive_negative", lhs: 3, rhs: -2, op: OP_DIV, expected: -1},
		{name: "mod_positive_negative", lhs: 3, rhs: -2, op: OP_MOD, expected: 1},
		{name: "div_negative_negative", lhs: -3, rhs: -2, op: OP_DIV, expected: 1},
		{name: "mod_negative_negative", lhs: -3, rhs: -2, op: OP_MOD, expected: -1},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			resetEngineStateForTest()
			push(big.NewInt(tt.lhs))
			push(big.NewInt(tt.rhs))

			systemDict[tt.op]()

			assertStack(t, tt.expected)
		})
	}
}
