import {Player} from "./factories/Player.js";
import {
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
} from "./dom.js";

class Play {
    constructor(mode) {
        this.factoryShips = [
            // {6 : 1}
            {4 : 1}, // {lengthOfShip: numberShips}
            {3 : 2},
            {2 : 3},
            {1 : 4},
        ]
        this.mode = mode
        this.players = []
        this.currentPlayer = null
        this.isStart = false
        this.timer = null
    }

    initialGame(isReset = false) {
        this.players = []
        const firstPlayer = new Player('player 1')
        this.players = [...this.players, firstPlayer]

        let secondPlayer = null
        if(this.mode === 'computer') {
            secondPlayer = new Player('computer')
        } else {
            secondPlayer = new Player('player 2')
        }
        secondPlayer.gameboard.randomPlaceShips(this.factoryShips)
        this.players = [...this.players, secondPlayer]
        initialGrid((x, y) => this.getAttack(x, y), this.mode)
        this.currentPlayer = firstPlayer
    }
    randomShips(event) {
        const ships = this.currentPlayer.gameboard.randomPlaceShips(this.factoryShips)
        if(this.currentPlayer !== 'computer') {
            renderRandomShips(ships, this.currentPlayer.name)
        }
        // disableGridCurrentPlayer(this.currentPlayer.name)
    }

    processComputerFire() {
        // const randomFreeEnemyCoordinate = this.getEnemyPlayer().gameboard.randomFire() // computer random
        const randomFreeEnemyCoordinate = this.getEnemyPlayer().gameboard.intelligenceFired() // computer intelligence
        this.getAttack(randomFreeEnemyCoordinate.x, randomFreeEnemyCoordinate.y)
    }

    getAttack(xAxis, yAxis) {
        if(!this.isStart) {
            alert("Place enough your ships and enter the button start game");
            return;
        }
        const enemyPlayer = this.getEnemyPlayer()
        const turnResult = enemyPlayer.gameboard.receiveAttack(xAxis, yAxis)
        switch (turnResult.status) {
            case "AlREADY_HIT": {
                this.timer = setTimeout(() => {
                    disableGridCurrentPlayer(this.currentPlayer.name)
                }, 0)
                break
            }
            case "NOT_HIT":
                this.timer = setTimeout(() => {
                    renderCoordinate(turnResult.data, enemyPlayer.name, false)
                    this.currentPlayer = this.getEnemyPlayer()
                    disableGridCurrentPlayer(this.currentPlayer.name)
                    if (this.currentPlayer.name === 'computer') {
                        this.processComputerFire()
                    }
                }, 500)
                break
            case "HIT":
                this.timer = setTimeout(() => {
                    console.log(1)
                    renderCoordinate(turnResult.data, enemyPlayer.name, true)
                    disableGridCurrentPlayer(this.currentPlayer.name)
                    if (this.currentPlayer.name === 'computer') {
                        this.processComputerFire()
                    }
                }, 500)
                break
            case "SUNK":
                this.timer = setTimeout(() => {
                    console.log('vao sunk', turnResult.data)
                    renderSunk(turnResult.data, enemyPlayer.name)
                    disableGridCurrentPlayer(this.currentPlayer.name)
                    if (this.currentPlayer.name === 'computer') {
                        this.processComputerFire()
                    }
                }, 500)
                break
            case "END_GAME":
                renderEndGame(turnResult.data, enemyPlayer.name, this.currentPlayer.name, this.mode)
        }
        disableAllPlayer()
    }

    getEnemyPlayer() {
        return this.players.find(player => player.name !== this.currentPlayer.name)
    }

    generateDragDrop() {
        this.currentPlayer.gameboard.resetPlaceShips()
        resetRenderShips(this.currentPlayer.name)
        generateDragDropShops(this.factoryShips, 'player 1',(event) => this.reverseShipDirection(event))
    }
    allowDrop(ev) {
        ev.preventDefault();
    }
    drag(ev) {
        ev.dataTransfer.setData("id", ev.target.id);
        ev.dataTransfer.setData("length", ev.target.getAttribute('data-length'));
        if(ev.target.getAttribute('data-coordinate')) {
            ev.dataTransfer.setData("coordinate", ev.target.getAttribute('data-coordinate'));
        }
    }
    drop(ev) {
        const data = ev.dataTransfer.getData("id");
        const length = ev.dataTransfer.getData("length");
        if(!ev.target.getAttribute('data-axis')) {
            return;
        }
        const xAxis = parseInt(ev.target.getAttribute('data-axis')[0])
        const yAxis = parseInt(ev.target.getAttribute('data-axis')[2])

        if(ev.dataTransfer.getData('coordinate')) {
            const xAxisOldPlace = parseInt(ev.dataTransfer.getData('coordinate')[0])
            const yAxisOldPlace = parseInt(ev.dataTransfer.getData('coordinate')[2])
            const resultRelocate = this.currentPlayer.gameboard.changeOldShipCoordinateDragDrop(xAxisOldPlace, yAxisOldPlace, xAxis, yAxis, false)
            if(!resultRelocate) {
                return;
            }
        } else {
            const shipCoordinateExpect = this.currentPlayer.gameboard.getShipCoordinateExpect(xAxis, yAxis, parseInt(length))
            const isPlaceShipAble = this.currentPlayer.gameboard.isPlaceShipAble(shipCoordinateExpect)
            if(!isPlaceShipAble) {
                return;
            } else {
                this.currentPlayer.gameboard.placeShip(shipCoordinateExpect)
            }
        }

        const target = document.getElementById(data)
        target.setAttribute('data-coordinate', `${xAxis}_${yAxis}`)
        ev.target.appendChild(target)
    }

    startGame() {
        let countFactorShips = 0
        for (let element of this.factoryShips) {
            countFactorShips += parseInt(Object.values(element)[0])
        }
        for (let player of this.players) {
            if(player.gameboard.ships.length !== countFactorShips) {
                alert("Place enough ships before starting game");
                return;
            }
        }
        disableActionButtons()
        this.isStart = true
    }

    handleClickQuit(){
        location.reload()
    }

    handleCLickResetGame() {
        clearTimeout(this.timer)
        this.initialGame()
        hideShowDivResult()
        enableActionButtons()
        enableAllPlayer(this.currentPlayer.name)
        this.isStart = false
    }

    reverseShipDirection(event) {
        if(this.isStart){
            return;
        }
        const coordinate = event.currentTarget.getAttribute('data-coordinate')
        if(!coordinate) {
            return;
        }
        const xAxis = parseInt(coordinate[0])
        const yAxis = parseInt(coordinate[2])
        const resultRelocate = this.currentPlayer.gameboard.changeOldShipCoordinateDragDrop(xAxis, yAxis, xAxis, yAxis, true)
        if(!resultRelocate) {
            return;
        }
        renderShipDirections(resultRelocate)
    }
}


const play = new Play('computer')

play.initialGame()

window.play = play