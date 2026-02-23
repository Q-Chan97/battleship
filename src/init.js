// Initialize JS

import { renderAllBoards } from "./ui/gameRender";
import { Player } from "./app/player/player";

// Testing

let realPlayer = new Player("Joe", "player");
let aiPlayer= new Player("AI", "computer")


export function init() {
    renderAllBoards(realPlayer, aiPlayer);
}
