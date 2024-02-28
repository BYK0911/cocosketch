import Graph from "..";
import panzoom from "./panzoom";
import draw from "./draw";
import buket from "./buket";

export default function (graph: Graph): void {
  const touchstart = (e: TouchEvent): void => {
    graph.emit('touchstart', e)
  }
  const touchmove = (e: TouchEvent): void => {
    e.preventDefault()
    graph.emit('touchmove', e)
  }
  const touchend = (e: TouchEvent): void => {
    graph.emit('touchend', e)
  }
  graph.canvas.addEventListener('touchstart', touchstart)
  graph.canvas.addEventListener('touchmove', touchmove)
  graph.canvas.addEventListener('touchend', touchend)

  draw(graph)
  panzoom(graph)
  buket(graph)
}