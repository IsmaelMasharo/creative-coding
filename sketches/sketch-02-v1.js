const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math')
const random = require('canvas-sketch-util/random')

const settings = {
  dimensions: [ 1080, 1080 ],
  animate: true
};

const sketch = () => {
  return ({ context, width, height, frame }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    context.fillStyle = 'black'

    const cx = width * 0.5
    const cy = height * 0.5
    const rectW = width * 0.01
    const rectH = height * 0.1

    let rectX, rectY

    const slices = 12
    const sliceAngle = math.degToRad(360 / slices)
    const radius = width * 0.3

    for (let i = 0; i < slices; i++) {

      const angle = sliceAngle * i

      // ----------------------- RECT -----------------------
      rectX = cx + radius * Math.sin(angle)
      rectY = cy + radius * Math.cos(angle)

      // saving the initial state of the context so we can go back here
      context.save()
  
      context.translate(rectX, rectY)
      context.rotate(-angle)

      // ** SCALING WITH NOISE
      const n = random.noise3D(rectX, rectY, frame, 0.01)
      const an = math.mapRange(n, -1, 1, 0, 2 * Math.PI)
      const nn = Math.sin(an)
      context.scale(nn, nn)
      const sign = n < 0 ? 1 : -1
      context.rotate(angle + sign*frame * 0.1)
      // ** 
      
      context.beginPath()
      context.rect(-rectW * 0.5, -rectH * 0.5, rectW, rectH)
      context.fill()
  
      // restoring the initial state of the context
      context.restore()

      // ----------------------- ARC -----------------------
      context.save()
      context.translate(cx, cy)
      context.rotate(-angle)

      context.lineWidth = 2

      context.beginPath()
      context.arc(
        0, 0, // x, y
        radius, // radius
        sliceAngle * -0.3, // startAngle
        sliceAngle * 0.3   // endAngle
      )
      context.stroke()
  
      context.restore()
    }
  };
};

canvasSketch(sketch, settings);
