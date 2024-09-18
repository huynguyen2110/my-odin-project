function initialGrid(attack, mode) {
    const gridPlayerWrap = document.querySelector('.wrap-p1-grid')
    const yourGrid = document.querySelector(".p1-grid")
    yourGrid.innerHTML = ''
    for (let i = 0; i < 100; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.setAttribute('data-axis', `${parseInt(i / 10)}_${i % 10}`);
        yourGrid.appendChild(cell);

        if (mode !== 'computer') {
            cell.addEventListener('click', (event) => {
                const xAxis = parseInt(event.target.getAttribute('data-axis')[0])
                const yAxis = parseInt(event.target.getAttribute('data-axis')[2])
                attack(xAxis, yAxis)
            })
        }
    }

    const enemyPlayerWrap = document.querySelector('.wrap-p2-grid')
    const enemyGrid = document.querySelector(".p2-grid")
    enemyGrid.innerHTML = ''
    for (let i = 0; i < 100; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.setAttribute('data-axis', `${parseInt(i / 10)}_${i % 10}`);
        enemyGrid.appendChild(cell);
        cell.addEventListener('click', (event) => {
            const xAxis = parseInt(event.target.getAttribute('data-axis')[0])
            const yAxis = parseInt(event.target.getAttribute('data-axis')[2])
            attack(xAxis, yAxis)
        })
    }
    // disableAllPlayer()
}

function generateDragDropShops(factoryShips, playerName, reverseShipDirection) {
    let gridPlayerContainer = getGridPlayerContainer(playerName)
    const container = gridPlayerContainer.querySelector('.drag-drop');
    container.classList.remove('hide-div')
    container.innerHTML = ''

    factoryShips.forEach((shipObj) => {
        const length = Object.keys(shipObj)[0];
        const numberOfShips = shipObj[length];

        const shipGroupDiv = document.createElement('div');
        shipGroupDiv.classList.add(`ship-length-${length}`);
        shipGroupDiv.classList.add(`flex-ship`);

        for (let i = 0; i < numberOfShips; i++) {
            const shipDiv = document.createElement('div');
            shipDiv.id = `drag-${length}-${i + 1}`;
            shipDiv.setAttribute('data-length', length);
            shipDiv.setAttribute('draggable', 'true');
            shipDiv.setAttribute('ondragstart', 'play.drag(event)');
            shipDiv.classList.add('flex-ship-coordinates');
            shipDiv.classList.add('position-relative');
            shipDiv.addEventListener('click', (event) => {
                reverseShipDirection(event)
            })

            for (let j = 0; j < length; j++) {
                const cellDiv = document.createElement('div');
                cellDiv.classList.add('cell');
                cellDiv.classList.add('drag');
                cellDiv.classList.add('place-ship');
                shipDiv.appendChild(cellDiv);
            }

            shipGroupDiv.appendChild(shipDiv);
        }

        container.appendChild(shipGroupDiv);
    });
}

function getGridPlayer(playerName) {
    if (playerName === 'player 1') {
        return document.querySelector('.p1-grid')
    } else {
        return document.querySelector('.p2-grid')
    }
}

function getGridPlayerContainer(playerName) {
    if (playerName === 'player 1') {
        return document.querySelector('.your-grid-container')
    } else {
        return document.querySelector('.opponent-grid-container')
    }
}

function renderRandomShips(ships, playerName) {
    resetRenderShips(playerName)
    const gridPlayerContainer = getGridPlayerContainer(playerName)
    const dragDrop = gridPlayerContainer.querySelector('.drag-drop');
    dragDrop.classList.add('hide-div')
    const gridPlayer = getGridPlayer(playerName)
    const listShip = Object.keys(ships)
    for (let i = 0; i < listShip.length; i++) {
        const cell = gridPlayer.querySelector(`[data-axis='${listShip[i]}']`)
        cell.classList.add('place-ship')
    }
}

function resetRenderShips(playerName) {
    const gridPlayer = getGridPlayer(playerName)
    const cellList = gridPlayer.querySelectorAll('.cell')
    for (let i = 0; i < cellList.length; i++) {
        cellList[i].classList.remove('place-ship')
        if (cellList[i].firstElementChild) {
            cellList[i].removeChild(cellList[i].firstElementChild);
        }
    }
}

function renderCoordinate(axis, enemyName, isHit) {
    const gridPlayer = getGridPlayer(enemyName)
    const cell = gridPlayer.querySelector(`[data-axis='${axis.x}_${axis.y}']`)
    if (isHit) {
        cell.classList.add('hit')
        const childCell = cell.querySelector('.cell')
        if(childCell) {
            childCell.classList.add('hit')
        }
    } else {
        cell.classList.add('not-hit')
    }
}

function renderSunk(ship, enemyName) {
    const gridPlayer = getGridPlayer(enemyName)
    for (let i = 0; i < ship.hits.coordinates.length; i++) {
        const cell = gridPlayer.querySelector(`[data-axis='${ship.hits.coordinates[i].x}_${ship.hits.coordinates[i].y}']`)
        const childCell = cell.querySelector('.cell')
        if (ship.hits.coordinates[i].x === ship.lastCoordinate.x && ship.hits.coordinates[i].y === ship.lastCoordinate.y) {
            cell.classList.add('hit')
            if(childCell) {
                childCell.classList.add('hit')
            }
        }
        cell.classList.add('sunk')
        if(childCell) {
            childCell.classList.add('sunk')
        }
    }
}

function renderEndGame(ship, enemyName, victoryName, mode) {
    renderSunk(ship, enemyName, true)
    showVictory(victoryName, mode)
}

function showVictory(victoryName, mode) {
    const showResultDiv = document.querySelector('.show-result')
    const imageMode = document.querySelector('.show-image-win')
    const nameWinner = document.querySelector('.text-show-result')

    setTimeout(() => {
        showResultDiv.classList.remove('hide-div')
    }, 500)
    if (mode === 'computer') {
        imageMode.src = 'src/images/icon-bot.svg'
    } else {
        imageMode.src = 'src/images/icon-human.svg'

    }

    nameWinner.textContent = victoryName.toUpperCase() + ' TAKES THE ROUND'
}

function disableGridCurrentPlayer(currentPlayer) {
    let gridPlayerWrap = null
    let gridPlayer = null
    let enemyPlayerWrap = null
    let enemyPlayer = null
    if (currentPlayer === 'player 1') {
        gridPlayerWrap = document.querySelector('.wrap-p1-grid')
        gridPlayer = document.querySelector('.p1-grid')
        enemyPlayerWrap = document.querySelector('.wrap-p2-grid')
        enemyPlayer = document.querySelector('.p2-grid')
    } else {
        gridPlayerWrap = document.querySelector('.wrap-p2-grid')
        gridPlayer = document.querySelector('.p2-grid')
        enemyPlayerWrap = document.querySelector('.wrap-p1-grid')
        enemyPlayer = document.querySelector('.p1-grid')
    }
    gridPlayerWrap.classList.add('cursor-disabled')
    gridPlayer.classList.add('disable')
    enemyPlayerWrap.classList.remove('cursor-disabled')
    enemyPlayer.classList.remove('disable')
}

function disableAllPlayer() {
    const gridPlayerWrap = document.querySelector('.wrap-p1-grid')
    const gridPlayer = document.querySelector('.p1-grid')
    const enemyPlayerWrap = document.querySelector('.wrap-p2-grid')
    const enemyPlayer = document.querySelector('.p2-grid')
    gridPlayerWrap.classList.add('cursor-disabled')
    gridPlayer.classList.add('disable')
    enemyPlayerWrap.classList.add('cursor-disabled')
    enemyPlayer.classList.add('disable')
}
function enableAllPlayer() {
    const gridPlayerWrap = document.querySelector('.wrap-p1-grid')
    const gridPlayer = document.querySelector('.p1-grid')
    const enemyPlayerWrap = document.querySelector('.wrap-p2-grid')
    const enemyPlayer = document.querySelector('.p2-grid')
    gridPlayerWrap.classList.remove('cursor-disabled')
    gridPlayer.classList.remove('disable')
    enemyPlayerWrap.classList.remove('cursor-disabled')
    enemyPlayer.classList.remove('disable')
}

function disableActionButtons() {
    const buttonStart = document.querySelector('.start')
    const buttonChooseShips = document.querySelectorAll('.button-template')
    for (let buttonChooseShip of buttonChooseShips) {
        buttonChooseShip.disabled = true
    }
    buttonStart.classList.add('disableStart')
    buttonStart.disabled = true
}

function enableActionButtons() {
    const buttonStart = document.querySelector('.start')
    const buttonChooseShips = document.querySelectorAll('.button-template')
    const dragDrops = document.querySelectorAll('.drag-drop');
    for (let dragDrop of dragDrops) {
        dragDrop.classList.add('hide-div')
    }
    for (let buttonChooseShip of buttonChooseShips) {
        buttonChooseShip.disabled = false
    }
    buttonStart.classList.remove('disableStart')
    buttonStart.disabled = false
}

function hideShowDivResult() {
    const showResult = document.querySelector('.show-result')
    showResult.classList.add('hide-div')
}

function renderShipDirections(coordinates) {
    const shipCoordinates =  document.querySelector(`[data-coordinate='${coordinates[0].x}_${coordinates[0].y}']`)
    if(shipCoordinates.classList.contains('flex-ship-coordinates')) {
        shipCoordinates.classList.remove('flex-ship-coordinates')
    } else {
        shipCoordinates.classList.add('flex-ship-coordinates')
    }
}


export {
    initialGrid,
    renderRandomShips,
    renderCoordinate,
    renderSunk,
    renderEndGame,
    disableGridCurrentPlayer,
    disableAllPlayer,
    generateDragDropShops,
    resetRenderShips,
    disableActionButtons,
    hideShowDivResult,
    enableActionButtons,
    enableAllPlayer,
    renderShipDirections
}