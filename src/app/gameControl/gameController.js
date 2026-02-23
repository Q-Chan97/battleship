import { renderAllBoards } from "../../ui/gameRender.js";

export class GameController {
    constructor(player1, player2) {
        this.player1 = player1;
        this.player2 = player2;
        
        // Player 1 goes first, these will switch
        this.currentPlayer = player1;
        this.otherPlayer = player2;

        // States for the game- planning ships and match in progress. Also will switch
        this.isPlanning = true;
        this.inProgress = false;

        this.winner = null; // Keep track of win state
    }

    startGame() {
        renderAllBoards(this.player1, this.player2)
    }
}