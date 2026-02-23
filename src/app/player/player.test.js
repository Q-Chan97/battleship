import { Player } from "./player.js";
import { Ship } from "../ship/ship.js";

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

describe("Player attack tests", () => {
    let realPlayer;
    let aiPlayer;

    beforeEach(() => {
        realPlayer = new Player("player1", "real");
        aiPlayer = new Player("computer", "ai");
    })

    test("Player can attack enemy board", () => {
        let ship = new Ship("destroyer", 3, 0);
        let enemyBoard = aiPlayer.gameBoard;
        enemyBoard.placeShip(ship, 0, 0, true);
        realPlayer.attack(enemyBoard, 0, 0);
        
        expect(ship.hits).toBe(1);
    })

    test("Ai player can attack real player board", () => {
        let ship = new Ship("destroyer", 3, 0);
        let enemyBoard = realPlayer.gameBoard;
        enemyBoard.placeShip(ship, 0, 0, true);
        aiPlayer.attack(enemyBoard, 0, 0);

        expect(ship.hits).toBe(1);
    })
})