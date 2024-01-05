const message = document.querySelector('.message');
const grid = document.querySelector('.grid');
const AIgrid = document.querySelector('.aigrid');
const changeDirectionMessage = document.querySelector('.direction-message');

const createGrid = (playerOrAI) => {
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.style.border = '1px solid black';
      cell.dataset.x = j;
      cell.dataset.y = i;
      cell.style.width = '40px';
      cell.style.height = '40px';
      if (playerOrAI === 'player') {
        cell.classList.add('player');
        grid.appendChild(cell);
      } else {
        cell.classList.add('AI');
        AIgrid.appendChild(cell);
      }
    }
  }
};

const displayShips = (DOMgrid, gameboardGrid, AI) => {
  for (let i = 0; i < DOMgrid.length; i++) {
    const { x } = DOMgrid[i].dataset;
    const { y } = DOMgrid[i].dataset;
    if (gameboardGrid[x][y] === 1 && !AI)
      DOMgrid[i].style.backgroundColor = 'lightblue';
    else if (gameboardGrid[x][y] === 2)
      DOMgrid[i].style.backgroundColor = 'red';
    else if (gameboardGrid[x][y] === 4)
      DOMgrid[i].style.backgroundColor = 'gray';
  }
};

const startGameText = () => {
  changeDirectionMessage.remove();
  if (!document.querySelector('.game-message')) {
    const gameStarted = document.createElement('p');
    gameStarted.classList.add('game-message');
    gameStarted.textContent = 'Game started!';
    message.appendChild(gameStarted);
  }
};

const showWinner = (winner) => {
  const gameMessage = document.querySelector('.game-message');
  gameMessage.textContent = `${winner} wins!`;
};

export { createGrid, displayShips, startGameText, showWinner };
