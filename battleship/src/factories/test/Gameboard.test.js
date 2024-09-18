import {Gameboard} from "../Gameboard.js";
import {Ship} from "../Ship.js";

const gameBoard = new Gameboard()


xdescribe('getShipCoordinateExpect', () =>
{
    test('test 1', () => {
        expect(gameBoard.getShipCoordinateExpect(2, 3, 4, true)).toEqual([{x: 2, y: 3}, {x: 3, y: 3}, {x: 4, y: 3}, {x: 5, y: 3}]);
    });
    test('test 2', () => {
        expect(gameBoard.getShipCoordinateExpect(4, 8, 3, true)).toEqual([{x: 4, y: 8}, {x: 5, y: 8}, {x: 6, y: 8}]);
    });
    test('test 3', () => {
        expect(gameBoard.getShipCoordinateExpect(6, 3, 2, false)).toEqual([{x: 6, y: 3}, {x: 6, y: 4}]);
    });
    test('test 4', () => {
        expect(gameBoard.getShipCoordinateExpect(6, 3, 1, false)).toEqual([{x: 6, y: 3}]);
    });
    test('test 5', () => {
        expect(gameBoard.getShipCoordinateExpect(6, 3, 1, true)).toEqual([{x: 6, y: 3}]);
    });
    test('test 6', () => {
        expect(gameBoard.getShipCoordinateExpect(10, 3, 3, true)).toEqual([{x: 10, y: 3}, {x: 11, y: 3}, {x: 12, y: 3}]);
    });
    test('test 7', () => {
        expect(gameBoard.getShipCoordinateExpect(10, 3, 3, false)).toEqual([{x: 10, y: 3}, {x: 10, y: 4}, {x: 10, y: 5}]);
    });
});


xdescribe('isPlaceAble', () =>
{
    gameBoard.placeShip([{x: 4, y: 6}, {x: 4, y: 7}, {x: 4, y: 8}, {x: 4, y: 9}])

    test('test success 1', () => {
        expect(gameBoard.isPlaceShipAble([{x: 5, y: 5}, {x: 6, y: 5}, {x: 7, y: 5}, {x: 8, y: 5}])).toBe(true);
    });
    test('test false 1', () => {
        expect(gameBoard.isPlaceShipAble([{x: 4, y: 8}, {x: 5, y: 8}, {x: 6, y: 8}])).toBe(false);
    });
    test('test success 2', () => {
        expect(gameBoard.isPlaceShipAble([{x: 6, y: 5}, {x: 6, y: 6}, {x: 6, y: 7}])).toBe(true);
    });
    test('test false 2', () => {
        expect(gameBoard.isPlaceShipAble([{x: 2, y: 7}, {x: 3, y: 7}, {x: 4, y: 7}])).toBe(false);
    });
    test('test false 3', () => {
        expect(gameBoard.isPlaceShipAble([{x: 10, y: 7}, {x: 11, y: 7}, {x: 12, y: 7}])).toBe(false);
    });
    test('test false 4', () => {
        expect(gameBoard.isPlaceShipAble([{x: -1, y: 7}, {x: 0, y: 7}, {x: 1, y: 7}])).toBe(false);
    });
    test('test false 2', () => {
        expect(gameBoard.isPlaceShipAble([{x: 6, y: 8}, {x: 6, y: 9}, {x: 6, y: 10}])).toBe(false);
    });
});

xdescribe('isReceiveAttackAble', () =>
{
    gameBoard.board[4][9] = 0
    gameBoard.board[7][3] = 0
    gameBoard.board[1][2] = 0
    test('test success 1', () => {
        expect(gameBoard.isReceiveAttackAble(2, 3)).toBe(true);
    });
    test('test success 2', () => {
        expect(gameBoard.isReceiveAttackAble(0, 0)).toBe(true);
    });
    test('test success 3', () => {
        expect(gameBoard.isReceiveAttackAble(5, 6)).toBe(true);
    });
    test('test success 4', () => {
        expect(gameBoard.isReceiveAttackAble(4, 5)).toBe(true);
    });
    test('test false 1', () => {
        expect(gameBoard.isReceiveAttackAble(10, 6)).toBe(false);
    });
    test('test false 2', () => {
        expect(gameBoard.isReceiveAttackAble(4, 9)).toBe(false);
    });
    test('test false 3', () => {
        expect(gameBoard.isReceiveAttackAble(-1, -2)).toBe(false);
    });
    test('test false 4', () => {
        expect(gameBoard.isReceiveAttackAble(4, 11)).toBe(false);
    });
    test('test false 5', () => {
        expect(gameBoard.isReceiveAttackAble(7, 3)).toBe(false);
    });
    test('test false 6', () => {
        expect(gameBoard.isReceiveAttackAble(1, 2)).toBe(false);
    });
});


describe('receiveAttack', () =>
{
    gameBoard.placeShip([{x: 0, y: 1}, {x: 0, y: 2}])
    test('not hit 1', () => {
        expect(gameBoard.receiveAttack(2, 3)).toBe("NOT_HIT");
    });
    test('not hit 2', () => {
        expect(gameBoard.receiveAttack(9, 9)).toBe("NOT_HIT");
    });
    test('hit 1', () => {
        expect(gameBoard.receiveAttack(0, 1)).toBe("HIT");
    });
    test('hit 2', () => {
        expect(gameBoard.receiveAttack(4, 7)).toBe("HIT");
    });
    test('sunk 1', () => {
        expect(gameBoard.receiveAttack(0, 2)).toBe("SUNK");
    });
    test('hit 3', () => {
        expect(gameBoard.receiveAttack(4, 6)).toBe("HIT");
    });
    test('hit 4', () => {
        expect(gameBoard.receiveAttack(4, 8)).toBe("HIT");
    });
    test('end game', () => {
        expect(gameBoard.receiveAttack(4, 9)).toBe("END_GAME");
    });
});
