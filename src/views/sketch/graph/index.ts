import { Layer } from './layer'
import Path from './layer/path'
import initEvent from './event'
import Coord from "./utils/v2"
import Pen from './layer/pen'
import Eraser from './layer/eraser'
import Rasterized from './layer/Rasterized'

export interface GraphData {
  x: number;
  y: number;
  width: number;
  height: number;
  scale: number;
  rotation: number;
  backgroundColor: string;
  layers: Layer[];
}

interface CB {
  (...args: unknown[]): void
}

export default class Graph {
  canvas = document.createElement('canvas')
  canvas2 = document.createElement('canvas')
  canvas3 = document.createElement('canvas')
  ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D
  ctx2 = this.canvas2.getContext('2d') as CanvasRenderingContext2D
  ctx3 = this.canvas3.getContext('2d') as CanvasRenderingContext2D
  x = 0
  y = 0
  width = 200
  height = 200
  scale = 1
  rotation = 0
  backgroundColor = '#fff'
  layers: Layer[] = []
  index = -1
  handlers: Record<string, CB[]> = {}
  activePath: Path | null = null
  animationId: number | null = null

  state = {
    mode: 'pen',
    pen: { size: 1, color: '#000' },
    eraser: { size: 1 }
  }

  constructor () {
    this.canvas.style.background = '#fff'
    initEvent(this)
  }

  mount (dom: HTMLElement): void {
    dom.appendChild(this.canvas)
    const w = dom.offsetWidth
    const h = dom.offsetHeight

    this.resize(w, h)
  }

  createLayer (type: 'Pen' | 'Eraser' | 'Rasterized', data: any) {
    if (type === 'Pen') {
      return new Pen(data)
    } else if (type === 'Eraser') {
      return new Eraser(data)
    } else {
      return new Rasterized(this, data.x, data.y, data.color)
    }
  }

  load (data: GraphData) {
    const { x, y, scale, rotation, width, height, layers, backgroundColor } = data
    this.resize(width, height)
    this.x = x
    this.y = y
    this.rotation = rotation
    this.scale = scale
    this.layers = layers.map(({ type, ...data}) => this.createLayer(type as any, data))
    this.backgroundColor = backgroundColor
    this.index = this.layers.length - 1
    this.flush()
  }

  getData (): GraphData {
    const { x, y, scale, rotation, width, height, layers, backgroundColor } = this
    return { x, y, scale, rotation, width, height, backgroundColor, layers: layers.map(l => l.getData()) }
  }

  resize (w: number, h: number): void {
    this.width = w
    this.height = h
    this.canvas.width =  this.canvas2.width =  this.canvas3.width = w
    this.canvas.height = this.canvas2.height = this.canvas3.height = h
    this.canvas.style.width = this.canvas2.style.width = this.canvas3.style.width = w + 'px'
    this.canvas.style.height = this.canvas2.style.height = this.canvas3.style.height = h + 'px'
    this.flush()
  }

  resetViewport () {
    this.x = this.y = this.rotation = 0;
    this.scale = 1;
  }

  render () {
    if (this.animationId) window.cancelAnimationFrame(this.animationId)
    this.drawFrame()
    this.animationId = window.requestAnimationFrame(() => this.render())
  }

  flush () {
    const { x, y, ctx2, scale, rotation } = this
    const layers = this.layers.slice(0, this.index + 1)
    ctx2.clearRect(0, 0, this.width, this.height)
    ctx2.save()
    ctx2.translate(x, y)
    ctx2.scale(scale, scale)
    ctx2.rotate(rotation)
    this.emit('beforeRender', ctx2)
    layers.forEach(layer => {
      ctx2.save()
      layer.draw(ctx2)
      ctx2.restore()
    })
    ctx2.restore()
  }

  drawFrame (): void {
    const {
      x,
      y,
      scale,
      width,
      height,
      rotation,
      backgroundColor,
      ctx,
      ctx3
    } = this

    ctx3.clearRect(0, 0, width, height)
    ctx3.drawImage(this.canvas2, 0, 0, width, height)
    if (this.activePath) {
      ctx3.save()
      ctx3.translate(x, y)
      ctx3.scale(scale, scale)
      ctx3.rotate(rotation)
      this.activePath.draw(ctx3)
      ctx3.restore()
    }

    ctx.clearRect(0, 0, width, height)
    ctx.fillStyle = backgroundColor
    ctx.fillRect(0, 0, width, height)
    ctx.drawImage(this.canvas3, 0, 0, width, height)
  }

  getRelativeCoord (x: number, y: number): Coord {
    return new Coord(x, y)
      .translate(-this.x, -this.y)
      .scale(1 / this.scale, 1 / this.scale)
      .rotate(-this.rotation)
  }

  on (eventType: string, eventHandler: CB): void {
    if (!this.handlers[eventType]) {
      this.handlers[eventType] = []
    }
    const handlers = this.handlers[eventType]
    handlers.push(eventHandler)
  }

  off (eventType: string, eventHandler?: CB): void {
    if (!this.handlers[eventType]) return
    if (!eventHandler) {
      this.handlers[eventType] = []
      return
    }

    const handlers = this.handlers[eventType]
    const i = handlers.indexOf(eventHandler)

    if (i > -1) handlers.splice(i, 1)
  }

  emit (eventType: string, ...args: unknown[]): void {
    const handlers = this.handlers[eventType]
    if (!handlers || handlers.length === 0) return

    handlers.forEach(cb => cb(...args))
  }

  undo () {
    if (this.index === -1) return
    this.index--
    this.flush()
  }

  redo () {
    if (this.index === this.layers.length - 1) return
    this.index++
    this.flush()
  }

  add (layer: Layer) {
    this.layers = [...this.layers.slice(0, this.index + 1), layer]
    this.index = this.layers.length - 1
    this.flush()
    document.body.appendChild(this.canvas2)
  }

  clear () {
    this.layers = []
    this.index = -1
    this.activePath = null
    this.flush()
  }

  setMode (mode: 'pen' | 'eraser') {
    this.state.mode = mode
  }

  distroy () {
    if (this.animationId) window.cancelAnimationFrame(this.animationId)
  }
}