const arrayChoice = ['rock', 'paper', 'scissors']
let scoreComputer = 0
let scoreUser = 0

const covertToSign = (text) => {
    if (text === 'rock') {
        return '✊'
    } else if (text === 'paper') {
        return '✋'
    } else {
        return '✌'
    }
}

const getComputerChoice = () => {
    const computerChoice = arrayChoice[Math.floor(Math.random() * 3)]
    document.getElementsByClassName('sign-computer')[0].textContent = covertToSign(computerChoice)
    return computerChoice
}

const getUserChoice = (event) => {
    document.getElementsByClassName('sign-player')[0].textContent = covertToSign(event.target.id)
    return event.target.id
}

const checkResult = (userSelect, computerSelect) => {
    let textResult = ''
    let textInfo = ''

    switch (userSelect) {
        case "rock":
            if (computerSelect === 'rock') {
                textResult= 'It\'s a tie!'
                textInfo = 'Rock ties with rock'
            } else if (computerSelect === 'scissors') {
                scoreUser += 1
                textResult= 'You won!'
                textInfo = 'Rock beats scissors'
            } else {
                scoreComputer += 1
                textResult= 'You lost!'
                textInfo = 'Rock is beaten by paper'
            }
            break
        case "paper":
            if (computerSelect === 'paper') {
                textResult= 'It\'s a tie!'
                textInfo = 'Paper ties with paper'
            } else if (computerSelect === 'rock') {
                scoreUser += 1
                textResult= 'You won!'
                textInfo = 'Paper beats rock'
            } else {
                scoreComputer += 1
                textResult= 'You lost!'
                textInfo = 'Paper is beaten by scissors'
            }
            break
        case "scissors":
            if (computerSelect === 'scissors') {
                textResult= 'It\'s a tie!'
                textInfo = 'Scissors ties with scissors'
            } else if (computerSelect === 'paper') {
                scoreUser += 1
                textResult= 'You won!'
                textInfo = 'Scissors beats paper'
            } else {
                scoreComputer += 1
                textResult= 'You lost!'
                textInfo = 'Scissors is beaten by rock'
            }
            break
    }

    return {textResult, textInfo}
}

const play = (event) => {
    const userSelect = getUserChoice(event)
    const computerSelect = getComputerChoice()
    const result = checkResult(userSelect, computerSelect)
    document.getElementsByClassName('text-h2')[0].textContent = result.textResult
    document.getElementsByClassName('info')[0].textContent = result.textInfo
    document.getElementsByClassName('span-score-user')[0].textContent = scoreUser
    document.getElementsByClassName('span-score-computer')[0].textContent = scoreComputer

    if(scoreComputer === 5){
        document.getElementsByClassName('modal')[0].classList.add('active')
        document.getElementsByClassName('overlay')[0].classList.add('active')
        document.getElementsByClassName('modal-title')[0].textContent = 'YOU LOSE!'
    }
    if(scoreUser === 5){
        document.getElementsByClassName('modal')[0].classList.add('active')
        document.getElementsByClassName('overlay')[0].classList.add('active')
        document.getElementsByClassName('modal-title')[0].textContent = 'YOU WIN!'
    }
}


const resetButton = () => {
    scoreComputer = 0
    scoreUser = 0
    document.getElementsByClassName('modal')[0].classList.remove('active')
    document.getElementsByClassName('overlay')[0].classList.remove('active')
    document.getElementsByClassName('text-h2')[0].textContent = 'Choose your weapon'
    document.getElementsByClassName('info')[0].textContent = 'First to score 5 points wins the game'
    document.getElementsByClassName('sign-player')[0].textContent = '❔'
    document.getElementsByClassName('sign-computer')[0].textContent = '❔'
    document.getElementsByClassName('span-score-user')[0].textContent = '0'
    document.getElementsByClassName('span-score-computer')[0].textContent = '0'

}

