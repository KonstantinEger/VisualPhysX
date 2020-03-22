import { Vec2D } from "../utils/Vec2D";
import { UserDrawingContext } from "../UserDrawingContext";
import { PhysXObject } from "./PhysXObject";

type ForceFieldParams = {
  x: number;
  y: number;
  width: number;
  height: number;
  force: (obj: PhysXObject) => Vec2D;
}

export class ForceField {
  private _x: number;
  private _y: number;
  private _w: number;
  private _h: number
  private _force: (obj: PhysXObject) => Vec2D;

  constructor(params: ForceFieldParams) {
    this._x = params.x;
    this._y = params.y;
    this._w = params.width;
    this._h = params.height;
    this._force = params.force;
  }

  public contains(point: [number, number]): boolean {
    const x = point[0];
    const y = point[1];

    if (
      x >= this._x && x <= this._x + this._w &&
      y >= this._y && y <= this._y + this._h
    ) {
      return true
    } else return false;
  }

  public draw(ctx: UserDrawingContext, color?: string | CanvasGradient | CanvasPattern): void {
    ctx.noFill();
    ctx.stroke(color === undefined ? 'red' : color);
    ctx.rect(this._x, this._y, this._w, this._h);
  }

  public F(obj: PhysXObject): Vec2D { return this._force(obj); }
}