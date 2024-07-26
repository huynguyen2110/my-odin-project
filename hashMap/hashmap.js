import { LinkedList } from "./linkedList.js";

export class Hashmap {
  constructor() {
    this.capacity = 16;
    this.loadFactor = 0.75;
    this.bucket =  Array.from({ length: this.capacity }, () => new LinkedList());
  }

  #hash(key) {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }
    return hashCode % this.capacity;
  }

  set(key, value) {
    if(!key || !value) {
      return false
    }
    const hashIndex = this.#hash(key);
    let linkedList = this.bucket[hashIndex];
    if (linkedList.headNode == null || !linkedList.replaceValue(key, value)) {
      if(this.isResize()) {
        this.resize()
      }
      linkedList.prepend(key, value);
    }
    this.bucket[hashIndex] = linkedList;
  }

  get(key) {
    if(!key) {
      return false
    }
    const hashIndex = this.#hash(key);
    let linkedList = this.bucket[hashIndex];
    if (linkedList.headNode == null) {
      return null;
    } else {
      return linkedList.find(key);
    }
  }

  has(key) {
    if(!key) {
      return false
    }
    const hashIndex = this.#hash(key);
    let linkedList = this.bucket[hashIndex];
    if (linkedList.headNode == null) {
      return false;
    } else {
      return linkedList.contain(key);
    }
  }

  remove(key) {
    if(!key) {
      return false
    }
    const hashIndex = this.#hash(key);
    let linkedList = this.bucket[hashIndex];
    if (linkedList.headNode == null) {
      return false;
    } else {
      return linkedList.removeKey(key);
    }
  }

  length() {
    let count = 0;
    for (let i = 0; i < this.bucket.length; i++) {
      if (this.bucket[i].headNode != null) {
        count += this.bucket[i].size();
      }
    }
    return count;
  }

  clear() {
    this.bucket = Array.from({ length: this.capacity }, () => new LinkedList());
  }

  keys() {
    let keys = [];
    for (let i = 0; i < this.bucket.length; i++) {
      if (this.bucket[i].headNode != null) {
        keys = keys.concat(this.bucket[i].getKeys());
      }
    }
    return keys;
  }

  values() {
    let values = [];
    for (let i = 0; i < this.bucket.length; i++) {
      if (this.bucket[i].headNode != null) {
        values = values.concat(this.bucket[i].getValues());
      }
    }
    return values;
  }

  entries() {
    let entries = [];
    for (let i = 0; i < this.bucket.length; i++) {
      if (this.bucket[i].headNode != null) {
        entries = entries.concat(this.bucket[i].getEntries());
      }
    }
    return entries;
  }

  resize() {
    this.capacity *= 2;
    const allEntries = this.entries();
    this.bucket = Array.from({ length: this.capacity }, () => new LinkedList());
    for (let i = 0; i < allEntries.length; i++) {
      const hashIndex = this.#hash(allEntries[i][0]);
      let linkedList = this.bucket[hashIndex];
      linkedList.prepend(allEntries[i][0], allEntries[i][1]);
    }
  }

  isResize() {
    const currentCapacity = this.length() + 1;
    const maxCapacity = this.capacity * this.loadFactor;
    return currentCapacity > maxCapacity;
  }
}
