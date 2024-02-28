import Graph from ".."
import Rasterized from '../layer/Rasterized'

let x: number, y: number

export default function (graph: Graph): void {
  graph.on('drop', e => {
    const ev = e as { x: number, y: number }
    x = Math.floor(ev.x)
    y = Math.floor(ev.y - graph.canvas.offsetTop)
    
    const layer = new Rasterized(graph, x, y, graph.state.pen.color)
    graph.add(layer)
  })
}