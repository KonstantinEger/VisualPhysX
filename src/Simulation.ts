import { UserDrawingContext } from "./UserDrawingContext";
import { PhysXObject } from "./objects/PhysXObject";
import { ForceField } from "./objects/ForceField";

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
  private t0: number;
  private currentT: number;
  private began: boolean = false;
  private objects: PhysXObject[] = [];
  private forceFields: ForceField[] = [];

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
    this.t0 = this.prevTime;
    this.currentT = this.prevTime;
    this.setupCallback(this.ctx, this);
    this.update();
  }

  public start(): void {
    this.loop = true;
    this.prevTime = Date.now();
    if (this.began === false) {
      this.t0 = this.prevTime;
      this.began = true;
    }
  }
  public stop(): void { this.loop = false; }

  public size(width: number, height: number): void {
    this.canvas.width = width;
    this.canvas.height = height;
  }

  public getT0(): number {
    return this.t0;
  }

  public getCurrentT(): number {
    return this.currentT;
  }

  public addObject(obj: PhysXObject): void {
    this.objects.push(obj);
  }

  public addForceField(fF: ForceField): void {
    this.forceFields.push(fF);
  }

  private updateSim(): void {
    const newTime = Date.now();
    this.currentT = newTime;
    const deltaT = (newTime - this.prevTime) / 1000;
    this.objects.forEach(obj => {
      this.forceFields.forEach(fField => {
        if (fField.contains([obj.x, obj.y])) obj.applyForce(fField.F());
      })
      obj.update(deltaT);
    });
    this.prevTime = newTime;
  }

  public eachObject(cb: (obj: PhysXObject) => void): void {
    this.objects.forEach(obj => { cb(obj) });
  }

  private update(): void {
    if (this.loop === true) {
      this.updateSim();
      this.updateCallback(this.ctx, this);
    }
    window.requestAnimationFrame(this.update.bind(this));
  }
}
