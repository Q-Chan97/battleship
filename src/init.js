// Initialize JS
import { GameController } from "./app/gameControl/gameController";
import { Player } from "./app/player/player";
import { getPlayerName } from "./ui/uiEvents";
import { setupResetButton } from "./ui/uiEvents";

export async function init() {
    const playerName = await getPlayerName(); // Wait for player name before launching game

    let realPlayer = new Player(playerName, "player");
    let computerPlayer = new Player("Computer", "computer")

    const newGame = new GameController(realPlayer, computerPlayer);
    newGame.setupGame();
    setupResetButton(newGame); // Pass controller instance to button setup
}
