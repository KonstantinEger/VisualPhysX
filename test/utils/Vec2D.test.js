// @ts-check
const { Vec2D } = require('../../dist/index');

test('create a new Vec2D', () => {
  const vec = new Vec2D([20, 35]);
  expect(vec.x).toBe(20);
  expect(vec.y).toBe(35);
});

test('vector addition', () => {
  const vec1 = new Vec2D([20, 35]);
  const vec2 = new Vec2D([3, -6]);
  const vecSum = vec1.add(vec2);
  expect(vecSum.x).toBe(23);
  expect(vecSum.y).toBe(29);
  expect(vec1.x).toBe(20);
  expect(vec1.y).toBe(35);
});

test('vector scaling', () => {
  const original = new Vec2D([1, -2]);
  const scaledBy3 = original.scale(3);
  expect(scaledBy3.x).toBe(3);
  expect(scaledBy3.y).toBe(-6);
  expect(original.x).toBe(1);
  expect(original.y).toBe(-2);
});
