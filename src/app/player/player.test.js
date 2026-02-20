import { Player } from "./player.js";

describe("Player class tests", () => {
    let realPlayer;
    let aiPlayer;

    beforeEach(() => {
        realPlayer = new Player("player1", "real");
        aiPlayer = new Player("computer", "ai");
    })

    test("Player is valid", () => {
        expect(realPlayer.gameBoard).toHaveProperty("placeShip");
        expect(realPlayer.gameBoard).toHaveProperty("receivedAttack");
    })

    test("AI is valid", () => {
        expect(aiPlayer.gameBoard).toHaveProperty("placeShip");
        expect(aiPlayer.gameBoard).toHaveProperty("receivedAttack");
    })

    test("Players are unique", () => {
        expect(realPlayer).not.toBe(aiPlayer);
        expect(realPlayer.gameBoard).not.toBe(aiPlayer.gameBoard);
    })
})