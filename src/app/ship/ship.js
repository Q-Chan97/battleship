export class Ship  {
    constructor(type, length, hits = 0) {
        this.type = type;
        this.length = length,
        this.hits = hits
    }

    hit() {
        this.hits++;
    }

    isSunk() {
        return this.hits >= this.length;
    }
}