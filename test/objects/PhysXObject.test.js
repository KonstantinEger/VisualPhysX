// @ts-check
const { PhysXObject } = require('../../dist/objects/PhysXObject');
const { Vec2D } = require('../../dist/utils/Vec2D');

test('initial velocity', () => {
  const obj = new PhysXObject({
    pos: new Vec2D([20, 35]),
    mass: 3,
    v0: new Vec2D([2, -3]),
    draw() { }
  });

  obj.update(1);
  expect(obj.x).toBe(22);
  expect(obj.y).toBe(32);

  obj.update(3);
  expect(obj.x).toBe(28);
  expect(obj.y).toBe(23);
});

test('accelerated movement', () => {
  let obj = new PhysXObject({
    pos: new Vec2D([0, 0]),
    mass: 3,
    draw() { }
  });
  const force = new Vec2D([2, -3]);

  obj.applyForce(force);
  obj.update(3);
  expect(obj.x).toBe(3);
  expect(obj.y).toEqual(-4.5);

  obj = new PhysXObject({
    pos: new Vec2D([0, 0]),
    mass: 3,
    draw() { }
  });

  // same thing spread out
  obj.applyForce(force);
  obj.update(1);
  obj.applyForce(force);
  obj.update(1);
  obj.applyForce(force);
  obj.update(1);
  expect(obj.x).toBe(3);
  expect(obj.y).toEqual(-4.5);
})