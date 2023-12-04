const removeFromArray = function(array, ...args) {
    const arrayResult = []
    for (let item of array){
        if (!args.includes(item)) {
            arrayResult.push(item);
        }
    }
    return arrayResult
};

// Do not edit below this line
module.exports = removeFromArray;
