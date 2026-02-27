export class GameBoard {
    constructor(rows = 10, cols = 10) {
        this.rows = rows;
        this.cols = cols;
        
        // Create board, rows x columns, cells initialized to null
        this.board = Array.from({ length: rows }, () =>  
            Array(cols).fill(null)
        );

        this.ships = []; // Keep track of ships
        this.missedShots = new Set; // Keep track of coords of missed shots
        this.hitShots = new Set; // Keep track of coords of hit shots
        this.occupiedSpaces = new Set; // Keep track of occupied spaces on board
    }

    placeShip(ship, xCoord, yCoord, isHorizontal) {

        for (let i = 0; i < ship.length; i++) { // Get all x's and y's for a ship
            let x = isHorizontal ? xCoord + i : xCoord; 
            let y = isHorizontal ? yCoord: yCoord + i;

            if (x < 0 || x >= 10 || y < 0 || y >= 10) {
                throw new Error("Ship out of bounds.");
            }

            if (this.board[x][y] !== null) {
                throw new Error("Position is already occupied.");
            }
        }

        this.ships.push(ship);

        if (isHorizontal) {
            for (let i = 0; i < ship.length; i++) { // Stores reference to ship along x axis
                this.board[xCoord + i][yCoord] = ship;
                let occupiedSpace = `${xCoord + i},${yCoord}`;
                this.occupiedSpaces.add(occupiedSpace); // Add space to occupied spaces Set
            }
        }

        if (!isHorizontal) {
            for (let i = 0; i < ship.length; i++) { // Stores reference to ship along y axis
                this.board[xCoord][yCoord + i] = ship;
                let occupiedSpace = `${xCoord},${yCoord + i}`;
                this.occupiedSpaces.add(occupiedSpace);
            }
        }
    }

    receivedAttack(xCoord, yCoord) {

        if (xCoord < 0 || xCoord >= 10 || yCoord < 0 || yCoord >= 10) {
            throw new Error("Attack is out of bounds.");
        }

        const target = this.board[xCoord][yCoord];
        const targetKey = `${xCoord},${yCoord}`;

        if (this.hitShots.has(targetKey) || this.missedShots.has(targetKey)) {
            throw new Error("Coordinates have already been attacked.");
        }

        if (target === null) {
            this.missedShots.add(targetKey);
            return "Miss";
        }
        target.hit();
        this.hitShots.add(targetKey);
        return "Hit";
    }

    // Checks to see if ships array is populated or if ships are sunk
    allShipsSunk() {
        if (this.ships.length === 0) {
            return false;
        }

        for (let ship of this.ships) {
            if (ship.isSunk() === false) {
                return false;
            }
        }
        
        return true;
    }

    resetBoard() {
        this.board = Array.from({ length: this.rows }, () =>  
            Array(this.cols).fill(null)
        );
        this.missedShots.clear();
        this.hitShots.clear();
        this.occupiedSpaces.clear();
        this.ships = [];
    }
}