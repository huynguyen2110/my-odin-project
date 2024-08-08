import {Node} from "./node.js";
export class KnightTravails {
    constructor(n) {
        this.queue = [];
        this.xMove = [ 2, 1, -1, -2, -2, -1, 1, 2 ]
        this.yMove = [ 1, 2, 2, 1, -1, -2, -2, -1 ]
        this.passedMoves = []
    }

    getNextMoves(move) {
        const nextMoves = []
        for (let i = 0; i < this.xMove.length; i++) {
            const xNextMove = move[0] + this.xMove[i]
            const yNextMove = move[1] + this.yMove[i]
            let isInsert = true
            if( xNextMove >= 0 && xNextMove <= 7 && yNextMove >= 0 && yNextMove <= 7) {
                for (let j = 0; j < this.passedMoves.length; j++) {
                    if(xNextMove === this.passedMoves[j][0] && yNextMove === this.passedMoves[j][1]) {
                        isInsert = false
                    }
                }
                if(isInsert) {
                    nextMoves.push([xNextMove, yNextMove])
                }
            }

        }
        return nextMoves
    }

    knightMoves(start, end) {
        this.reset()
        const linkedListMoves = this.#internalKnightMoves(start, end)
        const knightMovesArray = this.knightMovesToArray(linkedListMoves)
        return `\nYou made it in ${knightMovesArray.length} moves!  Here's your path: \n[${knightMovesArray.join(']\n[')}]`
    }

    #internalKnightMoves(start, end, isFirst = true) {
        if(isFirst){
            if(start[0] === end[0] && start[1] === end[1]) {
                return new Node(start)
            } else {
                start = new Node(start)
                this.queue.push(start)
            }
        }
        let nextMoves = this.getNextMoves(start.value)
        const enqueue = []
        for (let i = 0; i < nextMoves.length; i++) {
            if(nextMoves[i][0] === end[0] && nextMoves[i][1] === end[1]) {
                return new Node(nextMoves[i], start)
            } else {
                enqueue.push(new Node(nextMoves[i], start))
            }
        }

        this.queue = this.queue.concat(enqueue)
        this.queue.shift()
        return this.#internalKnightMoves(this.queue[0], end, false)
    }
    knightMovesToArray(moves) {
        if(moves == null) {
            return [];
        }
        return this.knightMovesToArray(moves.ancestor).concat([moves.value])
    }
    reset() {
        this.queue = [];
        this.passedMoves = [];
    }
}
