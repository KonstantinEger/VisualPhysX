// @ts-check
const { map } = require('../../dist/index');

test('test utils/functions map()', () => {
  const x = 10;
  expect(map(x, 0, 20, 0, 2)).toBe(1);
  expect(map(x, 0, 100, 0, 1)).toEqual(1 / 10);
});