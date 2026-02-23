import { Player } from "../player/player.js"
import { renderAllBoards } from "../../ui/gameRender.js";
import { Ship } from "../ship/ship.js";

const realPlayer = new Player("Shepard", "player");
const aiPlayer = new Player("computer", "computer")

const carrier = new Ship("battleship", 4)

export function showGame() {
    realPlayer.gameBoard.placeShip(carrier, 6, 7, true);
    realPlayer.gameBoard.receivedAttack(6, 7);
    realPlayer.gameBoard.receivedAttack(4, 7);
    renderAllBoards(realPlayer, aiPlayer)
}