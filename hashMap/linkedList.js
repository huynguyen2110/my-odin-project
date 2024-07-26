import { Node } from "./node.js";

export class LinkedList {
  constructor() {
    this.headNode = null;
  }

  prepend(key, value) {
    let tmp = null;
    if (this.headNode != null) tmp = this.headNode;
    this.headNode = new Node(key, value, tmp);
  }

  append(key, value) {
    if (this.headNode === null) {
      this.prepend(key, value);
    } else {
      let tmp = this.headNode;
      while (tmp.nextNode != null) {
        tmp = tmp.nextNode;
      }
      tmp.nextNode = new Node(key, value);
    }
  }

  size() {
    let count = 1;
    let tmp = this.headNode;
    while (tmp.nextNode != null) {
      tmp = tmp.nextNode;
      count += 1;
    }
    return count;
  }

  head() {
    return this.headNode.value;
  }

  tail() {
    let tmp = this.headNode;
    while (tmp.nextNode != null) {
      tmp = tmp.nextNode;
    }
    return tmp;
  }

  at(index) {
    if (index > this.size() - 1) {
      return "index not valid";
    }
    let tmp = this.headNode;
    for (let i = index; i > 0; i--) {
      tmp = tmp.nextNode;
    }
    return tmp.value;
  }

  pop() {
    let tmp = this.headNode;
    let pre = null;
    while (tmp.nextNode != null) {
      pre = tmp;
      tmp = tmp.nextNode;
    }
    pre.nextNode = null;
  }

  contain(key) {
    let tmp = this.headNode;
    while (tmp != null) {
      if (tmp.key === key) {
        return true;
      }
      tmp = tmp.nextNode;
    }
    return false;
  }

  find(key, valueGet = 'value') {
    let tmp = this.headNode;
    let index = 0;
    while (tmp != null) {
      if (tmp.key === key) {
        if(valueGet === 'value') {
          return tmp.value;
        } else {
          return tmp.key
        }
      }
      index += 1;
      tmp = tmp.nextNode;
    }

    return null;
  }

  toString() {
    let tmp = this.headNode;
    let string = "";
    while (tmp != null) {
      string += "(" + tmp.value + ") -> ";
      tmp = tmp.nextNode;
    }
    string += "null";
    return string;
  }

  insertAt(key, value, index) {
    if (index > this.size()) {
      return;
    }
    let cur = this.headNode;
    let pre = null;
    while (cur !== null && index > 0) {
      pre = cur;
      cur = cur.nextNode;
      index--;
    }
    if (pre !== null) {
      pre.nextNode = null;
      this.append(key, value);
      this.tail().nextNode = cur;
    } else {
      this.prepend(key, value);
    }
  }
  replaceValue(key, value) {
    let tmp = this.headNode;
    let index = 0;
    while (tmp != null) {
      if (tmp.key === key) {
        tmp.value = value
        return true
      }
      index += 1;
      tmp = tmp.nextNode;
    }

    return false;
  }

  removeKey(key) {
    let cur = this.headNode;
    let pre = null;
    while (cur !== null) {
      if(cur.key === key) {
        if(pre !== null){
          pre.nextNode = cur.nextNode
        } else {
          this.headNode = this.headNode.nextNode;
        }
        return true
      }
      pre = cur;
      cur = cur.nextNode;
    }
    return false
  }

  getKeys() {
    let tmp = this.headNode;
    const keys = [];
    while (tmp != null) {
      keys.push(tmp.key)
      tmp = tmp.nextNode;
    }
    return keys;
  }
  getValues() {
    let tmp = this.headNode;
    const values = [];
    while (tmp != null) {
      values.push(tmp.value)
      tmp = tmp.nextNode;
    }
    return values;
  }
  getEntries() {
    let tmp = this.headNode;
    const entries = [];
    while (tmp != null) {
      const entry = []
      entry.push(tmp.key, tmp.value)
      entries.push(entry)
      tmp = tmp.nextNode;
    }
    return entries;
  }
}
