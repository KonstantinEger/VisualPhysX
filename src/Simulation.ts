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
  private _parentEL: HTMLElement;
  private _canvas: HTMLCanvasElement;
  private _ctx: UserDrawingContext;
  private _setupCallback: UserRenderCallback;
  private _updateCallback: UserRenderCallback;
  private _loop: boolean = false;
  private _prevTime: number;
  private _t0: number;
  private _currentT: number;
  private _began: boolean = false;
  private _objects: PhysXObject[] = [];
  private _forceFields: ForceField[] = [];

  constructor(options: SimulationOptions) {
    this._canvas = document.createElement('canvas');
    {
      const ctx = this._canvas.getContext('2d');
      if (ctx === null) throw new Error('Can not get drawing context.');
      this._ctx = new UserDrawingContext(ctx, options.view);
    }
    this._setupCallback = options.setup;
    this._updateCallback = options.update;

    this._parentEL = options.parentElement;
    this._parentEL.appendChild(this._canvas);

    this._prevTime = Date.now();
    this._t0 = this._prevTime;
    this._currentT = this._prevTime;
    this._setupCallback(this._ctx, this);
    this._update();
  }

  public start(): void {
    this._loop = true;
    this._prevTime = Date.now();
    if (this._began === false) {
      this._t0 = this._prevTime;
      this._began = true;
    }
  }
  public stop(): void { this._loop = false; }

  public size(width: number, height: number): void {
    this._canvas.width = width;
    this._canvas.height = height;
  }

  public getT0(): number {
    return this._t0;
  }

  public getCurrentT(): number {
    return this._currentT;
  }

  public addObject(obj: PhysXObject): void {
    this._objects.push(obj);
  }

  public addForceField(fF: ForceField): void {
    this._forceFields.push(fF);
  }

  public eachObject(cb: (obj: PhysXObject) => void): void {
    this._objects.forEach(obj => { cb(obj) });
  }

  private _update(): void {
    if (this._loop === true) {
      const newTime = Date.now();
      this._currentT = newTime;
      const deltaT = (newTime - this._prevTime) / 1000;
      this._objects.forEach(obj => {
        this._forceFields.forEach(fField => {
          if (fField.contains([obj.x, obj.y])) {
            const force = fField.getForceOnObject(obj);
            obj.applyForce(force);
          }
        });
        obj.update(deltaT);
      });
      this._prevTime = newTime;

      this._updateCallback(this._ctx, this);
    }
    window.requestAnimationFrame(this._update.bind(this));
  }
}
