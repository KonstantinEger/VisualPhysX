import { UserDrawingContext } from "./UserDrawingContext";
import { PhysXObject } from "./PhysXObject";

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
  private prevTime: number;
  private objects: PhysXObject[] = [];

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

    this.prevTime = Date.now();
    this.setupCallback(this.ctx, this);
    this.update();
  }

  public start(): void { this.loop = true; this.prevTime = Date.now(); }
  public stop(): void { this.loop = false; }

  public size(width: number, height: number): void {
    this.canvas.width = width;
    this.canvas.height = height;
  }

  public addObject(obj: PhysXObject): void {
    this.objects.push(obj);
  }

  public updateSim(): void {
    const newTime = Date.now();
    const deltaT = (newTime - this.prevTime) / 1000;
    this.objects.forEach(obj => {
      obj.update(deltaT);
    });
    this.prevTime = newTime;
  }

  public eachObject(cb: (obj: PhysXObject) => void): void {
    this.objects.forEach(obj => { cb(obj) });
  }

  private update(): void {
    if (this.loop === true) {
      this.updateCallback(this.ctx, this);
    }
    window.requestAnimationFrame(this.update.bind(this));
  }
}