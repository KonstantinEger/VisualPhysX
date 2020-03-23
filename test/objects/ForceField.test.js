// @ts-check
const { ForceField } = require('../../dist/index');
const { Vec2D } = require('../../dist/index');
const { PhysXObject } = require('../../dist/objects/PhysXObject');

test('.contains()', () => {
  const field = new ForceField({
    x: -3, y: -3, width: 3, height: 3,
    force: () => new Vec2D([0, 0])
  });

  expect(field.contains([-2, -2])).toBe(true);
  expect(field.contains([-3, -3])).toBe(true);
  expect(field.contains([-4, 0])).toBe(false);
});

test('.getForceOnObject()', () => {
  const field = new ForceField({
    x: -3, y: -3, width: 3, height: 3,
    force: (obj) => new Vec2D([3, -9.81]).scale(obj.mass)
  });
  const object = new PhysXObject({
    pos: new Vec2D([-2, -2]),
    mass: 2,
    draw() { }
  });

  const force = field.getForceOnObject(object);
  expect(force.x).toEqual(6);
  expect(force.y).toEqual(-19.62);
});