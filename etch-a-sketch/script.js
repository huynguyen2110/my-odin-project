const divContainer = document.querySelector('.container');
let mouseDown = false

const buttonColorMode = document.getElementById('color-mode')
const buttonRainBowMode = document.getElementById('rainbow-mode')
const buttonEraserMode = document.getElementById('eraser-mode')
const buttonClearMode = document.getElementById('clear-mode')
const buttonClearBorderMode = document.getElementById('clear-border')
const buttonDarkeningMode = document.getElementById('darkening')
const inputColor = document.getElementById('input-color')
const inputNumber = document.getElementById('input-number')
const showNumber = document.getElementsByClassName('show-number')[0]

window.addEventListener("mousedown", () => mouseDown = true)
window.addEventListener("mouseup", () => mouseDown = false)

let chooseColor = 'black'
let modeColor = 'color-mode'
let numberGird = 16
showNumber.textContent = inputNumber.value

const clearMode = (event) => {
    for (let i = 0; i < divContainer.childNodes.length; i++) {
        if( divContainer.children[i]){
            divContainer.children[i].style.backgroundColor = null
            divContainer.children[i].style.filter = null
        }
    }
}
const clearBorder = (event) => {
    for (let i = 0; i < divContainer.childNodes.length; i++) {
        if( divContainer.children[i]){
            divContainer.children[i].style.border = '0px'

            if(divContainer.children[i].classList[0] === 'element-container') {
                divContainer.children[i].style.padding = '1px'
            }
        }
    }
}

const addBorder = (event) => {
    for (let i = 0; i < divContainer.childNodes.length ; i++) {
        if( divContainer.children[i]){
            if(divContainer.children[i].classList[0] === 'element-container') {
                divContainer.children[i].style.border = '1px solid'
                divContainer.children[i].style.borderColor = 'black'
            }
        }
    }
}



const randomBetween = (min, max) => min + Math.floor(Math.random() * (max - min + 1));

const getRandomColor = () => {
    const r = randomBetween(0, 255);
    const g = randomBetween(0, 255);
    const b = randomBetween(0, 255);
    return `rgb(${r},${g},${b})`; // Collect all to a css color string
}

const changeMouse = (event) => {
    if(mouseDown || event.type === 'mousedown'){
        if(modeColor === 'rainbow-mode'){
            event.target.style.filter = null
            event.target.style.backgroundColor = getRandomColor();
        }
        else if(modeColor === 'eraser-mode'){
            event.target.style.filter = null
            event.target.style.backgroundColor = null;
        }
        else if(modeColor === 'color-mode') {
            event.target.style.filter = null
            event.target.style.backgroundColor = chooseColor;
        }
        else if(modeColor === 'darkening') {
            let valueFilter = event.target.style.filter ? Number(event.target.style.filter.substring(
                event.target.style.filter.indexOf("(") + 1,
                event.target.style.filter.lastIndexOf("%)")
            )) - 10 : 90
            event.target.style.filter = `brightness(${valueFilter >= 0 ? valueFilter : 0}%)`;
        }
    }
}

const start = () => {
    for (let i = 0; i < numberGird * numberGird; i++) {
        const div = document.createElement('div');
        div.classList.add(`element-container`)
        if(i  % numberGird === 0){
            const divBr = document.createElement('div');
            divBr.classList.add('div-br')
            divContainer.appendChild(divBr);
        }
        div.addEventListener('mouseover', changeMouse)
        div.addEventListener('mousedown', changeMouse)
        divContainer.appendChild(div);
    }
}

start()

const changeNumberGird = () => {
    numberGird = inputNumber.value
    showNumber.textContent = inputNumber.value
    divContainer.replaceChildren()
    start()
}

const clearActiveButton = (event) => {
    buttonColorMode.classList.remove('active')
    buttonRainBowMode.classList.remove('active')
    buttonEraserMode.classList.remove('active')
    buttonClearMode.classList.remove('active')
    buttonClearBorderMode.classList.remove('active')
    buttonDarkeningMode.classList.remove('active')
    document.getElementById(event.target.id).classList.add('active')
}

const changeColor = (mode='color-mode') => {
    chooseColor = inputColor.value
}

const changeMode = (event) => {
    clearActiveButton(event)
    modeColor = event.target.id
}