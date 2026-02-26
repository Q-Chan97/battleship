import { handleDropShip } from "./dragDropShips.js";
import { handlePlayerFire } from "../app/player/playerLogic.js";

export function renderAllBoards(player, computer, planningStage, controller) {
    renderSingleBoard(player.gameBoard, player.name, player.type, planningStage, controller);

    renderSingleBoard(computer.gameBoard, computer.name, computer.type, planningStage, controller);
}

function renderSingleBoard(gameBoard, name, type, planningStage, controller) {
    const boardDiv = document.createElement("div");
    boardDiv.classList.add("gameBoard");

    // Generate a 10 x 10 board
    for (let y = 0; y < gameBoard.rows; y++) {
        for (let x = 0; x < gameBoard.cols; x++) {
            let cell = document.createElement("div");
            cell.classList.add("cell");
            cell.textContent = `${x},${y}`; // Temporary, just to check if coordinates are aligned

            // Assign x and y coords to cell's dataset
            cell.dataset.x = x;
            cell.dataset.y = y;

            const ship = gameBoard.board[x][y];

            // // Add ship class if ship is present and belongs to a player. Keeps AI ships invisible
            if (ship !== null && type === "player") {
                cell.classList.add("ship");
                cell.dataset.shipType = ship.type;
            }

            // Player board cells listen for drop
            if (planningStage === true && type === "player") {
                cell.addEventListener("dragover", (e) => {
                    e.preventDefault();
                });

                cell.addEventListener("drop", handleDropShip);
            }

            // Enemy cells listen for being fired on
            if (planningStage === false && type === "computer") {
                cell.addEventListener("click", (e) => handlePlayerFire(controller, e));
            }

            // Add markers to cells once hit
            const shipKey = `${x},${y}`;
            if (gameBoard.hitShots.has(shipKey)) {
                cell.classList.add("hit");
            }

            else if (gameBoard.missedShots.has(shipKey)) {
                cell.classList.add("miss");
            }

            boardDiv.appendChild(cell);
        }
    }

    // Append to DOM based on player type
    if (type === "player") {
        boardDiv.id = "player-board";

        const playerBoardContainer = document.querySelector("#player-gameBoard-container");
        playerBoardContainer.innerHTML = "";

        const playerName = document.createElement("h3");
        playerName.classList.add("board-title");
        playerName.textContent = `Commander ${name}'s Board`;

        playerBoardContainer.appendChild(playerName);
        playerBoardContainer.appendChild(boardDiv);
    }

    else if (type === "computer") {
        boardDiv.id = "computer-board";

        const computerBoardContainer = document.querySelector("#computer-gameBoard-container");
        computerBoardContainer.innerHTML = "";

        const computerName = document.createElement("h3");
        computerName.classList.add("board-title");
        computerName.textContent = `Enemy Computer's Board`;

        computerBoardContainer.appendChild(computerName);
        computerBoardContainer.appendChild(boardDiv);
    }
}