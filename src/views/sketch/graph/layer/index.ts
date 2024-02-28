export interface BoundingBox {
  x: number,
  y: number,
  w: number,
  h: number
}

export abstract class Layer {
  abstract readonly type: string;
  abstract draw (ctx: CanvasRenderingContext2D): void
  abstract getData (): any;
}