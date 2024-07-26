export class Node {
    constructor(key, value = null, nextNode = null) {
        this.key = key
        this.value = value
        this.nextNode = nextNode
    }
}