export class Node {
    constructor(value, ancestor = null) {
        this.value = value;
        this.ancestor = ancestor;
    }
}