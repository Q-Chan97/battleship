import { renderAllBoards } from "../../ui/gameRender.js";
import { displayMessage, toggleDockVisibility } from "../../ui/uiEvents.js";
import { createPlayerFleet } from "../../ui/dragDropShips.js";
import { placeComputerShips } from "../botLogic/botLogic.js";
import { handleComputerFire } from "../botLogic/botLogic.js";

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
        }
    }

    playGame() {
        // Update game state
        this.isPlanning = false;
        this.inProgress = true;

        toggleDockVisibility(this.isPlanning);

        placeComputerShips(this.player2.gameBoard);

        renderAllBoards(this.player1, this.player2, this.isPlanning, this)

        displayMessage("Fire away, Commander!")
    }

    takeTurn() {
        if (this.currentPlayer === this.player1) {
            return;
        }

        // Small delay of 1.5 seconds
        if (this.currentPlayer === this.player2) {
            setTimeout(() => {
                handleComputerFire(this.player1.gameBoard, this)
            }, 1500)
        }
    }

    switchTurn() {
        if (this.currentPlayer === this.player1) {
            this.currentPlayer = this.player2;
            this.otherPlayer = this.player1;
        }

        else {
            this.currentPlayer = this.player1;
            this.otherPlayer = this.player2;
        }
    }

    checkWinner() {
        const computerBoard = document.getElementById("computer-board")

        if (this.player2.gameBoard.allShipsSunk()) {
            this.winner = this.player1;
            this.inProgress = false;
            computerBoard.style.pointerEvents = "none"
            displayMessage(`Congratulations Commander ${this.player1.name}, we've defeated the enemy! Fantastic strategy!`);
            this.showNewGameDialog();
            return true
        }

        if (this.player1.gameBoard.allShipsSunk()) {
            this.winner = this.player2;
            this.inProgress = false;
            computerBoard.style.pointerEvents = "none"
            displayMessage("The enemy has routed us, fall back! We'll fight another day Commander...");
            this.showNewGameDialog();
            return true;
        }

        else return false;
    }

    gameReset() {
        this.currentPlayer = this.player1;
        this.otherPlayer = this.player2;

        this.player1.gameBoard.resetBoard();
        this.player2.gameBoard.resetBoard();

        this.isPlanning = true;
        this.inProgress = false;
        this.winner = null;

        const showNewGameDialog = document.getElementById("play-again-dialog");
        showNewGameDialog.close();

        toggleDockVisibility(this.isPlanning);

        this.setupGame();
    }

    showNewGameDialog() {
        const dialog = document.getElementById("play-again-dialog");
        setTimeout(() => {
            dialog.showModal();
        }, 3000);
    }
}