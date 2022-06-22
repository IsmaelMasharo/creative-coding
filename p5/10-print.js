let x = 0
let y = 0
let spacing = 20
let xoff = 0
let palette = ["005f73","0a9396","94d2bd","e9d8a6","ee9b00","ca6702","bb3e03","ae2012","9b2226"]

function setup() {
  createCanvas(400, 400);
  background(60)
}

function draw() {
  // noStroke()
  let n = noise(xoff, xoff)
  let o = map(n, -1, 1, 0, TWO_PI)
  let color = random(palette)
  stroke('#' + color)
  strokeWeight(5)
  if (abs(n) < 0.5) {
    // fill('#' + color)
    line(x, y + spacing, x + spacing, y)
    // arc(x, y, spacing, spacing , o, -o);
  } else {
    line(x, y, x + spacing, y + spacing)
    // arc(x, y, spacing , spacing, -o, o);
  }
  
  x += spacing
  xoff += 1
  if (x > width) {
    x = 0
    y += spacing
  }
}