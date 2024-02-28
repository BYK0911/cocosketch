import Graph from ".."
import Coord from '../utils/v2'

let x0: number, x1: number, y0: number, y1: number;

export default function (cvs: Graph): void {
  cvs.on('touchstart', e => {
    const ev = e as TouchEvent
    if (ev.touches.length === 2) {
      x0 = ev.touches[0].pageX
      y0 = ev.touches[0].pageY
      x1 = ev.touches[1].pageX
      y1 = ev.touches[1].pageY
    }
  })

  cvs.on('touchmove', e => {
    const ev = e as TouchEvent
    if (ev.touches.length === 2) {
      const _x0 = ev.touches[0].pageX
      const _y0 = ev.touches[0].pageY
      const _x1 = ev.touches[1].pageX
      const _y1 = ev.touches[1].pageY
      const v = new Coord(x1 - x0, y1 - y0)
      const _v = new Coord(_x1 - _x0, _y1 - _y0)
      const ang = v.angle(_v.x, _v.y)
      const angle = v.cross(_v.x, _v.y) > 0 ? ang : -ang
      const k = _v.norm() / v.norm()
      const c0 = cvs.getRelativeCoord((x0 + x1) / 2, (y0 + y1) / 2)
      
      cvs.rotation += angle
      cvs.scale *= k
      // cvs.scale = Math.min(5, Math.max(0.1, cvs.scale * k))
      c0.rotate(cvs.rotation)
        .scale(cvs.scale, cvs.scale)
      const c1 = new Coord((_x0 + _x1) / 2, (_y0 + _y1) / 2).move(-c0.x, -c0.y)
      cvs.x = c1.x
      cvs.y = c1.y

      x0 = _x0
      x1 = _x1
      y0 = _y0
      y1 = _y1
    }
  })
}