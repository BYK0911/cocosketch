import { Layer } from "."

interface PathOption {
  data?: number[],
  size?: number,
  color?: string,
}

export default abstract class Path extends Layer {
  type = 'Path'
  color = '#000'
  size = 1
  data: number[] = []
  
  constructor (option: PathOption) {
    super()

    Object.assign(this, option)
  }

  getData () {
    return {
      type: this.type,
      size: this.size,
      color: this.color,
      data: this.data
    }
  }

  abstract draw (ctx: CanvasRenderingContext2D): void
}