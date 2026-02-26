// Computer player logic
import { Ship } from "../ship/ship.js";
import { shipTypes } from "../ship/shipTypes.js";

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