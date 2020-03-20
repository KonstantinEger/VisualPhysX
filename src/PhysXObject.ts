import { Vec2D } from "./utils/Vec2D";
import { UserDrawingContext } from "./UserDrawingContext";

type PhysXObjectParams = {
  pos: Vec2D;
  mass: number;
  draw: (ctx: UserDrawingContext) => void;
  v0?: Vec2D;
  isStatic?: boolean;
  objectData?: any;
}

export class PhysXObject {
  private pos: Vec2D;
  private vel: Vec2D;
  private acc: Vec2D;
  private mass: number;
  private forces: Vec2D[] = [];
  private isStatic: boolean;
  public draw: (ctx: UserDrawingContext) => void;
  public objectData: any;

  constructor(params: PhysXObjectParams) {
    this.pos = params.pos;
    this.vel = params.v0 !== undefined ? params.v0 : new Vec2D([0, 0]);
    this.acc = new Vec2D([0, 0]);
    this.mass = params.mass;
    this.draw = params.draw;
    this.isStatic = params.isStatic !== undefined ? params.isStatic : false;
    this.objectData = params.objectData;
  }

  public applyForce(F: Vec2D): void {
    this.forces.push(F);
  }

  public update(deltaT: number): void {
    if (this.isStatic === true) return;

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