import { Vec2D } from "../utils/Vec2D";
import { UserDrawingContext } from "../UserDrawingContext";

type PhysXObjectParams = {
  pos: Vec2D;
  mass: number;
  draw: (ctx: UserDrawingContext) => void;
  v0?: Vec2D;
  isStatic?: boolean;
  objectData?: any;
}

export class PhysXObject {
  private _pos: Vec2D;
  private _vel: Vec2D;
  private _acc: Vec2D;
  private _mass: number;
  private _forces: Vec2D[] = [];
  private _isStatic: boolean;
  public draw: (ctx: UserDrawingContext) => void;
  public objectData: any;

  constructor(params: PhysXObjectParams) {
    this._pos = params.pos;
    this._vel = params.v0 !== undefined ? params.v0 : new Vec2D([0, 0]);
    this._acc = new Vec2D([0, 0]);
    this._mass = params.mass;
    this.draw = params.draw;
    this._isStatic = params.isStatic !== undefined ? params.isStatic : false;
    this.objectData = params.objectData;
  }

  public applyForce(F: Vec2D): void {
    this._forces.push(F);
  }

  public update(deltaT: number): void {
    if (this._isStatic === true) return;

    this._acc = this._acc.scale(0);
    this._forces = this._forces.filter(F => {
      const a = new Vec2D([F.x / this._mass, F.y / this._mass]);
      this._acc = this._acc.add(a);
      return false;
    });
    // v=a*t+v0
    const vel = this._acc.scale(deltaT).add(this._vel);
    // s=(a/2)*t^2+v0*t+s0
    const pos = this._acc
      .scale(1 / 2)
      .scale(Math.pow(deltaT, 2))
      .add(this._vel.scale(deltaT))
      .add(this._pos);
    this._vel = vel;
    this._pos = pos;
  }

  public get x(): number {
    return this._pos.x;
  }

  public get y(): number {
    return this._pos.y;
  }

  public get mass(): number {
    return this._mass;
  }
}