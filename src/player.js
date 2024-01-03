/* eslint-disable import/extensions */
/* eslint-disable class-methods-use-this */
import Gameboard from './gameboard.js';

class Player {
  constructor() {
    this.gameboard = new Gameboard();
    this.turn = true;
  }

  attack(enemy, x, y) {
    enemy.gameboard.receiveAttack(x, y);
  }
}

export default Player;
