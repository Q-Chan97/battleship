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
})