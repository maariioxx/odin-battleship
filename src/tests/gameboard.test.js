import Gameboard from '../gameboard';
import Ship from '../ship';

describe('gameboard', () => {
  const gameboard = new Gameboard();
  test('grid has 10 rows', () => {
    expect(gameboard.grid.length).toBe(10);
  });
  test('every row has 10 columns', () => {
    const length10 = true;
    gameboard.grid.forEach((r) => {
      if (r.length !== 10) length10 = false;
    });
    expect(length10).toBe(true);
  });
  describe('place 3 length ship', () => {
    const newShip = new Ship(3);
    test.skip('place it in 3rd row, 2nd column, horizontal', () => {
      gameboard.placeShip(newShip, 2, 1);
      expect(gameboard.grid[2]).toEqual([0, 1, 1, 1, 0, 0, 0, 0, 0, 0]);
    });
    test.skip('updated ships list', () => {
      expect(gameboard.ships).toEqual([{ ship: newShip, x: 2, y: 1 }]);
    });
  });
  describe('place 4 length ship', () => {
    const newShip = new Ship(4);
    test('place it in 6th row, 4th column, horizontal', () => {
      gameboard.placeShip(newShip, 5, 3);
      expect(gameboard.grid[5]).toEqual([0, 0, 0, 1, 1, 1, 1, 0, 0, 0]);
    });
    test('updated ships list', () => {
      expect(gameboard.ships).toEqual([{ ship: newShip, x: 5, y: 3 }]);
    });
    test('hit the ship and return hits number', () => {
      expect(gameboard.receiveAttack(5, 3)).toBe(1);
    });
  });
});
