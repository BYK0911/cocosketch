export default function magicWand (imageData: ImageData, px: number, py: number): number[][] {
  const equal = (p1: number[], p2: number[]): boolean => {
    return p1[0] == p2[0] && p1[1] == p2[1] && p1[2] == p2[2] && p1[3] == p2[3]
  }

  const d = imageData.data;
  const w = imageData.width;
  const h = imageData.height;
  const checked = new Set();
  const res = [[px, py]];
  const i = (py * w + px) * 4;
  const p0 = [d[i], d[i + 1], d[i + 2], d[i + 3]];

  const check = (x: number, y: number) => {
    const key = `${x},${y}`
    if (checked.has(key)) return
    checked.add(key);

    const i = (y * w + x) * 4
    if (equal(p0, [d[i], d[i + 1], d[i + 2], d[i + 3]])) {
      res.push([x, y])
    }
  }

  let index = 0
  while (index < res.length) {
    const [x, y] = res[index];
    
    if (y > 0) check(x, y - 1)
    if (x > 0) check(x - 1, y)
    if (x < w - 1) check(x + 1, y)
    if (y < h - 1) check(x, y + 1)
    index++;
  }

  return res;
}