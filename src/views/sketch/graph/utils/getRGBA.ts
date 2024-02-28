const cvs = document.createElement('canvas')
const ctx = cvs.getContext('2d') as CanvasRenderingContext2D
export default function (color: string) {
  ctx.fillStyle = color
  ctx.fillRect(0, 0, 1, 1)
  const data = ctx.getImageData(0, 0, 1, 1).data
  return {
    r: data[0],
    g: data[1],
    b: data[2],
    a: data[3]
  }
}