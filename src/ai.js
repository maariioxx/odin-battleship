/* eslint-disable no-restricted-syntax */

import isEqual from 'lodash/isEqual.js';
import Ship from './ship.js';
import Player from './player.js';

class AI extends Player {
  checkHits(enemy) {
    return enemy.gameboard.hits.concat(enemy.gameboard.missedhits);
  }

  generateRandomShip(length) {
    let equal = false;
    const x = Math.floor(Math.random() * 10);
    const y = Math.floor(Math.random() * 10);
    let d = Math.floor(Math.random() * 2);
    const coordinates = [];
    if (d === 0) {
      d = 'v';
      for (let i = y; i < length + y; i++) {
        coordinates.push([x, i]);
      }
    } else {
      d = 'h';
      for (let i = x; i < length + x; i++) {
        coordinates.push([i, y]);
      }
    }
    for (const ship of this.gameboard.ships) {
      for (const c of ship.coordinates) {
        for (const coordinate of coordinates) {
          if (isEqual(coordinate, c)) equal = true;
        }
      }
    }
    if (!equal) {
      this.gameboard.placeShip(new Ship(length), x, y, d);
      return true;
    }
  }

  generateAIships() {
    let aiship5 = false;
    let aiship41 = false;
    let aiship42 = false;
    let aiship3 = false;
    let aiship2 = false;
    while (!aiship5) {
      this.generateRandomShip(5);
      if (this.gameboard.ships.length === 1) aiship5 = true;
    }
    while (!aiship41) {
      this.generateRandomShip(4);
      if (this.gameboard.ships.length === 2) aiship41 = true;
    }
    while (!aiship42) {
      this.generateRandomShip(4);
      if (this.gameboard.ships.length === 3) aiship42 = true;
    }
    while (!aiship3) {
      this.generateRandomShip(3);
      if (this.gameboard.ships.length === 4) aiship3 = true;
    }
    while (!aiship2) {
      this.generateRandomShip(2);
      if (this.gameboard.ships.length === 5) aiship2 = true;
    }
  }

  generateRandomAttack(enemy) {
    let attacked = false;
    while (!attacked) {
      const x = Math.floor(Math.random() * 10);
      const y = Math.floor(Math.random() * 10);
      const hits = this.checkHits(enemy);
      let equal = false;
      if (hits.length > 0) {
        for (const hit of hits) {
          if (isEqual(hit, [x, y])) {
            equal = true;
          }
        }
      }
      if (hits.length === 0 || !equal) {
        enemy.gameboard.receiveAttack(x, y);
        attacked = true;
      }
    }
  }
}

export default AI;
