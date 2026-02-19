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

describe("Testing attack reads", () => {

    beforeEach(() => {
        testShip = new Ship(4, 0);
        testBoard = new GameBoard;
    })

    test("Ship received an attack", () => {
        let [xCoord, yCoord] = [0,0];
        let isHorizontal = true;

        testBoard.placeShip(testShip, xCoord, yCoord, isHorizontal);

        expect(testBoard.receivedAttack(0,0)).toBe("Hit");
        expect(testBoard.hitShots).toContain("0,0");
        expect(testShip.hits).toEqual(1);
    })

    test("Attack has missed", () => {
        let [xCoord, yCoord] = [0,0];
        let isHorizontal = true;

        testBoard.placeShip(testShip, xCoord, yCoord, isHorizontal);

        expect(testBoard.receivedAttack(5,8)).toBe("Miss");
        expect(testBoard.missedShots).toContain("5,8");
    })

    test("Attack can't be placed out of bounds", () => {
        expect(() => testBoard.receivedAttack(11,0)).toThrow(new Error("Attack is out of bounds."))
    })

    test("Can't attack same square twice", () => {
        testBoard.receivedAttack(0,0);
        expect(() => testBoard.receivedAttack(0,0)).toThrow(new Error("Coordinates have already been attacked."))
    })

    test("Ship has been sunk when hits equal length", () => {
        let [xCoord, yCoord] = [0,0];

        testBoard.placeShip(testShip, 0, 0, true);
        for (let i = 0; i < testShip.length; i++) {
            testBoard.receivedAttack(xCoord + i, yCoord);
        }
        
        expect(testShip.isSunk()).toBe(true);
    })

    test("Ship has not been sunk before all hits", () => {
        testBoard.placeShip(testShip, 0, 0, true);

        testBoard.receivedAttack(0,0);

        expect(testShip.isSunk()).toBe(false);
    })

     test("Returns true when all ships are sunk", () => {
        const destroyer = new Ship(3, 0);
        const submarine = new Ship(3, 0);
        const patrol = new Ship(2, 0);
        const carrier = new Ship(5, 0);

        testBoard.placeShip(testShip, 0, 0, true);
        testBoard.placeShip(destroyer, 0, 1, true);
        testBoard.placeShip(submarine, 0, 2, true);
        testBoard.placeShip(patrol, 0, 3, true);
        testBoard.placeShip(carrier, 0, 4, true);

        let ships = [testShip, destroyer, submarine, patrol, carrier];

        // Targets each row and column of ships with received attack
        for (let row = 0; row < ships.length; row ++) {
            for (let col = 0; col < ships[row].length; col++) {
                testBoard.receivedAttack(col, row);
            }
        }

        expect(testBoard.allShipsSunk()).toBe(true);
    })

    test("Returns false is at least one ship is not sunk", () => {
        testBoard.placeShip(testShip, 0, 0, true);
        testBoard.receivedAttack(0,0);

        expect(testBoard.allShipsSunk()).toBe(false);
    })
})