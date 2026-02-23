import { Ship } from "./ship";

test("Ship to receive hits", () => {
    let testShip = new Ship;
    testShip.hit();
    testShip.hit();
    expect(testShip.hits).toBe(2);
})

test("Ship has sunk", () => {
    let testShip = new Ship("battleship", 4, 4);

    expect(testShip.isSunk()).toBeTruthy();
})