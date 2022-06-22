const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math')
const random = require('canvas-sketch-util/random')

const settings = {
  dimensions: [ 1080, 1080 ]
};

// const degToRad = degress => degress / 180 * Math.PI
// const randomRange = (min, max) => Math.random() * (max - min) + min

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    context.fillStyle = 'black'

    const cx = width * 0.5
    const cy = height * 0.5
    const w = width * 0.01
    const h = height * 0.1

    let x, y

    const num = 38
    const slice = math.degToRad(360 / num)
    const radius = width * 0.3

    const arccolors = ['#5671d4', '#7ba4dd', '#a5d7e3', '#ffffe0', '#e9adb7', '#c65e81', '#93003a']
    const rectColors = ['#CAF270','#73D487','#30B097','#288993','#41607A','#453B52']
    
    for (let i = 0; i < num; i++) {

      const angle = slice * i

      x = cx + radius * Math.sin(angle)
      y = cy + radius * Math.cos(angle)

      // saving the initial state of the context so we can go back here
      context.save()
  
      context.translate(x, y)
      context.rotate(-angle)
      context.scale(random.range(0.1, 15), random.range(0.3, 0.5))
  
      context.fillStyle = random.pick(rectColors)

      context.beginPath()
      context.rect(
        random.range(0, -w * 0.5), 
        random.range(0, -h * 0.5), 
        random.range(1, w), random.range(1, h)
      )
      context.fill()
  
      // restoring the initial state of the context
      context.restore()

      // another shape
      context.save()
      context.translate(cx, cy)
      context.rotate(-angle)

      context.lineWidth = random.range(3, 12)
      context.strokeStyle = random.pick(rectColors)
  
      context.beginPath()
      context.arc(
        0, random.range(-0.5, 1), 
        radius * random.range(0.1, 1.4), 
        slice * random.range(1, -8), 
        slice * random.range(1, 5)
      )
      context.stroke()
  
      context.restore()
    }
  };
};

canvasSketch(sketch, settings);
