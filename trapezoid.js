const canvasSketch = require('canvas-sketch');
const { lerp } = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');
const palettes = require('nice-color-palettes');

const settings = {
  dimensions: [ 2048, 2048 ]
};

const margin = 100;
const palette = random.pick(palettes);

const sketch = () => {
  const createTops = () => {
    const count = 20;
    const points = [];
    for (let i = 0; i < count; i++) {
      const from = { u: random.value(), v: random.value() };
      const to = { u: random.value(), v: random.value() };
      const max = (from.v + to.v) / 2;

      points.push({
        from,
        to,
        max
      });
    }

    return points;
  };

  const points = createTops().sort((a, b) => a.max - b.max);

  return ({ context, width, height }) => {
    console.log(points);
    points.forEach(({ from, to }) => {
      const x1 = lerp(margin, width - margin, from.u);
      const y1 = lerp(margin, height - margin, from.v);

      const x2 = lerp(margin, width - margin, to.u);
      const y2 = lerp(margin, height - margin, to.v);

      context.fillStyle = random.pick(palette);;
      context.strokeStyle = 'white';
      context.lineWidth = width / 100;
      context.beginPath();
      context.moveTo(x1, y1);
      context.lineTo(x2, y2);
      context.lineTo(x2, height - margin);
      context.lineTo(x1, height - margin);
      context.closePath();
      context.fill();
      context.stroke();
    });
  };
};

canvasSketch(sketch, settings);
