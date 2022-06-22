const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math')

const settings = {
  dimensions: [ 1080, 1080 ]
};

const sketch = () => {
  return ({ context, width, height }) => {
    // in case of animation this 2 lines "clear" the canvas
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
