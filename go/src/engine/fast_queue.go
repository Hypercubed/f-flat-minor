package engine

import (
	. "math/big"
)

type FastQueue struct {
	buffer []*Int
	head   int
	tail   int
	length int
	mask   int
}

func NewFastQueue(initialCapacity int) *FastQueue {
	if initialCapacity < 1 {
		initialCapacity = 16
	}
	capacity := 1
	for capacity < initialCapacity {
		capacity <<= 1
	}
	return &FastQueue{
		buffer: make([]*Int, capacity),
		head:   0,
		tail:   0,
		length: 0,
		mask:   capacity - 1,
	}
}

func (q *FastQueue) expand() {
	newCapacity := len(q.buffer) * 2
	newBuffer := make([]*Int, newCapacity)

	if q.length > 0 {
		if q.head < q.tail {
			for i := 0; i < q.length; i++ {
				newBuffer[i] = q.buffer[q.head+i]
			}
		} else {
			rightLength := len(q.buffer) - q.head
			for i := 0; i < rightLength; i++ {
				newBuffer[i] = q.buffer[q.head+i]
			}
			for i := 0; i < q.tail; i++ {
				newBuffer[rightLength+i] = q.buffer[i]
			}
		}
	}

	q.buffer = newBuffer
	q.head = 0
	q.tail = q.length
	q.mask = newCapacity - 1
}

func (q *FastQueue) Push(item *Int) {
	if q.length == len(q.buffer) {
		q.expand()
	}
	q.buffer[q.tail] = item
	q.tail = (q.tail + 1) & q.mask
	q.length++
}

func (q *FastQueue) UnshiftArray(items []*Int) {
	if len(items) == 0 {
		return
	}
	for q.length+len(items) > len(q.buffer) {
		q.expand()
	}

	q.head = (q.head - len(items)) & q.mask
	for i := 0; i < len(items); i++ {
		q.buffer[(q.head+i)&q.mask] = items[i]
	}
	q.length += len(items)
}

func (q *FastQueue) Shift() *Int {
	if q.length == 0 {
		return nil
	}
	item := q.buffer[q.head]
	q.buffer[q.head] = nil // Avoid leaking reference
	q.head = (q.head + 1) & q.mask
	q.length--
	return item
}

func (q *FastQueue) Pop() *Int {
	if q.length == 0 {
		return nil
	}
	q.tail = (q.tail - 1) & q.mask
	item := q.buffer[q.tail]
	q.buffer[q.tail] = nil // Avoid leaking reference
	q.length--
	return item
}

func (q *FastQueue) Len() int {
	return q.length
}

func (q *FastQueue) Get(index int) *Int {
	if index < 0 || index >= q.length {
		return nil
	}
	return q.buffer[(q.head+index)&q.mask]
}
