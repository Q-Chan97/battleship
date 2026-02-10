import { Ship } from "./ship";

test("Ship to receive hits", () => {
    let testShip = new Ship;
    testShip.hit();
    testShip.hit();
    expect(testShip.hits).toBe(2);
})