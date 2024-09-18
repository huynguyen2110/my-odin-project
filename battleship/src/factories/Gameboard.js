import {Ship} from "./Ship.js";

export class Gameboard{
    constructor(length = 10) {
        this.board = this._init(length);
        this.ships = []
        this.recentHit = [];
    }

    _init(length) {
        const initBoard = [];
        for (let i = 0; i < length; i++) {
            initBoard.push(Array.from({ length: length }, () => null));
        }
        return initBoard;
    }

    getAllBoardCoordinates(board = this.board) {
        const coordinates = {};
        for (let x = 0; x < board.length; x++) {
            for (let y = 0; y < board.length; y++) {
                coordinates[`${x}_${y}`] = {x, y};
            }
        }

        return coordinates
    }

    getAllShipCoordinates(ships = this.ships) {
        const shipCoordinates = {};
        for (let i = 0; i < ships.length; i++) {
            for (let j = 0; j < ships[i].coordinates.length; j++) {
                const x = ships[i].coordinates[j].x
                const y = ships[i].coordinates[j].y
                shipCoordinates[`${x}_${y}`] = {x, y};
            }
        }
        return shipCoordinates;
    }

    getShipCoordinateExpect(xAxis, yAxis, lengthShip, isVertical) {
        const shipCoordinate = []
        if(isVertical) {
            for (let i = 0; i < lengthShip; i++) {
                shipCoordinate.push({x: xAxis + i, y: yAxis})
            }
        } else {
            for (let i = 0; i < lengthShip; i++) {
                shipCoordinate.push({x: xAxis, y: yAxis + i})
            }
        }
        return shipCoordinate
    }

    isValidPlace(shipCoordinate) {
        if(shipCoordinate[0].x < 0 || shipCoordinate[0].x > this.board.length - 1 || shipCoordinate[0].y < 0 || shipCoordinate[0].y > this.board.length - 1)
        {
            return false;
        }
        if(shipCoordinate[shipCoordinate.length - 1].x > this.board.length - 1 || shipCoordinate[shipCoordinate.length - 1].y > this.board.length - 1)
        {
            return false;
        }
        return true
    }

    isPlaceShipAble(shipCoordinate, ships = this.ships) {
        if(!this.isValidPlace(shipCoordinate))
        {
            return false;
        }
        const shipCoordinates = this.getAllShipCoordinates(ships)
        for (let i = 0; i < shipCoordinate.length; i++) {
            if(shipCoordinates[`${shipCoordinate[i].x - 1}_${shipCoordinate[i].y - 1}`] || shipCoordinates[`${shipCoordinate[i].x - 1}_${shipCoordinate[i].y}`] || shipCoordinates[`${shipCoordinate[i].x - 1}_${shipCoordinate[i].y + 1}`]
                || shipCoordinates[`${shipCoordinate[i].x}_${shipCoordinate[i].y - 1}`] || shipCoordinates[`${shipCoordinate[i].x}_${shipCoordinate[i].y}`] || shipCoordinates[`${shipCoordinate[i].x}_${shipCoordinate[i].y + 1}`]
                ||shipCoordinates[`${shipCoordinate[i].x + 1}_${shipCoordinate[i].y - 1}`] || shipCoordinates[`${shipCoordinate[i].x + 1}_${shipCoordinate[i].y}`] || shipCoordinates[`${shipCoordinate[i].x + 1}_${shipCoordinate[i].y + 1}`]
            )
            {
                return false;
            }
        }

        return true;
    }

    placeShip(shipCoordinate, ships = this.ships) {
        ships.push(new Ship(shipCoordinate))
    }

    isReceiveAttackAble(xAxis, yAxis) {
        if(xAxis < 0 || xAxis > this.board.length - 1 || yAxis < 0 || yAxis > this.board.length - 1)
        {
            return false;
        }
        return this.board[xAxis][yAxis] !== 0;  // check is fired
    }

    receiveAttack(xAxis, yAxis) {
        if(this.board[xAxis][yAxis] === 0) {
            return {
                status: "AlREADY_HIT",
                data: {x: xAxis, y: yAxis}
            }
        }
        this.board[xAxis][yAxis] = 0;
        const shipAttack = this.ships.find(ship => ship.coordinates.some(coor => coor.x === xAxis && coor.y === yAxis))
        if(!shipAttack) {
            return {
                status: "NOT_HIT",
                data: {x: xAxis, y: yAxis}
            }
        }
        console.log('shipAttack', shipAttack)
        console.log({x: xAxis, y: yAxis})
        shipAttack.addHit({x: xAxis, y: yAxis})
        if(!shipAttack.isSunk) {
            this.recentHit.push({x: xAxis, y: yAxis})
            return {
                status: "HIT",
                data: {x: xAxis, y: yAxis}
            }
        }

        let isEndGame = true
        for (let i = 0; i < this.ships.length; i++) {
            if(!this.ships[i].isSunk)
            {
                isEndGame = false
                break
            }
        }

        if(isEndGame) {
            return {
                status: "END_GAME",
                data: {
                    hits: shipAttack,
                    lastCoordinate: {x: xAxis, y: yAxis}
                }
            }
        }
        this.recentHit = []
        return {
            status: "SUNK",
            data: {
                hits: shipAttack,
                lastCoordinate: {x: xAxis, y: yAxis}
            }
        }
    }

    getCoordinatesEmptyBoard() {
        const shipCoordinates = Object.keys(this.getAllShipCoordinates())
        const allCoordinates = this.getAllBoardCoordinates()

        for (let i = 0; i < shipCoordinates.length; i++) {
            delete allCoordinates[i]
        }

        return allCoordinates
    }

    getCoordinatesNotFired(board = this.board) {
        const coordinates = {};
        for (let x = 0; x < board.length; x++) {
            for (let y = 0; y < board.length; y++) {
                if(board[x][y] === null) {
                    coordinates[`${x}_${y}`] = {x, y};
                }
            }
        }

        return coordinates
    }

    getRandomInArray(array) {
        return array[Math.floor(Math.random()*array.length)];
    }

    randomPlaceShips(ships) {
        this.ships = []
        const listShips = JSON.parse(JSON.stringify(ships))
        let coordinates = Object.values(this.getAllBoardCoordinates())
        while(listShips.length > 0) {
            const coordinate = this.getRandomInArray(coordinates)
            const shipSelected = listShips[0]
            const ship = this.getShipCoordinateExpect(coordinate.x, coordinate.y, parseInt(Object.keys(shipSelected)[0]), Math.random() < 0.5)
            if(this.isPlaceShipAble(ship)) {
                this.placeShip(ship)
                shipSelected[Object.keys(shipSelected)[0]] -= 1
                if(Object.values(listShips[0])[0] === 0) {
                    listShips.shift()
                }
            }
        }
        return this.getAllShipCoordinates()
    }

    resetPlaceShips() {
        this.ships = []
    }

    randomFire() {
        let coordinates = Object.values(this.getCoordinatesNotFired())
        return this.getRandomInArray(coordinates)
    }

    intelligenceFired() {
        if(this.recentHit.length === 0) {
            return this.randomFire()
        } else {
            let arrayFire = []
            if(this.recentHit.length === 1) {
                arrayFire =
                    [
                        {x: this.recentHit[0].x - 1, y: this.recentHit[0].y },{x: this.recentHit[0].x, y: this.recentHit[0].y -1},
                        {x: this.recentHit[0].x , y: this.recentHit[0].y + 1}, {x: this.recentHit[0].x + 1, y: this.recentHit[0].y },
                    ]
            }
            else {
                if(this.recentHit[0].x === this.recentHit[1].x) {
                    const sort = this.recentHit.sort((a, b) => a.y - b.y);
                     arrayFire = [{x: sort[0].x, y: sort[0].y -1}, {x: sort[0].x, y: sort[sort.length - 1].y + 1}]
                } else {
                    const sort = this.recentHit.sort((a, b) => a.x - b.x);
                    arrayFire = [{x: sort[0].x - 1, y: sort[0].y}, {x: sort[sort.length - 1].x + 1, y: sort[0].y}]
                }
            }
            for(let i = 0; i < arrayFire.length; i++){
                if(this.isReceiveAttackAble(arrayFire[i].x, arrayFire[i].y)) {
                    return {x: arrayFire[i].x, y: arrayFire[i].y}
                }
            }
        }
        return this.randomFire()
    }

    checkShipVertical(coordinates){
        if(coordinates.length === 1) {
            return true
        }
        return coordinates[0].x !== coordinates[1].x;
    }


    changeOldShipCoordinateDragDrop(xOldAxis, yOldAxis ,xNewAxis, yNewAxis, isReverseDirection = false) {
        console.log(this.ships)
        let newShips = structuredClone(this.ships);
        console.log(newShips)
        const shipRelocate = newShips.find(ship => ship.coordinates[0].x === xOldAxis && ship.coordinates[0].y === yOldAxis)
        if(!shipRelocate) {
            console.log('err shipRelocate')
            return false
        }
        newShips = newShips.filter(ship => !(ship.coordinates[0].x === xOldAxis && ship.coordinates[0].y === yOldAxis))

        let isVertical = this.checkShipVertical(shipRelocate.coordinates)
        if(isReverseDirection) {
            isVertical = !isVertical
        }
        const shipCoordinateExpect = this.getShipCoordinateExpect(xNewAxis, yNewAxis, shipRelocate.coordinates.length, isVertical)
        const isPlaceShipAble = this.isPlaceShipAble(shipCoordinateExpect, newShips)
        if(!isPlaceShipAble) {
            console.log('err isPlaceShipAble')
            return false
        }

        this.ships = this.ships.filter(ship => !(ship.coordinates[0].x === xOldAxis && ship.coordinates[0].y === yOldAxis))
        this.placeShip(shipCoordinateExpect, this.ships)
        return shipCoordinateExpect
    }


}


