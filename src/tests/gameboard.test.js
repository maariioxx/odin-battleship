/* eslint-disable no-undef */
import Gameboard from '../gameboard';
import Ship from '../ship';

describe('gameboard', () => {
  const gameboard = new Gameboard();
  test('grid has 10 rows', () => {
    expect(gameboard.grid.length).toBe(10);
  });
  test('every row has 10 columns', () => {
    let length10 = true;
    gameboard.grid.forEach((r) => {
      if (r.length !== 10) length10 = false;
    });
    expect(length10).toBe(true);
  });
  describe('place 3 length ship', () => {
    const newShip = new Ship(3);
    test('place it in 3rd row, 2nd column, horizontal', () => {
      gameboard.placeShip(newShip, 2, 1);
      expect(gameboard.grid[2]).toEqual([0, 1, 1, 1, 0, 0, 0, 0, 0, 0]);
    });
    test('updated ships list', () => {
      expect(gameboard.ships).toEqual([
        {
          ship: newShip,
          coordinates: [
            [2, 1],
            [2, 2],
            [2, 3],
          ],
        },
      ]);
    });
  });
  describe('place 4 length ship', () => {
    const newShip = new Ship(4);
    test('place it in 6th row, 4th column, horizontal', () => {
      gameboard.placeShip(newShip, 5, 3);
      expect(gameboard.grid[5]).toEqual([0, 0, 0, 1, 1, 1, 1, 0, 0, 0]);
    });
    test('updated ships list', () => {
      expect(gameboard.ships).toEqual([
        {
          ship: newShip,
          coordinates: [
            [5, 3],
            [5, 4],
            [5, 5],
            [5, 6],
          ],
        },
      ]);
    });
    test('hit the ship and return ship hits number', () => {
      expect(gameboard.receiveAttack(5, 3)).toBe(1);
    });
    test('check hits list', () => {
      expect(gameboard.hits).toEqual([[5, 3]]);
    });
    test('check some missed hits', () => {
      gameboard.receiveAttack(2, 5);
      gameboard.receiveAttack(6, 2);
      gameboard.receiveAttack(1, 4);
      expect(gameboard.missedhits).toEqual([
        [2, 5],
        [6, 2],
        [1, 4],
      ]);
    });
    test('check if ship sunks', () => {
      gameboard.receiveAttack(5, 4);
      gameboard.receiveAttack(5, 5);
      expect(gameboard.receiveAttack(5, 6)).toBe('All ships sunked');
    });
  });
});
