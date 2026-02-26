import { renderAllBoards } from "../../ui/gameRender.js";
import { displayMessage } from "../../ui/uiEvents.js";
import { createPlayerFleet } from "../../ui/dragDropShips.js";
import { placeComputerShips } from "../botLogic/botLogic.js";

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
        renderAllBoards(this.player1, this.player2, this.isPlanning, this);

        displayMessage("Place your ships, Commander!");

        createPlayerFleet(this.isPlanning, this); // Pass plan state and controller to function

        this.gameTransition();
    }

    gameTransition() {
        if (this.player1.allShipsPlaced()) {
            this.playGame();

            const dockDiv = document.getElementById("dock-container");
            if (dockDiv) dock.remove();
        }
    }

    playGame() {
        // Update game state
        this.isPlanning = false;
        this.inProgress = true;

        placeComputerShips(this.player2.gameBoard);

        renderAllBoards(this.player1, this.player2, this.isPlanning, this)

        displayMessage("Fire away, Commander!")

        // check winner

        // If no winner, switch turn and keep playing : takeTurn => checkWinner => switchTurn
    }

    takeTurn() {
        // Ai turn logic
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