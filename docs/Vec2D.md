# Vec2D
`class`
`src/utils/Vec2D.ts`
`dist/utils/Vec2D.js`

### `constructor` _public_
> Returns a new Vec2D
`(xyValues: [number, number]) => Vec2D`
```js
new Vec2D([3, -2]);
// => Vector x=3 | y=-2
```

### `.x` _public_
> `get` x-coordinate of the vector.
`x: number`

### `.y` _public_
> `get` y-coordinate of the vector.
`y: number`

### `.add()` _public_
> Takes another Vec2D and returns the result of linear combination. The two initial vectors don't get changed.
`(other: Vec2D) => Vec2D`
```js
const a = new Vec2D([2, 3]);
const b = new Vec2D([1, -4]);
const result = a.add(b);
// => Vector x=3 | y=-1
```

### `.scale()` _public_
> Multiply all the values by a factor. The initial vector doesn't get changed.
`(scalar: number) => Vec2D`
```js
const v = new Vec2D([3, -4]);
const scaled = v.scale(3);
// => Vector x=9 | y=-12
```

### `._values` _private_
> Array with length of 2 where x- any y-values are stored
`_values: [number, number]`