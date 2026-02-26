import { GameBoard } from "../gameboard/gameboard.js";

export class Player {
    constructor(name, type) {
        this.name = name;
        this.gameBoard = new GameBoard();
        this.type = type;
    }

    attack(enemyBoard, xCoord, yCoord) {

        let result = enemyBoard.receivedAttack(xCoord, yCoord);

        return result;
    }

    allShipsPlaced() {
        let ships = this.gameBoard.ships;

        if (ships.length === 5) {
            return true;
        } else return false;
    }
}