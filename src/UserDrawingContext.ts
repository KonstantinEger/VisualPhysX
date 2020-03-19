import { map } from "./utils/functions";

type ViewOject = {
  xRange: [number, number];
  yRange: [number, number];
};

type DrawModes = "PIX" | "COORD";

export class UserDrawingContext {
  private ctx: CanvasRenderingContext2D;
  private view: ViewOject;
  private shouldFill: boolean = false;
  private shouldStroke: boolean = false;

  constructor(ctx: CanvasRenderingContext2D, view: ViewOject) {
    this.ctx = ctx;
    this.view = view;
  }

  private colorIn(): void {
    if (this.shouldFill === true) this.ctx.fill();
    if (this.shouldStroke === true) this.ctx.stroke();
  }

  public fill(fillstyle: string | CanvasGradient | CanvasPattern): void {
    this.shouldFill = true;
    this.ctx.fillStyle = fillstyle;
  }

  public noFill(): void {
    this.shouldFill = false;
  }

  public stroke(strokestyle: string | CanvasGradient | CanvasPattern): void {
    this.shouldStroke = true;
    this.ctx.strokeStyle = strokestyle;
  }

  public noStroke(): void {
    this.shouldStroke = false;
  }

  public rect(x: number, y: number, width: number, height: number, drawMode: DrawModes = "COORD"): void {
    this.ctx.beginPath();
    if (drawMode === "COORD") {
      const realX = map(x, this.view.xRange[0], this.view.xRange[1], 0, this.ctx.canvas.width);
      const realY = map(y, this.view.yRange[0], this.view.yRange[1], this.ctx.canvas.height, 0);
      const realWidth = (width * this.ctx.canvas.width) / (this.view.xRange[1] - this.view.xRange[0]);
      const realHeight = (height * this.ctx.canvas.height) / (this.view.yRange[0] - this.view.yRange[1]);
      this.ctx.rect(realX, realY, realWidth, realHeight);
    } else if (drawMode === "PIX") {
      this.ctx.rect(x, y, width, height);
    }
    this.colorIn();
    this.ctx.closePath();
  }

  public circle(x: number, y: number, r: number, drawMode: DrawModes = "COORD"): void {
    this.ctx.beginPath();
    if (drawMode === "COORD") {
      const realX = map(x, this.view.xRange[0], this.view.xRange[1], 0, this.ctx.canvas.width);
      const realY = map(y, this.view.yRange[0], this.view.yRange[1], this.ctx.canvas.height, 0);
      const realRx = (r * this.ctx.canvas.width) / (this.view.xRange[1] - this.view.xRange[0]);
      const realRy = (r * this.ctx.canvas.height) / (this.view.yRange[1] - this.view.yRange[0]);
      this.ctx.ellipse(realX, realY, realRx, realRy, 0, 0, 2 * Math.PI);
    } else if (drawMode === "PIX") {
      this.ctx.ellipse(x, y, r, r, 0, 0, 2 * Math.PI);
    }
    this.colorIn();
    this.ctx.closePath();
  }

  public coord(): void {
    const sSBefore = this.ctx.strokeStyle;
    for (let x = this.view.xRange[0]; x <= this.view.xRange[1]; x++) {
      this.ctx.strokeStyle = x === 0 ? 'red' : 'grey';
      const realX = map(x, this.view.xRange[0], this.view.xRange[1], 0, this.ctx.canvas.width);
      this.ctx.beginPath();
      this.ctx.moveTo(realX, 0);
      this.ctx.lineTo(realX, this.ctx.canvas.height);
      this.ctx.stroke();
      this.ctx.closePath();
    }
    for (let y = this.view.yRange[0]; y <= this.view.yRange[1]; y++) {
      this.ctx.strokeStyle = y === 0 ? 'red' : 'grey';
      const realY = map(y, this.view.yRange[0], this.view.yRange[1], 0, this.ctx.canvas.height);
      this.ctx.beginPath();
      this.ctx.moveTo(0, realY);
      this.ctx.lineTo(this.ctx.canvas.width, realY);
      this.ctx.stroke();
      this.ctx.closePath();
    }
    this.ctx.strokeStyle = sSBefore;
  }
}
