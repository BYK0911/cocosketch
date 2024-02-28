export default class Coord {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  matrix(
    a: number,
    b: number,
    c: number,
    d: number,
    e: number,
    f: number
  ): Coord {
    const x = this.x;
    const y = this.y;
    this.x = a * x + b * y + c;
    this.y = d * x + e * y + f;

    return this;
  }

  translate(dx: number, dy: number): Coord {
    this.x += dx;
    this.y += dy;

    return this;
  }

  move(dx: number, dy: number): Coord {
    return this.translate(dx, dy);
  }

  rotate(a: number): Coord {
    const c = Math.cos(a);
    const s = Math.sin(a);

    this.matrix(c, -s, 0, s, c, 0);

    return this;
  }

  scale(kx: number, ky: number): Coord {
    this.x *= kx;
    this.y *= ky;
    return this;
  }

  skewX(angle: number): Coord {
    angle = (angle / 180) * Math.PI;
    const tan = Math.tan(angle);
    return this.matrix(1, tan, 0, 0, 1, 0);
  }

  skewY(angle: number): Coord {
    angle = (angle / 180) * Math.PI;
    const tan = Math.tan(angle);
    return this.matrix(1, 0, 0, tan, 1, 0);
  }

  norm(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  normalVector(): Coord {
    const n = this.norm();
    return n === 0 ? this : new Coord(this.y / n, -this.x / n);
  }

  unit(): Coord {
    const n = this.norm();
    return n === 0 ? this : new Coord(this.x / n, this.y / n);
  }

  angle (x = 1, y = 0): number {
    const n = this.norm()
    const n2 = Math.sqrt(x * x + y * y);
    if (n * n2 === 0) return 0
    const d = this.dot(x, y);
    const cos = Math.max(-1, Math.min(1, d / n / n2))
    
    return Math.acos(cos);
  }

  // 向量内积
  dot(x: number, y: number): number {

    return this.x * x + this.y * y;
  }

  // 向量外积
  cross(x: number, y: number): number {
    return this.x * y - this.y * x;
  }

  flip(x0: number, y0: number, x1: number, y1: number): Coord {
    const { x, y } = this;
    const [m, n] = [x - x0, y - y0];
    const [p, q] = [x1 - x0, y1 - y0];
    if (p !== 0 || q !== 0){
      const d = p * p + q * q;
      this.x = (m * (p * p - q * q) + 2 * n * p * q) / d + x0;
      this.y = (n * (q * q - p * p) + 2 * m * p * q) / d + y0;
    }
    return this;
  }
}
