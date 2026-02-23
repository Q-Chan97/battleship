// Initialize JS
import { GameController } from "./app/gameControl/gameController";
import { Player } from "./app/player/player";

export function init() {
    let realPlayer = new Player("Shepard", "player");
    let computerPlayer = new Player("Computer", "computer")

    const newGame = new GameController(realPlayer, computerPlayer);
    newGame.startGame();
}
