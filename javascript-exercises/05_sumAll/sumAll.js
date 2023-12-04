const sumAll = function(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number' || a < 0 || b < 0) {
        return 'ERROR';
    }
    let sumAll = 0
    let firstArray
    let lastArray
    if(a >= b){
        firstArray = b
        lastArray = a
    }else{
        firstArray = a
        lastArray = b
    }

    for(let i = firstArray; i <= lastArray; i++) {
        sumAll += i
    }
    return sumAll

};

// Do not edit below this line
module.exports = sumAll;
