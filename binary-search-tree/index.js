import {Tree, randomIntArrayInRange} from "./tree.js";

const tree = new Tree(randomIntArrayInRange(0 ,100 , 10))

tree.insert(100);
tree.insert(200);
tree.insert(300);
tree.insert(40000);
tree.insert(5);
tree.insert(10);

// console.log(tree.find(100))
// tree.levelOrderRecursion((x) => {
//     console.log(x)
// })
// console.log(tree.depth(10))
// console.log(tree.isBalanced())
tree.reBalance()

tree.prettyPrint(tree.root);
