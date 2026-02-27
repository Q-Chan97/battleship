import { shipTypes } from "../app/ship/shipTypes.js";
import { Ship } from "../app/ship/ship";
import { renderAllBoards } from "./gameRender.js";


let selectedShip = null;
let draggedShip = null;
let gameController = null;

export function createPlayerFleet(planningStage, controller) {
    gameController = controller;
    const shipDockContainer = document.getElementById("ships-container");
    const rotateButton = document.getElementById("rotate-button");

    for (let shipData of Object.values(shipTypes)) {
        let newShip = new Ship(shipData.type, shipData.length) // New Ship instance

        let shipDiv = document.createElement("div"); // Holds ship

        shipDiv.classList.add("draggable-ship");

        // Add dataset info
        shipDiv.dataset.type = newShip.type;
        shipDiv.dataset.length = newShip.length;
        shipDiv.dataset.isHorizontal = true;

        // Add cells to match ship length
        for (let i = 0; i < newShip.length; i++) {
            const cellDiv = document.createElement("div");
            cellDiv.classList.add("ship-cell");
            shipDiv.appendChild(cellDiv)
        }

        // Ship selection for fleet
        shipDiv.addEventListener("click", () => {
            selectShip(shipDiv);
        });
        
        // Make ships draggable elements
        if (planningStage === true) {
            shipDiv.setAttribute("draggable", true);
            shipDiv.addEventListener("dragstart", handleDragging);
            shipDiv.addEventListener("dragend", handleDragEnd);
        }

        let shipWrapper = document.createElement("div");
        shipWrapper.classList.add("ship-wrapper");

        let nameDiv = document.createElement("div");
        nameDiv.classList.add("ship-name-div");
        nameDiv.innerText = shipDiv.dataset.type;

        shipWrapper.appendChild(nameDiv);
        shipWrapper.appendChild(shipDiv);

        shipDockContainer.appendChild(shipWrapper);
    }

    // Rotate ship event listener

    if (planningStage === true) {
        rotateButton.addEventListener("click", () => {
            rotateSelectedShip();
        })
    }
}

function selectShip(shipDiv) {
    if (selectedShip === shipDiv) { // Toggle same ship being selected
        selectedShip.classList.remove("selected-ship");
        selectedShip = null;
        return;
    }

    if (selectedShip) { // Removes class from previous selected ship
        selectedShip.classList.remove("selected-ship");
    }

    selectedShip = shipDiv; // Assigns new selected ship
    selectedShip.classList.add("selected-ship");
}

function rotateSelectedShip() {
    if (selectedShip === null) return;

    if (selectedShip) {
       let orientation = selectedShip.dataset.isHorizontal;

       if (orientation === "true") {
        selectedShip.dataset.isHorizontal = "false";
        selectedShip.style.flexDirection = "column";
       } else {
        selectedShip.dataset.isHorizontal = "true";
        selectedShip.style.flexDirection = "row";
       }
    }
}

// Assigns dragged ship
function handleDragging(e) {
    draggedShip = e.currentTarget;
    draggedShip.classList.add("dragging-ship");
}

// Resets dragged ship
function handleDragEnd() {
    if (draggedShip) {
        draggedShip.classList.remove("dragging-ship");
    }
    draggedShip = null;
}

// Handles ship drop
export function handleDropShip(e) {
    e.preventDefault();

    if (!draggedShip) return;

    // Get x and y data from cell
    const x = parseInt(e.currentTarget.dataset.x);
    const y = parseInt(e.currentTarget.dataset.y);

    // Get length and orientation from dragged ship
    const isHorizontal = draggedShip.dataset.isHorizontal === "true";
    const length = parseInt(draggedShip.dataset.length);
    const type = draggedShip.dataset.type;

    const shipToPlace = new Ship(type, length);

    // Place on board or show error
    try {
        gameController.player1.gameBoard.placeShip(shipToPlace, x, y, isHorizontal);

        renderAllBoards(gameController.player1, gameController.player2, true);

        draggedShip.parentElement.remove();

        gameController.gameTransition();
    }

    catch (error) {
        alert(error);
    }
}