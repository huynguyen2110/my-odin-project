// iterate fibonacci
function iterateFibonacci(n) {
    let a = 0
    let b = 1
    for(let i = 0; i < n; i++) {
        let tmp = a
        a = b
        b = tmp + b
    }
    return b
}

function recursionFibonacci(n) {
    if(n === 1){
        return 0
    }
    if(n === 2){
        return 1
    }
    return recursionFibonacci(n - 1) + recursionFibonacci(n - 2)
}

function callTailRecursionFibonacci(n, first = 0, second = 1) {
    if(n === 2){
        return second
    }
    return callTailRecursionFibonacci(n - 1, second, first + second)
}
