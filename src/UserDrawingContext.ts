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

  public setFillStyle(fillstyle: string | CanvasGradient | CanvasPattern): void {
    this.shouldFill = true;
    this.ctx.fillStyle = fillstyle;
  }

  public noFill(): void {
    this.shouldFill = false;
  }

  public setStrokeStyle(strokestyle: string | CanvasGradient | CanvasPattern): void {
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
}
