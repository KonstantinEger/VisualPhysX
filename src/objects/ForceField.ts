import { Vec2D } from "../utils/Vec2D";
import { UserDrawingContext } from "../UserDrawingContext";

type ForceFieldParams = {
  x: number;
  y: number;
  width: number;
  height: number;
  force: Vec2D;
}

export class ForceField {
  private x: number;
  private y: number;
  private w: number;
  private h: number
  private force: Vec2D;

  constructor(params: ForceFieldParams) {
    this.x = params.x;
    this.y = params.y;
    this.w = params.width;
    this.h = params.height;
    this.force = params.force;
  }

  public contains(point: [number, number]): boolean {
    const x = point[0];
    const y = point[1];

    if (
      x >= this.x && x <= this.x + this.w &&
      y >= this.y && y <= this.y + this.h
    ) {
      return true
    } else return false;
  }

  public draw(ctx: UserDrawingContext, color?: string | CanvasGradient | CanvasPattern): void {
    ctx.noFill();
    ctx.stroke(color === undefined ? 'red' : color);
    ctx.rect(this.x, this.y, this.w, this.h);
  }

  public F(): Vec2D { return this.force; }
}