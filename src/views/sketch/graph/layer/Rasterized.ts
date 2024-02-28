import { Layer } from "."
import Graph from ".."
import magicWand from "../utils/magicWand"
import getRGBA from "../utils/getRGBA"

export default class Rasterized extends Layer {
  type = 'Rasterized'
  x = 0
  y = 0
  color = '#fff'
  graph: Graph
  rasterized: {
    x: number;
    y: number;
    width: number;
    height: number;
    rotation: number;
    canvas: HTMLCanvasElement
  } | null = null

  constructor (graph: Graph, x: number, y: number, color: string) {
    super()
    this.graph = graph
    this.x = x
    this.y = y
    this.color = color
  }

  getData () {
    return {
      type: this.type,
      x: this.x,
      y: this.y,
      color: this.color
    }
  }

  draw (ctx: CanvasRenderingContext2D): void {
    if (!this.rasterized) {
      const { graph, color, x, y } = this
      const { r, g, b, a } = getRGBA(color)
      const imageData = graph.ctx2.getImageData(0, 0, graph.width, graph.height)
      const res = magicWand(imageData, x, y)
      let x0 = res[0][0]
      let y0 = res[0][1]
      let x1 = x0
      let y1 = y0
      res.forEach(([_x, _y]) => {
        if (_x < x0) x0 = _x
        if (_y < y0) y0 = _y
        if (_x > x1) x1 = _x
        if (_y > y1) y1 = _y
      })
      const canvas = document.createElement('canvas')
      const width = Math.floor(x1 - x0) + 1
      const height = Math.floor(y1 - y0) + 1
      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
      const _imageData = ctx.createImageData(width, height)
      res.forEach(([px, py]) => {
        const i = (px - x0 + (py - y0) * width) * 4
        _imageData.data[i] = r
        _imageData.data[i + 1] = g
        _imageData.data[i + 2] = b
        _imageData.data[i + 3] = a
      })
      ctx.putImageData(_imageData, 0, 0)
      const v = graph.getRelativeCoord(x0, y0)
      const w = Math.round(width / graph.scale)
      const h = Math.round(height / graph.scale)
      this.rasterized = {
        x: v.x,
        y: v.y,
        width: w,
        height: h,
        rotation: -graph.rotation,
        canvas
      }
    }

    const { x, y, width, height, rotation, canvas } = this.rasterized
    ctx.translate(x, y)
    ctx.rotate(rotation)
    ctx.drawImage(canvas, 0, 0, width, height)
  }
}