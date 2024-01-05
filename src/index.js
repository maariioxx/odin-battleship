import './styles.css';
import Player from './player.js';
import AI from './ai.js';
import { createGrid, displayShips, startGameText, showWinner } from './DOM.js';

createGrid('player');
createGrid('AI');

const Game = () => {
  const player = new Player();
  const ai = new AI();
  let direction = 'v';

  ai.generateAIships();

  const playercells = document.querySelectorAll('.cell.player');
  const aicells = document.querySelectorAll('.cell.AI');

  function AIplays() {
    ai.generateRandomAttack(player);
    displayShips(playercells, player.gameboard.grid, false);
    if (player.gameboard.checkIfAllShipsSunked()) showWinner('AI');
    // MODAL
  }

  playercells.forEach((cell) => {
    cell.addEventListener('mouseover', () => {
      switch (player.gameboard.ships.length) {
        case 0:
          player.placePlayerShips(cell, playercells, 5, direction);
          displayShips(playercells, player.gameboard.grid, false);
          break;
        case 1:
          player.placePlayerShips(cell, playercells, 4, direction);
          break;
        case 2:
          player.placePlayerShips(cell, playercells, 4, direction);
          break;
        case 3:
          player.placePlayerShips(cell, playercells, 3, direction);
          break;
        case 4:
          player.placePlayerShips(cell, playercells, 2, direction);
          break;
        default:
          startGameText();
          break;
      }
    });
  });

  aicells.forEach((cell) => {
    cell.addEventListener(
      'click',
      () => {
        if (
          !(
            player.gameboard.checkIfAllShipsSunked() ||
            ai.gameboard.checkIfAllShipsSunked()
          )
        ) {
          player.attack(ai, Number(cell.dataset.x), Number(cell.dataset.y));
          displayShips(aicells, ai.gameboard.grid, true);
          if (ai.gameboard.checkIfAllShipsSunked()) showWinner('Player');
          // MODAL
          AIplays();
        }
      },
      { once: true }
    );
  });
  document.addEventListener('mousedown', (e) => {
    if (e.buttons === 4 && direction === 'v') direction = 'h';
    else if (e.buttons === 4 && direction === 'h') direction = 'v';
  });
};

Game();
