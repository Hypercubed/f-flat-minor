export class FastQueue {
  private buffer: bigint[];
  private head: number;
  private tail: number;
  private _length: number;
  private _mask: number;

  constructor(initialCapacity = 16) {
    this.buffer = new Array(initialCapacity);
    this.head = 0;
    this.tail = 0;
    this._length = 0;
    this._mask = initialCapacity - 1;
  }

  get length(): number {
    return this._length;
  }

  private expand() {
    const newCapacity = this.buffer.length * 2;
    const newBuffer = new Array(newCapacity);
    
    if (this._length > 0) {
      if (this.head < this.tail) {
        for (let i = 0; i < this._length; i++) {
          newBuffer[i] = this.buffer[this.head + i];
        }
      } else {
        const rightLength = this.buffer.length - this.head;
        for (let i = 0; i < rightLength; i++) {
          newBuffer[i] = this.buffer[this.head + i];
        }
        for (let i = 0; i < this.tail; i++) {
          newBuffer[rightLength + i] = this.buffer[i];
        }
      }
    }

    this.buffer = newBuffer;
    this.head = 0;
    this.tail = this._length;
    this._mask = newCapacity - 1;
  }

  push(...items: bigint[]): void {
    this.pushArray(items);
  }

  pushArray(items: bigint[]): void {
    for (let i = 0; i < items.length; i++) {
      if (this._length === this.buffer.length) {
        this.expand();
      }
      this.buffer[this.tail] = items[i];
      this.tail = (this.tail + 1) & this._mask;
      this._length++;
    }
  }

  unshift(...items: bigint[]): void {
    this.unshiftArray(items);
  }

  unshiftArray(items: bigint[]): void {
    while (this._length + items.length > this.buffer.length) {
      this.expand();
    }
    
    this.head = (this.head - items.length) & this._mask;
    for (let i = 0; i < items.length; i++) {
      this.buffer[(this.head + i) & this._mask] = items[i];
    }
    this._length += items.length;
  }

  shift(): bigint | undefined {
    if (this._length === 0) return undefined;
    const item = this.buffer[this.head];
    this.head = (this.head + 1) & this._mask;
    this._length--;
    return item;
  }

  pop(): bigint | undefined {
    if (this._length === 0) return undefined;
    this.tail = (this.tail - 1) & this._mask;
    const item = this.buffer[this.tail];
    this._length--;
    return item;
  }

  get(index: number): bigint | undefined {
    if (index < 0 || index >= this._length) return undefined;
    return this.buffer[(this.head + index) & this._mask];
  }
}
