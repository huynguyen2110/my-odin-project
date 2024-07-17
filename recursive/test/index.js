// Question 1: Sum all numbers
function sumRange(n){
    if(n === 1) return 1
    return n + sumRange(n - 1)
}

// Question 2: Power function
function power(n, i){
    if(i === 0) return 1
    return n * power(n,i - 1)
}

// Question 3: Calculate factorial
function factorial(n){
    if(n === 1) return 1
    return n * factorial(n -1)
}

// Question 4: Check all values in an array
function all(array, cb){
    if(array.length === 0){
        return true
    }
    if(cb(array[0])){
        return all(array.slice(1), cb)
    } else {
        return false
    }
}

// Question 5: Product of an array
function productOfArray(array) {
    if(array.length === 0){
        return 1
    }
    return array[0] * productOfArray(array.slice(1))
}

// Question 6: Search JS object
function contains(nestedObject, value) {
    if(typeof nestedObject !== 'object') {
        return nestedObject === value
    }

    for(const obj of Object.values(nestedObject)) {
        if(contains(obj, value)) {
            return true
        }
    }
    return false
}

// Question 7: Parse a multi-dimensional array
function totalIntegers(array){
    if(array.length === 0) return 0;
    let total = 0;
    let first = array.shift();
    if (Array.isArray(first)){
        total += totalIntegers(first);
    } else if (Number.isInteger(first)) {
        total += 1;
    }
    return total + totalIntegers(array);
}

//Question 8:Write a function that sums squares of numbers in list that may contain more lists
function sumSquares(array){
    if(array.length === 0){
        return 0
    }
    let total = 0
    const first = array.shift()
    if(Array.isArray(first)){
        total += sumSquares(first)
    } else if(Number.isInteger(first)) {
        total += first * first
    }

    return total + sumSquares(array)
}

//Question 9:The function should return an array containing repetitions of the number argument. For instance, replicate(3, 5) should return [5,5,5]. If the times argument is negative, return an empty array.

function replicate(multi, n) {
    if(multi <= 0){
        return []
    }
    return [n].concat(replicate(multi - 1, n))
}

console.log(replicate(3, 5)) // [5, 5, 5]
console.log(replicate(0, 69)) // [69]
console.log(replicate(-2, 6)) // []