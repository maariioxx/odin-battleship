/* eslint-disable no-restricted-syntax */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/extensions */
/* eslint-disable class-methods-use-this */
import isEqual from 'lodash/isEqual.js';

import Player from './player.js';

class AI extends Player {
  checkHits(enemy) {
    return enemy.gameboard.hits.concat(enemy.gameboard.missedhits);
  }

  generateRandomAttack(enemy) {
    let attacked = false;
    while (!attacked) {
      const x = Math.floor(Math.random() * 10);
      const y = Math.floor(Math.random() * 10);
      if (this.checkHits(enemy).length > 0) {
        for (const hit of this.checkHits(enemy)) {
          if (!isEqual(hit, [x, y])) {
            enemy.gameboard.receiveAttack(x, y);
            attacked = true;
            break;
          }
        }
      } else {
        enemy.gameboard.receiveAttack(x, y);
        attacked = true;
      }
    }
  }
}

export default AI;
