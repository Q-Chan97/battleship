import { renderAllBoards } from "../../ui/gameRender.js";
import { displayMessage } from "../../ui/uiEvents.js";
import { createPlayerFleet } from "../../ui/dragDropShips.js";

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

    setupGame() {
        renderAllBoards(this.player1, this.player2);

        displayMessage("Place your ships, Commander!");

        createPlayerFleet(this.isPlanning); // Pass plan state and player 1 to function
        
        // while there are still draggable ships, wait for player to finish placement

        // Have UI call playGame

    }

    playGame() {
        // Update game state
        this.isPlanning = false;
        this.inProgress = true;

        // randomly place ai ships (ai logic js file)

        // take turn player OR ai? check

        // check winner

        // If no winner, switch turn and keep playing : takeTurn => checkWinner => switchTurn
    }

    takeTurn() {
        // If current player is player, do player stuff (from player logic js file?);

        // If current player is computer, do computer stuff from ai logic js file
    }


    switchTurn() {
        // Swap current and other player roles
    }

    checkWinner() {
        // If all ships are sunk (allShipsSunk from gameBoard), declare winner for current player
    }

    gameReset() {
        // Clear board
        // Start new game (with same player name?)
    }
}