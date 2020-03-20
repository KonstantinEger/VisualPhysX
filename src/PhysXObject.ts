import { Vec2D } from "./utils/Vec2D";
import { UserDrawingContext } from "./UserDrawingContext";

type PhysXObjectParams = {
  pos: Vec2D;
  mass: number;
  draw: (ctx: UserDrawingContext) => void;
  v0?: Vec2D;
}

export class PhysXObject {
  private pos: Vec2D;
  private vel: Vec2D;
  private acc: Vec2D;
  private mass: number;
  private forces: Vec2D[] = [];
  public draw: (ctx: UserDrawingContext) => void;

  constructor(params: PhysXObjectParams) {
    this.pos = params.pos;
    this.vel = params.v0 !== undefined ? params.v0 : new Vec2D([0, 0]);
    this.acc = new Vec2D([0, 0]);
    this.mass = params.mass;
    this.draw = params.draw;
  }

  public applyForce(F: Vec2D): void {
    this.forces.push(F);
  }

  public update(deltaT: number): void {
    this.acc = this.acc.scale(0);
    this.forces = this.forces.filter(F => {
      const a = new Vec2D([F.x / this.mass, F.y / this.mass]);
      this.acc = this.acc.add(a);
      return false;
    });
    this.vel = this.vel.add(this.acc.scale(deltaT));
    this.pos = this.pos.add(this.vel.scale(deltaT));
  }
}