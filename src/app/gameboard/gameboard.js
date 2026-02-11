export class GameBoard {
    constructor(rows = 10, cols = 10) {
        this.rows = rows,
        this.cols = cols

        this.ships = []; // Keep track of ships
        this.missedShots = []; // Keep track of coords of missed shots
    }
}