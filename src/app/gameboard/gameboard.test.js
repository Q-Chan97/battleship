import { GameBoard } from "./gameboard.js";
import { Ship } from "../ship/ship.js";

describe("Testing placements", () => {

    beforeEach(() => {
        testShip = new Ship(4, 0);
        testBoard = new GameBoard;
    })

    test("Ship has been placed along x axis", () => {
        let isHorizontal = true;
        let [xCoord, yCoord] = [0, 0];

        testBoard.placeShip(testShip, xCoord, yCoord, isHorizontal);
        
        expect(testBoard.board[0][yCoord]).toEqual(testShip);
        expect(testBoard.board[1][yCoord]).toEqual(testShip);
        expect(testBoard.board[2][yCoord]).toEqual(testShip);
        expect(testBoard.board[3][yCoord]).toEqual(testShip);
    })

    test("Ship has been placed along y axis", () => {
        let isHorizontal = false;
        let [xCoord, yCoord] = [0,0];

        testBoard.placeShip(testShip, xCoord, yCoord, isHorizontal);

        expect(testBoard.board[xCoord][0]).toEqual(testShip);
        expect(testBoard.board[xCoord][1]).toEqual(testShip);
        expect(testBoard.board[xCoord][2]).toEqual(testShip);
        expect(testBoard.board[xCoord][3]).toEqual(testShip);
    })

    test("Ship cannot be placed out of bounds", () => {
        let isHorizontal = true;
        let [xCoord, yCoord] = [10, 0];

        expect(() => testBoard.placeShip(testShip, xCoord, yCoord, isHorizontal)).toThrow(new Error("Ship out of bounds."))
    })

    test("Two ships cannot be placed on same coordinates", () => {
        let isHorizontal = true;
        let [xCoord, yCoord] = [0, 0];

        let badShip = new Ship(3, 0);
        let [xCoord2, yCoord2] = [1, 0];

        testBoard.placeShip(testShip, xCoord, yCoord, isHorizontal);

        expect(() => testBoard.placeShip(badShip, xCoord2, yCoord2, isHorizontal)).toThrow(new Error("Position is already occupied."))
    })
})