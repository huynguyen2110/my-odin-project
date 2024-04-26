// TODO add AI

function boardController(numberOfRow, numberOfColumn) {
    let board = []
    const rows = numberOfRow
    const columns = numberOfColumn;

    function __createBroad() {
        for(let i = 0; i < rows; i++){
            board[i] = []
            for(let j = 0; j < columns; j++){
                board[i][j] = null
            }
        }
    }

    __createBroad()

    const getBoard = () => {
        return board
    }

    const setBoard = () => {
        board = []
        __createBroad()
    }

    const checkPositionEmpty = (row, column) => {
        return board[row][column] === null
    }

    const addStep = (row, column, currentPlayer) => {
        board[row][column] = currentPlayer.symbol
    }

    const checkEndGame = (turn) => {
        for (let i = 0; i < rows; i++){
            for(let j = 0; j < columns; j++){
                if(board[j + 2] && board[i][j] === board[i][j + 2] && board[i][j] === board[i][j + 1] && board[i][j] != null){
                    const winLine = [[i, j], [i, j + 1],[i, j + 2]]
                    return {
                        status: 'win',
                        winLine
                    }
                }
                if(board[i + 2] && board[i][j] === board[i + 2][j] && board[i][j] === board[i + 1][j] && board[i][j] != null) {
                    const winLine = [[i, j], [i + 1, j], [i + 2, j]]
                    return {
                        status: 'win',
                        winLine
                    }
                }
                if(board[i + 2] && board[j + 2] && board[i][j] === board[i + 2][j + 2] && board[i][j] === board[i + 1][j + 1] && board[i][j] != null) {
                    const winLine = [[i, j], [i + 1, j + 1], [i + 2, j + 2]]
                    return {
                        status: 'win',
                        winLine
                    }
                }
                if(board[i + 2] && board[j + 2] && board[i][j + 2] === board[i + 1][j + 1] && board[i][j + 2] === board[i + 2][j] && board[i][j + 2] != null){
                    const winLine = [[i, j + 2], [i + 1, j + 1], [i + 2, j]]
                    return {
                        status: 'win',
                        winLine
                    }
                }
            }
        }
        console.log(turn)
        if(turn == 0){
            return {
                status: 'tie',
            }
        }
        return {status: 'continue'}
    }

    return {getBoard, addStep, checkEndGame, checkPositionEmpty, setBoard}
}

function playerController() {
    const players = [
        {
            player: '1',
            symbol: 'X'
        },
        {
            player: '2',
            symbol: 'O'
        }
    ]

    const getPlayers = () => {
        return players
    }
    const switchPlayer = (currentPlayer) => {
        return currentPlayer === players[0] ? players[1] : players[0]
    }

    const initialCurrentPlayer = () => {
        return players[0]
    }

    return {switchPlayer, getPlayers, initialCurrentPlayer}
}


function gameController(numberOfRow, numberOfColumn) {
    // TODO hard code
    let numberOfTurn = 9
    const board = boardController(numberOfRow, numberOfColumn)
    const player = playerController()
    let currentPlayer = player.initialCurrentPlayer()
    const getCurrentPlayer = () => {
        return currentPlayer
    }
    const setCurrentPlayer = () => {
        currentPlayer = player.initialCurrentPlayer()
    }

    const setNumberOfTurn = () => {
        numberOfTurn = 9
    }

    const playRound = (selectedRow, selectedColumn) => {
        const isPositionEmpty = board.checkPositionEmpty(selectedRow, selectedColumn)
        if( isPositionEmpty) {
            board.addStep(selectedRow, selectedColumn, currentPlayer)
            numberOfTurn -= 1
            const checkEndGame = board.checkEndGame(numberOfTurn)
            if(checkEndGame.status === 'win'){
                return {status: 'win', winLane: checkEndGame.winLine}
            } else if(checkEndGame.status === 'tie') {
                return {status: 'tie'}
            } else {
                currentPlayer = player.switchPlayer(currentPlayer)
                return {status: 'continue'}
            }
        } else {
            return {status: 'emptyPosition'}
        }
    }

    return {playRound, getCurrentPlayer, setBoard : board.setBoard, setCurrentPlayer, setNumberOfTurn}
}


function screenController() {
    const numberOfRow = 3
    const numberOfColumn = 3
    const game = gameController(numberOfRow, numberOfColumn)
    const boardDiv = document.querySelector('.board-game')
    const imageShowTurnDiv = document.querySelector('.image-show-turn')
    const chooseModeDiv = document.querySelector('.choose-mode')
    const startGameDiv = document.querySelector('.start-game')
    const showXwinsDiv = document.querySelector('.number-X-wins')
    const showOwinsDiv = document.querySelector('.number-O-wins')
    const showTiesDiv = document.querySelector('.number-ties')
    const imageShowWinner = document.querySelector('.show-image-win')
    const congratulateDiv = document.querySelector('.congratulate')
    const textShowResultDiv = document.querySelector('.text-show-result')
    const showResultDiv = document.querySelector('.show-result')
    let numberXwins = 0
    let numberOwins = 0
    let numberTies = 0

    const updateScreen = () => {
        boardDiv.addEventListener('click', __handleClickBox)
        boardDiv.setAttribute("data-turn", 'O')
        for(let i = 0; i < numberOfRow ; i++){
            for (let j = 0; j < numberOfColumn ; j++) {
                const box = document.createElement("div")
                box.setAttribute("data-row-id", i);
                box.setAttribute("data-column-id", j);
                box.classList.add('box-board')
                boardDiv.appendChild(box)
            }
        }
    }

    const __addSymbolToBox = (boxDiv, currentPlayer) => {
        if(currentPlayer.symbol === 'X') {
            boxDiv.classList.add('box-X')
            imageShowTurnDiv.src = 'images/icon-o-gray.svg'
        } else {
            boxDiv.classList.add('box-O')
            imageShowTurnDiv.src = 'images/icon-x-gray.svg'
        }
    }

    const __updateNumberWin = (key = 'winGame', currentPlayer) => {
        setTimeout(() => {
            showResultDiv.classList.remove('hide-div')
        }, 500)
        if(key === 'winGame'){
            imageShowWinner.classList.remove('hide-div')
            congratulateDiv.classList.remove('hide-div')
            textShowResultDiv.textContent = 'TAKES THE ROUND'
            if(currentPlayer.symbol === 'X'){
                numberXwins += 1
                showXwinsDiv.textContent = numberXwins
                imageShowWinner.src = 'images/icon-x.svg'
            } else {
                numberOwins += 1
                showOwinsDiv.textContent = numberOwins
                imageShowWinner.src = 'images/icon-o.svg'
            }

        } else {
            imageShowWinner.classList.add('hide-div')
            congratulateDiv.classList.add('hide-div')
            textShowResultDiv.textContent = 'IT\'S A TIE!'
            numberTies += 1
            showTiesDiv.textContent = numberTies
        }
    }

    const showLaneWin = (lane, currentPlayer) => {
        for(let i = 0; i < lane.length; i++){
            const boxDiv = document.querySelector(`[data-row-id='${lane[i][0]}'][data-column-id='${lane[i][1]}']`)
            if(currentPlayer.symbol === 'X') {
                boxDiv.classList.add('lane-X-win')
            } else {
                boxDiv.classList.add('lane-O-win')
            }
        }
    }

    const handeClickButtonStart = () => {
        chooseModeDiv.classList.add('hide-div')
        startGameDiv.classList.remove('hide-div')
    }

    const handleClickButtonReset = () => {
        boardDiv.textContent = ''
        game.setBoard()
        game.setCurrentPlayer()
        const currentPlayer = game.getCurrentPlayer()
        if(currentPlayer.symbol === 'X') {
            imageShowTurnDiv.src = 'images/icon-x-gray.svg'
        } else {
            imageShowTurnDiv.src = 'images/icon-o-gray.svg'
        }
        game.setNumberOfTurn()
        updateScreen()
    }

    const handleClickQuit = () => {
        location.reload()
    }

    const handleCLickNextRound = () => {
        showResultDiv.classList.add('hide-div')
        handleClickButtonReset()
    }

    const __handleClickBox = (event) => {
        const rowId = event.target.dataset.rowId
        const columnId = event.target.dataset.columnId

        if(rowId && columnId) {
            const boxDiv = event.target;
            const currentPlayer = game.getCurrentPlayer()
            const resultRound = game.playRound(rowId, columnId)
            __addSymbolToBox(boxDiv, currentPlayer)
            boardDiv.setAttribute("data-turn", currentPlayer.symbol)

            if (resultRound.status === 'win') {
                boardDiv.removeEventListener('click', __handleClickBox)
                __updateNumberWin('winGame', currentPlayer)
                showLaneWin(resultRound.winLane, currentPlayer)
            } else if(resultRound.status === 'tie'){
                __updateNumberWin('tie', currentPlayer)
            }
        }
    }

    return {updateScreen, handeClickButtonStart, handleClickButtonReset, handleClickQuit, handleCLickNextRound}
}

const screen = screenController()
screen.updateScreen()