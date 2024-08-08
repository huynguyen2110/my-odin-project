import {KnightTravails} from "./graph.js";

const knightTravails = new KnightTravails()

const moves = knightTravails.knightMoves([0,0],[1,1])
const moves2 = knightTravails.knightMoves([0,0],[7,7])
const moves3 = knightTravails.knightMoves([3,3],[0,0])
console.log(moves, moves2, moves3)


