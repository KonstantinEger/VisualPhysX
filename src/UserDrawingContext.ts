import { map } from "./utils/functions";

type ViewOject = {
  xRange: [number, number];
  yRange: [number, number];
};

type DrawModes = "PIX" | "COORD";

export class UserDrawingContext {
  private _ctx: CanvasRenderingContext2D;
  private _view: ViewOject;
  private _shouldFill: boolean = false;
  private _shouldStroke: boolean = false;

  constructor(ctx: CanvasRenderingContext2D, view: ViewOject) {
    this._ctx = ctx;
    this._view = view;
  }

  private _colorIn(): void {
    if (this._shouldFill === true) this._ctx.fill();
    if (this._shouldStroke === true) this._ctx.stroke();
  }

  public fill(fillstyle: string | CanvasGradient | CanvasPattern): void {
    this._shouldFill = true;
    this._ctx.fillStyle = fillstyle;
  }

  public noFill(): void {
    this._shouldFill = false;
  }

  public stroke(strokestyle: string | CanvasGradient | CanvasPattern): void {
    this._shouldStroke = true;
    this._ctx.strokeStyle = strokestyle;
  }

  public noStroke(): void {
    this._shouldStroke = false;
  }

  public rect(x: number, y: number, width: number, height: number, drawMode: DrawModes = "COORD"): void {
    this._ctx.beginPath();
    if (drawMode === "COORD") {
      const realX = map(x, this._view.xRange[0], this._view.xRange[1], 0, this._ctx.canvas.width);
      const realY = map(y, this._view.yRange[0], this._view.yRange[1], this._ctx.canvas.height, 0);
      const realWidth = (width * this._ctx.canvas.width) / (this._view.xRange[1] - this._view.xRange[0]);
      const realHeight = (height * this._ctx.canvas.height) / (this._view.yRange[0] - this._view.yRange[1]);
      this._ctx.rect(realX, realY, realWidth, realHeight);
    } else if (drawMode === "PIX") {
      this._ctx.rect(x, y, width, height);
    }
    this._colorIn();
    this._ctx.closePath();
  }

  public circle(x: number, y: number, r: number, drawMode: DrawModes = "COORD"): void {
    this._ctx.beginPath();
    if (drawMode === "COORD") {
      const realX = map(x, this._view.xRange[0], this._view.xRange[1], 0, this._ctx.canvas.width);
      const realY = map(y, this._view.yRange[0], this._view.yRange[1], this._ctx.canvas.height, 0);
      const realRx = (r * this._ctx.canvas.width) / (this._view.xRange[1] - this._view.xRange[0]);
      const realRy = (r * this._ctx.canvas.height) / (this._view.yRange[1] - this._view.yRange[0]);
      this._ctx.ellipse(realX, realY, realRx, realRy, 0, 0, 2 * Math.PI);
    } else if (drawMode === "PIX") {
      this._ctx.ellipse(x, y, r, r, 0, 0, 2 * Math.PI);
    }
    this._colorIn();
    this._ctx.closePath();
  }

  public coord(): void {
    const sSBefore = this._ctx.strokeStyle;
    for (let x = this._view.xRange[0]; x <= this._view.xRange[1]; x++) {
      this._ctx.strokeStyle = x === 0 ? 'red' : 'grey';
      const realX = map(x, this._view.xRange[0], this._view.xRange[1], 0, this._ctx.canvas.width);
      this._ctx.beginPath();
      this._ctx.moveTo(realX, 0);
      this._ctx.lineTo(realX, this._ctx.canvas.height);
      this._ctx.stroke();
      this._ctx.closePath();
    }
    for (let y = this._view.yRange[0]; y <= this._view.yRange[1]; y++) {
      this._ctx.strokeStyle = y === 0 ? 'red' : 'grey';
      const realY = map(y, this._view.yRange[1], this._view.yRange[0], 0, this._ctx.canvas.height);
      this._ctx.beginPath();
      this._ctx.moveTo(0, realY);
      this._ctx.lineTo(this._ctx.canvas.width, realY);
      this._ctx.stroke();
      this._ctx.closePath();
    }
    this._ctx.strokeStyle = sSBefore;
  }
}
