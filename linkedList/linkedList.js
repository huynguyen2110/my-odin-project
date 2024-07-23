import {Node} from "./node.js";
export class LinkedList {
    constructor() {
        this.headNode = null
    }

    prepend(value){
        let tmp = null
        if (this.headNode != null) tmp = this.headNode;
        this.headNode = new Node(value);
        this.headNode.nextNode = tmp;
    }
    append(value){
        if(this.headNode === null) {
            this.prepend(value)
        } else {
            let tmp = this.headNode
            while (tmp.nextNode != null) {
                tmp = tmp.nextNode
            }
            tmp.nextNode = new Node(value)
        }
    }
    size() {
        let count = 1
        let tmp = this.headNode
        while (tmp.nextNode != null) {
            tmp = tmp.nextNode
            count += 1
        }
        return count
    }
    head() {
        return this.headNode.value
    }
    tail() {
        let tmp = this.headNode
        while (tmp.nextNode != null) {
            tmp = tmp.nextNode
        }
        return tmp
    }
    at(index) {
        if(index > this.size() - 1) {
            return 'index not valid'
        }
        let tmp = this.headNode
        for (let i = index; i > 0; i--) {
            tmp = tmp.nextNode
        }
        return tmp.value
    }
    pop() {
        let tmp = this.headNode
        let pre = null
        while (tmp.nextNode != null) {
            pre = tmp
            tmp = tmp.nextNode
        }
        pre.nextNode = null
    }
    contain(value) {
        let tmp = this.headNode
        while (tmp != null) {
            if(tmp.value === value){
                return true
            }
            tmp = tmp.nextNode
        }
        return false
    }
    find(value) {
        let tmp = this.headNode
        let index = 0
        while (tmp != null) {
            if(tmp.value === value){
                return index
            }
            index += 1
            tmp = tmp.nextNode
        }

        return 'value not found'
    }
    toString() {
        let tmp = this.headNode
        let string = ''
        while (tmp != null) {
            string += '(' + tmp.value + ') -> '
            tmp = tmp.nextNode
        }
        string += 'null'
        return string
    }

    insertAt(value, index) {
        let cur = this.headNode
        let pre = null
        while (cur !== null && index > 0) {
            pre = cur
            cur = cur.nextNode
            index--
        }
        if(pre !== null){
            pre.nextNode = null
            this.append(value)
            this.tail().nextNode = cur
        }else {
            this.prepend(value)
        }
    }
    removeAt(index) {
        let cur = this.headNode
        let pre = null
        while (cur !== null && index > 0) {
            pre = cur
            cur = cur.nextNode
            index--
        }
        if(pre !== null){
            pre.nextNode = null
            this.tail().nextNode = cur.nextNode
        }else {
            this.headNode = this.headNode.nextNode
        }
    }

}