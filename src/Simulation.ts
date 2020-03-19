import { UserDrawingContext } from "./UserDrawingContext";

type UserRenderCallback = (ctx: UserDrawingContext, sim: Simulation) => void;

type SimulationOptions = {
  parentElement: HTMLElement;
  setup: UserRenderCallback;
  update: UserRenderCallback;
  view: {
    xRange: [number, number];
    yRange: [number, number];
  };
};

export class Simulation {
  private parentEL: HTMLElement;
  private canvas: HTMLCanvasElement;
  private ctx: UserDrawingContext;
  private setupCallback: UserRenderCallback;
  private updateCallback: UserRenderCallback;
  private loop: boolean = false;

  constructor(options: SimulationOptions) {
    this.canvas = document.createElement('canvas');
    {
      const ctx = this.canvas.getContext('2d');
      if (ctx === null) throw new Error('Can not get drawing context.');
      this.ctx = new UserDrawingContext(ctx, options.view);
    }
    this.setupCallback = options.setup;
    this.updateCallback = options.update;

    this.parentEL = options.parentElement;
    this.parentEL.appendChild(this.canvas);

    this.setupCallback(this.ctx, this);
    this.update();
  }

  private update(): void {
    if (this.loop === true) {
      // update simulation
      // ...
      // render
      this.updateCallback(this.ctx, this);
    }
    window.requestAnimationFrame(this.update.bind(this));
  }
}