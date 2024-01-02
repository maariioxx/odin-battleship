import { experiments } from 'webpack';
import Ship from '../ship';

test.skip('get correct length from ship with length 3', () => {
  const ship = new Ship(3);
  expect(ship.getLength()).toBe(3);
});
test.skip('get correct length from ship with length 5', () => {
  const ship = new Ship(5);
  expect(ship.getLength()).toBe(5);
});
test.skip('get correct hits from ship', () => {
  const ship = new Ship(3);
  expect(ship.getHits()).toBe(0);
});
test.skip('get correct sunk state from ship', () => {
  const ship = new Ship(3);
  expect(ship.getSunk()).toBe(false);
});
test.skip('hit a ship and change its hits number', () => {
  const ship = new Ship(3);
  ship.hit();
  expect(ship.getHits()).toBe(1);
});
test.skip('hit twice a ship and change its hits number', () => {
  const ship = new Ship(3);
  ship.hit();
  ship.hit();
  expect(ship.getHits()).toBe(2);
});
test.skip('check if a ship is sunk when equal length and hits', () => {
  const ship = new Ship(3);
  ship.hit();
  ship.hit();
  ship.hit();
  expect(ship.isSunk()).toBe(true);
});
