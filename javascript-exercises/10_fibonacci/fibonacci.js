const fibonacci = function(a) {
    if (a < 0){
        return "OOPS"
    }
    else {
        let firstValue = 0
        let secondValue = 1

        let finalValue
        for(let i = 0; i < a; i++){
            finalValue = firstValue + secondValue
            firstValue = secondValue
            secondValue = finalValue
        }
        return firstValue
    }
};

// Do not edit below this line
module.exports = fibonacci;
