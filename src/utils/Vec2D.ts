export class Vec2D {
  private values: [number, number];

  constructor(values: [number, number]) {
    this.values = values;
  }

  public get x(): number {
    return this.values[0];
  }

  public get y(): number {
    return this.values[1];
  }

  public scale(scalar: number): Vec2D {
    return new Vec2D([this.x * scalar, this.y * scalar]);
  }

  public add(other: Vec2D): Vec2D {
    return new Vec2D([this.x + other.x, this.y + other.y]);
  }
}