export function capitalize(string) {
    if(typeof string !== "string") {
        return string
    }
    return string.charAt(0).toUpperCase() + string.slice(1)
}

export function reverseString(string) {
    if(typeof string !== "string") {
        return false
    }
    const length = string.length
    for (let i = length - 1; i >= 0; i--) {
        string = string + string[i]
    }
    return string.slice(length)
}

export const calculator = {
    add(a, b){
        return a + b
    },
    subtract(a, b){
        return a - b
    },
    divide(a, b){
        return a / b
    },
    multiply(a, b){
        return a * b
    },
}

const alphabet  = 'abcdefghijklmnopqrstuvwxyz'
export function caesarCipher(string, step) {
    if(typeof string !== "string") {
        return string
    }
    let newString = ''
    for (let i = 0; i < string.length; i++) {
        if(isUpperCase(string[i])){
            newString += findCipherChar(string[i].toLowerCase(), step).toUpperCase()
        } else {
            newString += findCipherChar(string[i], step)
        }
    }
    return newString
}

function isUpperCase(char){
    return char !== char.toLowerCase();
}

function findCipherChar(char, step){
    const index = alphabet.indexOf(char)
    if(index === -1) {
        return char
    }
    let newIndexChar = (index + step) % alphabet.length
    return alphabet[newIndexChar]
}

export function analyzeArray(array){
    let average = null
    let min = null
    let max = null
    let length = array.length
    let total = 0

    for (let i = 0; i < array.length; i++) {
        if(max == null || max < array[i]) {
            max = array[i]
        }
        if(min == null || min > array[i]) {
            min = array[i]
        }
        total += array[i]
    }
    if(length === 0){
        average = 0
    } else {
        average = Math.round(total / length)
    }
    return {
        average, min, max, length
    }
}