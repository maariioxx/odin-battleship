/* eslint-disable import/prefer-default-export */
/* eslint-disable no-undef */
const grid = document.querySelector('.grid');
const AIgrid = document.querySelector('.aigrid');

export const createGrid = (playerOrAI) => {
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.style.border = '1px solid black';
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
