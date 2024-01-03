/* eslint-disable no-undef */
import Player from '../player';
import AI from '../ai';
import Ship from '../ship';

describe('game between player and AI', () => {
  const player = new Player();
  const ai = new AI();
  describe('correctly placed ships', () => {
    const ship1 = new Ship(5);
    player.gameboard.placeShip(ship1, 5, 2);
    const ship2 = new Ship(4);
    player.gameboard.placeShip(ship2, 7, 5);
    const ship3 = new Ship(3);
    player.gameboard.placeShip(ship3, 1, 4);
    const aiship1 = new Ship(5);
    ai.gameboard.placeShip(aiship1, 3, 4);
    const aiship2 = new Ship(4);
    ai.gameboard.placeShip(aiship2, 8, 2);
    const aiship3 = new Ship(2);
    ai.gameboard.placeShip(aiship3, 6, 3);
    test('player ships', () => {
      expect(player.gameboard.ships).toEqual([
        {
          ship: ship1,
          coordinates: [
            [5, 2],
            [5, 3],
            [5, 4],
            [5, 5],
            [5, 6],
          ],
        },
        {
          ship: ship2,
          coordinates: [
            [7, 5],
            [7, 6],
            [7, 7],
            [7, 8],
          ],
        },
        {
          ship: ship3,
          coordinates: [
            [1, 4],
            [1, 5],
            [1, 6],
          ],
        },
      ]);
    });
    test('AI ships', () => {
      expect(ai.gameboard.ships).toEqual([
        {
          ship: aiship1,
          coordinates: [
            [3, 4],
            [3, 5],
            [3, 6],
            [3, 7],
            [3, 8],
          ],
        },
        {
          ship: aiship2,
          coordinates: [
            [8, 2],
            [8, 3],
            [8, 4],
            [8, 5],
          ],
        },
        {
          ship: aiship3,
          coordinates: [
            [6, 3],
            [6, 4],
          ],
        },
      ]);
    });
    describe('correct hits between player and AI', () => {
      player.attack(ai, 8, 3);
      ai.generateRandomAttack(player);
      test('AI hits array is correct', () => {
        expect(ai.gameboard.hits).toEqual([[8, 3]]);
      });
      test('AI grid receive hit', () => {
        expect(ai.gameboard.grid[8][3]).toBe(2);
      });
      test('AI ship to receive hit', () => {
        expect(ai.gameboard.ships[1].ship.hitNumber).toBe(1);
      });
      test('Player receive hit', () => {
        expect(
          player.gameboard.hits.length > 0 ||
            player.gameboard.missedhits.length > 0
        ).toBeTruthy();
      });
    });
  });
});
