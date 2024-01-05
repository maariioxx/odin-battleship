import isEqual from 'lodash/isEqual.js';

class Gameboard {
  constructor() {
    this.grid = Array(10)
      .fill(0)
      .map(() => Array(10).fill(0));
    this.ships = [];
    this.hits = [];
    this.missedhits = [];
    this.sunkShips = 0;
  }

  establishShipCoordinates(length, x, y, d) {
    const coordinates = [];
    switch (d) {
      case 'v':
        for (let i = y; i < length + y && i < 9; i++) {
          coordinates.push([x, i]);
        }
        break;
      case 'h':
        for (let i = x; i < length + x && i < 9; i++) {
          coordinates.push([i, y]);
        }
        break;
      default:
        break;
    }

    return coordinates;
  }

  placeShip(ship, x, y, d) {
    switch (d) {
      case 'v':
        if (ship.length + y > 9) return false;
        for (let i = y; i < ship.length + y; i++) {
          this.grid[x][i] = 1;
        }
        break;
      case 'h':
        if (ship.length + x > 9) return false;
        for (let i = x; i < ship.length + x; i++) {
          this.grid[i][y] = 1;
        }
        break;
      default:
        return false;
    }
    this.ships.push({
      ship,
      coordinates: this.establishShipCoordinates(ship.length, x, y, d),
    });
  }

  checkShipList(x, y) {
    let equal;
    Object.values(this.ships).forEach((value) => {
      value.coordinates.forEach((c) => {
        if (isEqual(c, [x, y])) equal = value.ship;
      });
    });
    return equal;
  }

  checkIfAllShipsSunked() {
    return this.ships.length === this.sunkShips;
  }

  receiveAttack(x, y) {
    if (this.grid[x][y] === 0) {
      this.missedhits.push([Number(x), Number(y)]);
      this.grid[x][y] = 4;
    } else if (this.grid[x][y] === 2) {
      return false;
    } else {
      this.hits.push([x, y]);
      const hitShip = this.checkShipList(x, y);
      hitShip.hitNumber += 1;
      this.grid[x][y] = 2;
      if (hitShip.isSunk()) {
        this.sunkShips += 1;
        hitShip.sunk = true;
      }
    }
  }
}

export default Gameboard;
