const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random')
const math = require('canvas-sketch-util/math')
const Tweakpane = require('tweakpane')

const settings = {
  dimensions: [ 1080, 1080 ],
  animate: true
};

const params = {
  cols: 3,
  rows: 10,
  scaleMin: 1,
  scaleMax: 30,
  freq: 0.006,
  amp: 0.3,
  frame: 0,
  animate: true,
  lineCap: 'round'
}

const sketch = () => {
  // Animation occures by USING A CONSTANTLY UPDATED VARIABLE: frame
  return ({ context, width, height, frame }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    const cols = params.cols
    const rows = params.rows
    const numCells = cols * rows

    const gridw = width * 0.8
    const gridh = height * 0.8
    const cellw = gridw / cols
    const cellh = gridh / rows
    const margx = (width - gridw) * 0.5
    const margy = (height - gridh) * 0.5

    for (let i = 0; i < numCells; i++) {
      const col = i % cols
      const row = Math.floor(i / cols)

      const x = col * cellw
      const y = row * cellh
      const w = cellw * 0.8
      const h = cellh * 0.8

      // togling animation
      const f = params.animate ? frame : params.frame

      // using frame argument to animate
      const n = random.noise3D(x, y, f * 10, params.freq)
      // when using noise2D the movement seems like being from left to right, that's because were using the updated variable
      // frame in the context of the x position. Using noise 3d gives a more organic pattern.
      // const n = random.noise2D(x + frame * 10, y, params.freq) // from -1 to 1
      const angle = n * Math.PI * params.amp
      const scale = math.mapRange(n, -1, 1, params.scaleMin, params.scaleMax) // from 1 to 30 or using the params range: ;

      context.save()

      context.translate(x, y) // top left of the cell
      context.translate(margx, margy) // considering margins
      context.translate(cellw * 0.5, cellh * 0.5) // centering in the cell with respect of the previous translation position
      context.rotate(angle)

      context.lineWidth = scale
      context.lineCap = params.lineCap

      context.beginPath()
      context.moveTo(w * -0.5, 0)
      context.lineTo(w * 0.5, 0)
      context.stroke()

      context.restore()
    }
  };
};

const createPane = () => {
  const pane = new Tweakpane.Pane()
  let folder

  folder = pane.addFolder({ title: 'Grid' })
  folder.addInput(params, 'lineCap', { options: { butt: 'butt', round: 'round', square: 'square' }})
  folder.addInput(params, 'cols', { min: 2, max: 50, step: 1})
  folder.addInput(params, 'rows', { min: 2, max: 50, step: 1})
  folder.addInput(params, 'scaleMin', { min: 1, max: 100 })
  folder.addInput(params, 'scaleMax', { min: 1, max: 100 })

  folder = pane.addFolder({ title: 'Noise' })
  folder.addInput(params, 'freq', { min: -0.01, max: 0.01})
  folder.addInput(params, 'amp', { min: 0, max: 1})
  folder.addInput(params, 'animate')
  folder.addInput(params, 'frame', { min: 0, max: 999})

}

createPane()
canvasSketch(sketch, settings);
