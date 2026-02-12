export class GameBoard {
    constructor(rows = 10, cols = 10) {
        this.rows = rows;
        this.cols = cols;
        
        // Create board, rows x columns, cells initialized to null
        this.board = Array.from({ length: rows }, () =>  
            Array(cols).fill(null)
        );

        this.ships = []; // Keep track of ships
        this.missedShots = []; // Keep track of coords of missed shots
    }

    placeShip(ship, xCoord, yCoord, isHorizontal) {
        if (isHorizontal) {
            for (let i = 0; i < ship.length; i++) { // Stores reference to ship along x axis
                this.board[xCoord + i][yCoord] = ship;
            }
        }
    }
}