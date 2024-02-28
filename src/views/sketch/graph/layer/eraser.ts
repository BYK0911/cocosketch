import Path from "./path"

export default class Eraser extends Path {
  readonly type = 'Eraser'
  draw (ctx: CanvasRenderingContext2D): void {
    const { size, data } = this
    if (data.length < 4) return
  
    ctx.globalCompositeOperation = 'destination-out'
    ctx.beginPath()
    ctx.moveTo(data[0], data[1])
    for (let i = 2; i < data.length; i += 2) {
      ctx.lineTo(data[i], data[i + 1])
    }
    ctx.strokeStyle = `#000`
    ctx.lineWidth = size
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.stroke()
    ctx.closePath()
  }
}