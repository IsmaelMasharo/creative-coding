const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [ 1080, 1080 ]
};

let manager

let text = 'A'
let fontSize = 1200
let fontFamily = 'serif'

const typeCanvas = document.createElement('canvas')
const typeContext = typeCanvas.getContext('2d')

const sketch = ({ context, width, height }) => {
  // squared pixel
  // number of pixels of the type canvas with reference to the main canvas
  // for every 20 pixels in the main canvas we're going to have 1 relative pixel in the type canvas
  const cell = 20
  
  // number of splits in the correspondent direction of the main canvas
  const cols = Math.floor(width / cell) // 54
  const rows = Math.floor(height / cell)

  // total number of relative pixels in the type canvas
  const numCells = cols * rows

  // the splits in the main canvas will act as the number of
  // relative pixels in the type canvas (to act like a zoom) 
  typeCanvas.width = cols
  typeCanvas.height = rows

  return ({ context, width, height }) => {
    typeContext.fillStyle = 'black';
    typeContext.fillRect(0, 0, cols, rows);

    fontSize = cols

    typeContext.fillStyle = 'white'
    typeContext.font = `${fontSize}px ${fontFamily}`
    typeContext.textBaseline = 'top'
    // typeContext.textAlign = 'center'

    const metrics = typeContext.measureText(text)
    const mx = metrics.actualBoundingBoxLeft * -1
    const my = metrics.actualBoundingBoxAscent * -1
    const mw = metrics.actualBoundingBoxLeft + metrics.actualBoundingBoxRight
    const mh = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent

    const tx = (cols - mw) * 0.5 - mx
    const ty = (rows - mh) * 0.5 - my

    typeContext.save()

    typeContext.translate(tx, ty)

    typeContext.beginPath()
    typeContext.rect(mx, my, mw, mh)
    typeContext.stroke()

    typeContext.fillText(text, 0, 0)

    typeContext.restore()

    // getting all rgba channels from image
    // every 4 consecutive values correspond to each cell r,g,b,a values
    const typeData = typeContext.getImageData(0, 0, cols, rows).data

    // drawing in the main context
    context.drawImage(typeCanvas, 0, 0)

    // canvas is a bitmap and a bitmap is a grid, so: traversing it:
    for (let i = 0; i < numCells; i++) {
      const col = i % cols
      const row = Math.floor(i / cols)

      const x = col * cell
      const y = row * cell

      // using HERE the type canvas to access the actual painted image color values
      // every 4 consecutive values correspond to each cell r,g,b,a values
      const r = typeData[i * 4 + 0]
      const g = typeData[i * 4 + 1]
      const b = typeData[i * 4 + 2]
      const a = typeData[i * 4 + 3]

      // this technique is different from scaling up an image because
      // now we can actually add more content in each pixel
      // for example using circles instead of squares for every "pixel"

      context.fillStyle = `rgb(${r}, ${g}, ${b})`

      context.save()

      context.translate(x, y)
      context.translate(cell * 0.5, cell * 0.5)

      // context.fillRect(0, 0, cell, cell)
      context.beginPath()
      context.arc(0, 0, cell / 2, 0, Math.PI * 2)
      context.fill()

      context.restore()
    }
  };
};

const onKeyUp = (e) => {
  text = e.key
  manager.render()
}

document.addEventListener('keyup', onKeyUp)

const start = async () => {
  manager = await canvasSketch(sketch, settings);
}

start()

/*
const url = 'https://picsum.photos/200'

const loadMeSomeImage = url => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = () => reject()
    img.src = url
  })
}

const start = async () => {
  const img = await loadMeSomeImage(url)
  console.log(img.width)
}

// const start = () => {
//   loadMeSomeImage(url).then(img => {
//     console.log(img.width)
//   })
// }

start()
*/