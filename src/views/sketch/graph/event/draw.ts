import Graph from ".."
import Pen from '../layer/pen'
import Eraser from '../layer/eraser'
import Path from '../layer/path'

let path: Path | null = null;
let moved = false;
const offsetY = 45;

export default function (graph: Graph): void {
  graph.on('touchstart', e => {
    const ev = e as TouchEvent
    if (ev.touches.length === 1) {
      if (graph.state.mode === 'pen') {
        path = new Pen({ size: graph.state.pen.size, color: graph.state.pen.color })
      } else {
        path = new Eraser({ size: graph.state.eraser.size })
      }
      const c = graph.getRelativeCoord(ev.touches[0].pageX, ev.touches[0].pageY - offsetY)
      path.data.push(c.x, c.y)
    }
  })

  graph.on('touchmove', e => {
    const ev = e as TouchEvent
    if (ev.touches.length === 1) {
      if (path) {
        const c = graph.getRelativeCoord(ev.touches[0].pageX, ev.touches[0].pageY - offsetY)
        path.data.push(c.x, c.y)
        if (!moved) {
          graph.activePath = path
          moved = true
        }
      }
    }
  })

  graph.on('touchend', () => {
    if (moved) graph.add(path as Path)
    moved = false;
    graph.activePath = path = null
  })
}