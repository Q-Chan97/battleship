// Initialize JS

import { renderAllBoards } from "./ui/gameRender";
import { Player } from "./app/player/player";
import { Ship } from "./app/ship/ship.js";

// Testing

let realPlayer = new Player("Joe", "player");
let aiPlayer = new Player("AI", "computer")

let battleship = new Ship("battleship", 4);
let carrier = new Ship("carrier", 5);

export function init() {
    realPlayer.gameBoard.placeShip(battleship, 0, 0, true);
    aiPlayer.gameBoard.placeShip(battleship, 0, 0, true);
    realPlayer.gameBoard.placeShip(carrier, 0, 4, false);
    renderAllBoards(realPlayer, aiPlayer);
}
