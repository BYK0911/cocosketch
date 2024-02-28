import Path from "./path"

export default class Pen extends Path {
  readonly type = 'Pen'
  draw (ctx: CanvasRenderingContext2D): void {
    const { size, color, data } = this
    if (data.length === 2) {
      ctx.beginPath()
      ctx.arc(data[0], data[1], size / 2, 0, Math.PI * 2)
      ctx.closePath()
      ctx.fillStyle = color
      ctx.fill()
    } else {
      ctx.beginPath()
      ctx.moveTo(data[0], data[1])
      for (let i = 2; i < data.length; i += 2) {
        ctx.lineTo(data[i], data[i + 1])
      }
      ctx.strokeStyle = color
      ctx.lineWidth = size
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      ctx.stroke()
      ctx.closePath()
    }
  }
}