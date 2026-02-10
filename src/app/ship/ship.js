export class Ship  {
    constructor(length, hits = 0, id) {
        this.length = length,
        this.hits = hits,
        this.id = id;
    }

    hit() {
        this.hits++;
    }

    isSunk() {
        return this.hits >= this.length;
    }
}