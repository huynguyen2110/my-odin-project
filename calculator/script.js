const add = (a, b) => {
    return parseFloat((a + b).toFixed(2))
};

const subtract = (a, b) => {
    return parseFloat((a - b).toFixed(2))
};

const multiply = (a, b) => {
    return parseFloat((a * b).toFixed(2))
};

const divide = (a, b) => {
    if(b == 0){
        preventWrite = true
        return 'ERROR'
    }
    return parseFloat((a / b).toFixed(2))
}

let firstNumber = 0
let secondNumber = null
let operator = null
let switchNumber = 0
let finalResult
const divOperator = document.getElementsByClassName('div-operator')[0]
const divResult = document.getElementsByClassName('div-result')[0]
let preventWrite = false


window.addEventListener('keydown', handleKeyboardInput)


const operate = () => {
    if(firstNumber && secondNumber && operator && !preventWrite){
        switch (operator) {
            case "+":
                finalResult = add(Number(firstNumber), Number(secondNumber))
                break
            case "-":
                finalResult = subtract(Number(firstNumber), Number(secondNumber))
                break
            case "×":
                finalResult = multiply(Number(firstNumber), Number(secondNumber))
                break
            case "/":
                finalResult = divide(Number(firstNumber), Number(secondNumber))
                break
        }
        divOperator.textContent = firstNumber + ' ' + operator + ' ' + secondNumber + ' = '
        divResult.textContent = finalResult
        firstNumber = finalResult
        secondNumber = null
        finalResult = null
        switchNumber = 0
        operator = null
    }
}

const addNumber = (value) => {
    if(!preventWrite){
        if(switchNumber === 0){
            if(firstNumber == 0){
                firstNumber = value
            }else {
                firstNumber = firstNumber + value
            }
            divResult.textContent = firstNumber
        }
        if(switchNumber === 1) {
            if(secondNumber == 0 || secondNumber == null){
                secondNumber = value
            }else {
                secondNumber = secondNumber  + value
            }
            divOperator.textContent = firstNumber + ' ' + operator + ' ' + secondNumber
            divResult.textContent = secondNumber
        }
    }
}

const addOperate = (value) => {
    if(!preventWrite && firstNumber) {
        if (operator) {
            operate()
            operator = value
            switchNumber = 1
        } else {
            operator = value
            switchNumber = 1
        }
        divOperator.textContent = firstNumber + ' ' + operator
    }
}

const modeClear = () => {
    firstNumber = 0
    secondNumber = null
    operator = null
    switchNumber = 0
    divResult.textContent = firstNumber
    divOperator.textContent = ''
    preventWrite = false
}

const modeDelete = () => {
    if(!preventWrite) {
        if (switchNumber == 0) {
            firstNumber = String(firstNumber).slice(0, -1);
            divResult.textContent = firstNumber
        }
        if (switchNumber == 1) {
            secondNumber = String(secondNumber).slice(0, -1);
            divResult.textContent = secondNumber
        }
    }
}

const addDot = () => {
    if(!preventWrite) {
        if (switchNumber == 0 && !firstNumber.includes('.')) {
            firstNumber = String(firstNumber) + '.'
            divResult.textContent = firstNumber
        }
        if (switchNumber == 1 && !secondNumber.includes('.')) {
            secondNumber = String(secondNumber) + '.';
            divResult.textContent = secondNumber
        }
    }
}

function handleKeyboardInput(e) {
    if(e.key >= 0 && e.key <= 9){
        addNumber(e.key)
    }
    if(e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/'){
        addOperate(e.key)
    }
    if(e.key === '='){
        operate()
    }
    if(e.key === '.'){
        addDot()
    }
}

