/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable class-methods-use-this */
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

  establishShipCoordinates(length, x, y) {
    const coordinates = [];
    for (let i = y; i < length + y && i < 9; i++) {
      coordinates.push([x, i]);
    }
    return coordinates;
  }

  placeShip(ship, x, y) {
    if (ship.length + y > 9) return false;
    for (let i = y; i < ship.length + y; i++) {
      this.grid[x][i] = 1;
    }
    this.ships.push({
      ship,
      coordinates: this.establishShipCoordinates(ship.length, x, y),
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
      this.missedhits.push([x, y]);
      return false;
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
      if (this.checkIfAllShipsSunked()) return 'All ships sunked';
      return hitShip.hitNumber;
    }
  }
}

export default Gameboard;
