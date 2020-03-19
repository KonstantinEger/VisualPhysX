type ViewOject = {
  xRange: [number, number];
  yRange: [number, number];
};

export class UserDrawingContext {
  private ctx: CanvasRenderingContext2D;
  private view: ViewOject;

  constructor(ctx: CanvasRenderingContext2D, view: ViewOject) {
    this.ctx = ctx;
    this.view = view;
  }
}