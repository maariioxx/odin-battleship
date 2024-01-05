import Gameboard from './gameboard.js';
import Ship from './ship.js';

class Player {
  constructor() {
    this.gameboard = new Gameboard();
  }

  attack(enemy, x, y) {
    enemy.gameboard.receiveAttack(x, y);
  }

  placePlayerShips(cell, playercells, length, d) {
    if (d === 'v') {
      for (
        let i = cell.dataset.y;
        i - cell.dataset.y < length && cell.dataset.y < 11 - length;
        i++
      ) {
        playercells[Number(`${i}${cell.dataset.x}`)].style.backgroundColor =
          'lightblue';
        cell.addEventListener('mouseleave', () => {
          for (
            let j = cell.dataset.y;
            j - cell.dataset.y < length && cell.dataset.y < 11 - length;
            j++
          ) {
            if (this.gameboard.grid[cell.dataset.x][j] === 0)
              playercells[
                Number(`${j}${cell.dataset.x}`)
              ].style.backgroundColor = `#161616`;
          }
        });
      }
      cell.addEventListener('click', () => {
        this.gameboard.placeShip(
          new Ship(length),
          Number(cell.dataset.x),
          Number(cell.dataset.y),
          'v'
        );
      });
    } else {
      for (
        let i = cell.dataset.x;
        i - cell.dataset.x < length && cell.dataset.x < 11 - length;
        i++
      ) {
        playercells[Number(`${cell.dataset.y}${i}`)].style.backgroundColor =
          'lightblue';
        cell.addEventListener('mouseleave', () => {
          for (
            let j = cell.dataset.x;
            j - cell.dataset.x < length && cell.dataset.x < 11 - length;
            j++
          ) {
            if (this.gameboard.grid[j][cell.dataset.y] === 0)
              playercells[
                Number(`${cell.dataset.y}${j}`)
              ].style.backgroundColor = 'white';
          }
        });
      }
      cell.addEventListener('click', () => {
        this.gameboard.placeShip(
          new Ship(length),
          Number(cell.dataset.x),
          Number(cell.dataset.y),
          'h'
        );
      });
    }
  }
}

export default Player;
