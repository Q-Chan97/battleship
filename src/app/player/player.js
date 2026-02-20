import { GameBoard } from "../gameboard/gameboard.js";

export class Player {
    constructor(name, type) {
        this.name = name;
        this.gameBoard = new GameBoard();
        this.type = type;
    }
}