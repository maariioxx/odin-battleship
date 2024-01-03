class Ship {
  constructor(length) {
    this.length = length;
    this.hitNumber = 0;
    this.sunk = false;
  }

  getLength() {
    return this.length;
  }

  getHits() {
    return this.hitNumber;
  }

  getSunk() {
    return this.sunk;
  }

  hit() {
    this.hitNumber += 1;
  }

  isSunk() {
    return this.getLength() === this.getHits();
  }
}

export default Ship;
