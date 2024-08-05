import { Node } from "./node.js";
function buildTree(array) {
    array.sort((a, b) => a - b)
    const sortArray = [ ...new Set(array) ]
    return createTree(sortArray)
}

function createTree(array) {

    if (array.length === 0) {
        return null;
    }
    const mid = Math.floor(array.length / 2);
    const rootNode = new Node(array[mid]);
    rootNode.left = createTree(array.slice(0, mid));
    rootNode.right = createTree(array.slice(mid + 1));

    return rootNode;
}

export function randomIntArrayInRange(min, max, n = 1) {
    return Array.from(
        {length: n},
        () => Math.floor(Math.random() * (max - min + 1)) + min
    );
}
export class Tree {
    constructor(array) {
        this.root = buildTree(array)
    }
    prettyPrint(node, prefix = "", isLeft = true) {
        if (node === null) {
            return;
        }
        if (node.right !== null) {
            this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
        if (node.left !== null) {
           this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
    };
    insert(value, root = this.root) {
        if(root.data > value){
            if(root.left == null){
                root.left = new Node(value)
            } else {
                return this.insert(value, root.left)
            }
        }
        if(root.data < value){
            if(root.right == null){
                root.right = new Node(value)
            } else {
                return this.insert(value, root.right)
            }
        }
    }

    delete(value, root = this.root) {
        if(root.data === value) {
            if(root.left == null){
                return root.right
            } else if(root.right == null){
                return root.left
            }
            const valueReplace = this.replaceDeleteNote(value, root)
            root.data = valueReplace.data
            root.right = this.delete(valueReplace.data, root.right)
        }
        if(root.data > value && root.left != null){
            root.left = this.delete(value, root.left)
        }
        if(root.data < value && root.right != null){
            root.right =  this.delete(value, root.right)
        }
        return root
    }
    replaceDeleteNote(value, root) {
        let tmp = root.right
        while (tmp != null && tmp.left != null){
            tmp = tmp.left
        }
        return tmp
    }

    find(value, root = this.root) {
        if(root.data === value) {
            return root
        }
        if(root.data > value && root.left != null){
            return this.find(value, root.left)
        }
        if(root.data < value && root.right != null){
            return this.find(value, root.right)
        }
    }
    levelOrderIteration(callback) {
        if(typeof callback !== "function") {
            throw Error('parameter not a callback')
        }
        let rootCopy = this.root
        const array = []
        array.push(this.root)
        while (array.length > 0)
        {
            const first = array[0]
            callback(first.data)
            array.shift()
            if(rootCopy.left != null) {
                array.push(rootCopy.left)
            }
            if(rootCopy.right != null) {
                array.push(rootCopy.right)
            }
            rootCopy = array[0]
        }
    }
    levelOrderRecursion(callback) {
        if(typeof callback !== "function") {
            throw Error('parameter not a callback')
        }
        return this.#internalLevel(callback, [this.root], this.root)
    }

    #internalLevel(callback, array) {
        if(array.length === 0) {
            return;
        }
        if(array[0].left != null) {
            array.push(array[0].left)
        }
        if(array[0].right != null) {
            array.push(array[0].right)
        }
        callback(array[0].data)
        array.shift()
        return this.#internalLevel(callback, array)
    }

    inOrder(callback, root) {
        if(typeof callback !== "function") {
            throw Error('parameter not a callback')
        }
        this.#internalInOrder(callback, root)
    }
    #internalInOrder(callback, root = this.root) {
        if(root == null) {
            return;
        }
        callback(root.data)

        this.#internalInOrder(callback, root.left)
        this.#internalInOrder(callback,root.right)
    }
    preOrder(callback, root) {
        if(typeof callback !== "function") {
            throw Error('parameter not a callback')
        }
        this.#internalPreOrder(callback, root)
    }
    #internalPreOrder(callback, root = this.root) {
        if(root == null) {
            return;
        }
        this.#internalPreOrder(callback, root.left)
        callback(root.data)
        this.#internalPreOrder(callback,root.right)
    }
    postOrder(callback, root) {
        if(typeof callback !== "function") {
            throw Error('parameter not a callback')
        }
        this.#internalPostOrder(callback, root)
    }
    #internalPostOrder(callback, root = this.root) {
        if(root == null) {
            return;
        }
        this.#internalPostOrder(callback, root.left)
        this.#internalPostOrder(callback,root.right)
        callback(root.data)
    }

    height(node) {
        const root =this.find(node)
        return this.#internalHeight(root)
    }
    #internalHeight(node) {
        if(node == null) {
            return 0
        }
        const left = this.#internalHeight(node.left)
        const right = this.#internalHeight(node.right)
        return Math.max(left, right) + 1
    }

    depth(node) {
        return this.#internalDepth(node, [this.root], this.root)
    }

    #internalDepth(node, array) {
        if(array.length === 0) {
            return 0;
        }
        const newArray = []
        for (let i = 0; i < array.length; i++) {
            if(array[i].data === node) {
                return 0;
            } else {
                if(array[i].left != null) {
                    newArray.push(array[i].left)
                }
                if(array[i].right != null) {
                    newArray.push(array[i].right)
                }
            }
        }
        return this.#internalDepth(node, newArray) + 1
    }
    isBalanced() {
        return !!this.#internalIsBalanced(this.root)
    }

    #internalIsBalanced(node) {
        if(node == null) {
            return 0
        }
        const left = this.#internalIsBalanced(node.left)
        const right = this.#internalIsBalanced(node.right)
        if(left - right > 1 || right - left > 1 || left === false || right === false) {
            return false
        } else {
            return Math.max(left, right) + 1
        }
    }

    reBalance() {
        if(!this.isBalanced()){
            const array = []
            this.levelOrderRecursion(node => array.push(node))
            this.root = buildTree(array)
        }
    }
}