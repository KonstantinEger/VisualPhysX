# PhysXObject or Object
`class`
`src/objects/PhysXObject.ts`
`dist/objects/PhysXObject.js`

> Object which can be simulated with acting forces and velocity.

### `constructor` _public_
> Returns a new PhysXObject.
```ts
PhysXObject(params) => PhysXObject
```
- params
  - `pos`: `Vec2D`; position in 2D space
  - `mass`: `number`; mass of the object
  - `draw()`: `(ctx: UserDrawingContext) => void`; function with drawing instructions
  - `v0`?: `Vec2D`; initial velocity
  - `isStatic`?: `boolean`; if the object should get affected by forces
  - `objectData`?: `any`; data you want to associate with the object

### `.applyForce()` _public_
> Takes a Vec2D as a Force and applies it when `.update()` is called the next time.
```ts
.applyForce(F) => void;
```
- `F`: `Vec2D`; force

### `.update()` _public_
> No need to call; done by the simulation. Applies all the forces and calculates new acceleration, velocity and position.
```ts
.update(deltaT) => void;
```
- `deltaT`: `number`; time which elapsed since the last frame

### `.draw()` _public_
> Called with UserDrawingContext as argument to draw.
```ts
.draw(ctx) => void;
```
- `ctx`: `UserDrawingContext`; drawing context

### `.x` _public_
> `get` x-position of the object.
`x: number`

### `.y` _public_
> `get` y-position of the object.
`y: number`

### `.mass` _public_
> `get` mass of the object.
`mass: number`

### `.objectData` _public_
> Any data associated with that object. Can be changed.
`objectData: any`

### `._pos` _private_
> Position vector.
`_pos: Vec2D`

### `._vel` _private_
> Velocity vector.
`_vel: Vec2D`

### `._acc` _private_
> Acceleration vector.
`_acc: Vec2D`

### `._mass` _private_
> Mass of the object.
`_mass: number`

### `._forces` _private_
> Array of forces which get applied when `.update()` is called the next time.
`_forces: Array<Vec2D>`

### `._isStatic` _private_
> If the object should change its position when updated.
`_isStatic: boolean`
