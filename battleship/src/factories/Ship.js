export class Ship {
    constructor(coordinates) {
        this.coordinates = coordinates
        this.hits = []
        this.isSunk = false;
    }

    addHit(coordinate) {
        const hitAttack = this.hits.find(hit => hit.x === coordinate.x && hit.y === coordinate.y)
        if (!hitAttack) {
            this.hits.push(coordinate)
            this.setSunk()
        }

    }

    setSunk() {
        if (this.hits.length === this.coordinates.length) {
            this.isSunk = true
        }
    }

}