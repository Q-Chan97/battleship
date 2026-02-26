// Player actions
import { displayMessage } from "../../ui/uiEvents";

// Player firing
export function handlePlayerFire(controller, e) {

    if (controller.currentPlayer !== controller.player1) return;

    const x = parseInt(e.currentTarget.dataset.x);
    const y = parseInt(e.currentTarget.dataset.y);

    try {
        const result = controller.otherPlayer.gameBoard.receivedAttack(x, y);

        if (result === "Hit") {
            e.currentTarget.classList.add("hit");

            // Check for ship sinking
            const sunkShip = checkSunkShip(controller.otherPlayer, x, y);

            if (sunkShip) {
                displayMessage(`Excellent work Commander, we sunk the enemy ${sunkShip.type}!`)
            } else displayMessage("Great shot Commander, the enemy was hit!");
        }

        if (result === "Miss") {
            e.currentTarget.classList.add("miss");
            displayMessage("Our shot missed, Commander.")
        }

        // If game is over, return
        if (controller.checkWinner()) return;

        // Switch to AI
        controller.switchTurn();
        controller.takeTurn();
    }

    catch (error) {
        alert(error);
    }
}

// Finds ship type once sunk
function checkSunkShip(computer, x, y) {
    const target = computer.gameBoard.board[x][y];

    if (target && target.isSunk()) {
        return target;
    }
    return null;
}