import { shipTypes } from "../app/ship/shipTypes.js";
import { Ship } from "../app/ship/ship";


let selectedShip = null;
let draggedShip = null;

export function createPlayerFleet(planningStage) {
    const shipDockContainer = document.getElementById("ships-container");

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

        // Rotate ship event listener

        let rotateButton = document.getElementById("rotate-button");

        if (planningStage === true) {
            rotateButton.addEventListener("click", () => {
                rotateSelectedShip();
            })
        }
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