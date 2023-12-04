const repeatString = function(string, timesRepeat) {
    const initalString = string
    if(timesRepeat === 0){
        return ''
    }else if(timesRepeat < 0){
        return 'ERROR'
    }
    for(let i = 1; i < timesRepeat; i++ ){
        string += initalString
    }
    return string
};

// Do not edit below this line
module.exports = repeatString;
