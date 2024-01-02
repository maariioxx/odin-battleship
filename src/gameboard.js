import Ship from './ship.js';

class Gameboard {
  constructor() {
    this.grid = Array(10)
      .fill(0)
      .map(() => Array(10).fill(0));
    this.ships = [];
    this.hits = [];
  }

  placeShip(ship, x, y) {
    if (ship.length + y > 9) return false;
    for (let i = y; i < ship.length + y; i++) {
      this.grid[x][i] = 1;
    }
    this.ships.push({
      ship: ship,
      x: x,
      y: y,
    });
  }

  checkShipList(x, y) {
    for (const [key, value] of Object.entries(this.ships)) {
      if (value.x === x && value.y === y) return value.ship;
    }
  }

  receiveAttack(x, y) {
    if (this.grid[x][y] === 0) {
      this.hits.push([x, y]);
      return false;
    } else if (this.grid[x][y] === 2) {
      return false;
    } else {
      this.hits.push([x, y]);
      const hitShip = this.checkShipList(x, y);
      hitShip.hitNumber += 1;
      hitShip.isSunk();
      return hitShip.hitNumber;
    }
  }
}

const gameboard = new Gameboard();
const ship = new Ship(4);
gameboard.placeShip(ship, 5, 3);
console.log(gameboard.receiveAttack(5, 3));
export default Gameboard;
