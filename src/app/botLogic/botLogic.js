// Computer player logic
import { displayMessage } from "../../ui/uiEvents.js";
import { Ship } from "../ship/ship.js";
import { shipTypes } from "../ship/shipTypes.js";
import { renderAllBoards } from "../../ui/gameRender.js";

export function placeComputerShips(computerBoard) {
    const shipsArray = Object.values(shipTypes);

    // Randomizes order of ships
    let shuffledShips = shipsArray.sort(() => Math.random() - 0.5);

    for (let shipData of shuffledShips) {

        let newShip = new Ship(shipData.type, shipData.length);

        // function will keep trying to place ship until a success
        let shipPlaced = false; 

        while (shipPlaced === false) {

            // Orientation of ship is a 50% chance of true === horizontal or false === vertical
            let randBoolean = Math.random() < 0.5;

            let orientation = randBoolean ? true : false;

            // X and Y coords are randomly generated
            let x = Math.floor(Math.random() * 10);
            let y = Math.floor(Math.random() * 10);

            try {
                computerBoard.placeShip(newShip, x, y, orientation);
                shipPlaced = true;
            }

            catch (error) {
                console.log(error);
            }
        }
    }
}

export function handleComputerFire(playerBoard, controller) {

    // Find random coordinates
    let x = Math.floor(Math.random() * 10);
    let y = Math.floor(Math.random() * 10);

    // Filters out coordinates that are in hitShots or missedShots
    while (playerBoard.hitShots.has(`${x},${y}`) || playerBoard.missedShots.has(`${x},${y}`)) {
        x = Math.floor(Math.random() * 10);
        y = Math.floor(Math.random() * 10);
    }

    try {
        const result = playerBoard.receivedAttack(x, y);

        // Updates boards after computer hit
        renderAllBoards(controller.player1, controller.player2, false, controller);

        if (result === "Hit") {
            
            let sunkShip = checkSunkShip(playerBoard, x, y);

            if (sunkShip) {
                displayMessage(`The enemy has sunk our ${sunkShip.type}, Commander...`)
            } else displayMessage("The enemy hit one of ours, sir!");
        }

        if (result === "Miss") {
            displayMessage("The enemy missed!")
        }

        // Check win condition
        if (controller.checkWinner()) return;

        // Switch to player turn
        controller.switchTurn();
    }

    catch (error) {
        console.log(error);
    }
}

// Finds ship type once sunk
function checkSunkShip(playerBoard, x, y) {
    const target = playerBoard.board[x][y];

    if (target && target.isSunk()) {
        return target;
    }
    return null;
}