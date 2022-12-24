const canvasSketch = require('canvas-sketch')
const { lerp } = require('canvas-sketch-util/math')
const { getSeed } = require('canvas-sketch-util/random')
const random = require('canvas-sketch-util/random')
const palettes = require('nice-color-palettes')

random.setSeed(random.getRandomSeed())

const settings = {
    dimensions: [2048, 2048],
    suffix: random.getSeed(),
}

const sketch = () => {
    const colorCount = random.rangeFloor(2, 6)
    const pickedPalette = random.pick(palettes)
    const shuffledPalette = random.shuffle(pickedPalette)
    const palette = shuffledPalette.slice(0, colorCount)

    const createGrid = () => {
        const points = []
        const count = 30
        for (let x = 0; x < count; x++) {
            for (let y = 0; y < count; y++) {
                // uv space coordinates between 0 and 1
                // dividing by count - 1 to occupy the whole dimension
                // ternary condition to avoid negatives or nan errors
                // 0.5 since in uv coordinates it is the center of the canvas
                const u = count <= 1 ? 0.5 : x / (count - 1)
                const v = count <= 1 ? 0.5 : y / (count - 1)
                // const radius: Math.abs(0.01 + random.gaussian() * 0.01),
                const radius = Math.abs(random.noise2D(u, v)) * 0.3

                points.push({
                    color: random.pick(palette),
                    position: [u, v],
                    rotation: random.noise2D(u, v),
                    radius,
                })
            }
        }
        return points
    }

    // deterministic randomnes, to synchronize sources (video, sensor)
    // random.setSeed(512)
    const points = createGrid().filter((d) => random.value() > 0.5)
    const margin = 100

    return ({ context, width, height }) => {
        // this fills the canvas, since it is not white by default but transparent
        // aka the background
        context.fillStyle = 'white'
        context.fillRect(0, 0, width, height)

        points.forEach(({ position: [u, v], radius, color, rotation }) => {
            // to pixel scale
            // instead of using the whole canvas (x = u * width)
            // we interpolate between the specified margin to give the
            // composition some breathing room
            const x = lerp(margin, width - margin, u)
            const y = lerp(margin, height - margin, v)

            // context.beginPath()
            // context.arc(x, y, radius * width, 0, Math.PI * 2, false)
            // context.fillStyle = color
            // context.fill()
            // context.strokeStyle = 'black'
            // context.lineWidth = 2
            // context.stroke()

            context.save()
            context.fillStyle = color
            context.font = `${radius * width}px "Helvetica"`
            context.translate(x, y)
            context.rotate(rotation)
            context.fillText('-', 0, 0)
            context.restore()
        })
    }
}

canvasSketch(sketch, settings)
