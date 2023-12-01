const arrayChoice = ['rock', 'paper', 'scissors']
let scoreComputer = 0
let scoreUser = 0

const getComputerChoice = () => {
    return arrayChoice[Math.floor(Math.random() * 3)]
}

const getUserChoice = () => {
    return prompt('your choice ?').toLocaleLowerCase()
}

while (scoreComputer < 5 && scoreUser < 5){
    const userSelect = getUserChoice()
    const computerSelect = getComputerChoice()
    switch (userSelect) {
        case "rock":
            if(computerSelect === 'rock'){
                 alert('draw')
            }else if(computerSelect === 'scissors'){
                scoreUser +=1
                alert('you win! Rock beats scissors')
            }else {
                scoreComputer +=1
                alert('computer win! Rocks loses paper')
            }
            break
        case "paper":
            if(computerSelect === 'paper'){
                 alert('draw')
            }else if(computerSelect === 'rock'){
                scoreUser +=1
                alert('you win! Paper beat rock')
            }else {
                scoreComputer +=1
                alert('computer win! Paper loses scissors')
            }
            break
        case "scissors":
            if(computerSelect === 'scissors'){
                 alert('draw')
            }else if(computerSelect === 'paper'){
                scoreUser +=1
                alert('you win! Scissors beats paper')
            }else {
                scoreComputer +=1
                alert('computer win! Scissors loses rock')
            }
            break
        default:
            alert('choice in "rock, paper, scissors"')
    }
}

if(scoreComputer === 5){
    alert('computer got 5, computer finally win')
}
if(scoreUser === 5){
    alert('user got 5, user finally win')
}