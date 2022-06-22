// Remixed by Justin Riley
// Original by Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// https://glitch.com/edit/#!/10print?path=views%2Fsketch.js%3A42%3A5


let x = 0;
let y = 0;
let spacing = 40;
let curvePoint1 = 0.05;
let curvePoint2 = 1 - curvePoint1;
let sineCounter = 0;
let randA, randB, randC; // these random numbers determine the overall pattern

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  angleMode(DEGREES);
  randA = random(5) + 5;
  randB = random(5) + 5;
  randC = random(5) + 5;
}

function draw() {
  background(0);
  stroke(255);
  strokeWeight(5);
  noFill();
  translate(50, 50);
  for (i = 0; i < ceil(width / spacing) * ceil(height / spacing); i++) {
    let x1 = x + spacing * 0.5;
    let y1 = y + spacing;
    let a1x = x + spacing * max(0, curvePoint1);
    let a1y = y + spacing * min(1, curvePoint2);
    let a2x = x + spacing * curvePoint2;
    let a2y = y + spacing * curvePoint1;
    let x2 = x + spacing;
    let y2 = y + spacing * 0.5;
    let a3x = x - spacing * curvePoint1;
    let a3y = y - spacing * curvePoint1;
    let a4x = x - spacing * curvePoint2;
    let a4y = y - spacing * curvePoint2;

    stroke("grey");
    point(x, y);
    point(x + spacing, y + spacing);
    stroke("white");
    point(x1, y1);
    stroke("green");
    point(a1x, a1y);
    stroke("yellow");
    point(a2x, a2y);
    stroke("red");
    point(x2, y2);

    stroke("withe");
    strokeWeight(1);
    if (i % randA < 1) {
      bezier(x1, y1, a1x, a1y, a2x, a2y, x2, y2);
    } else if (i % randB < 2) {
      bezier(x1, y, a2x, a2y, a1x, a1y, x, y2);
    } else if (i % randC < 3) {
      bezier(x, y2, a3x, a1y, a4x, a2y, x - spacing * 0.5, y);
    } else {
      bezier(x1, y, a2x, a3y, a1x, a4y, x, y - spacing * 0.5);
    }
    x = x + spacing;
    if (x > width) {
      x = 0;
      y = y + spacing;
    }
    if (i == 0) break;
  }
  curvePoint1 = Math.sin(sineCounter) / 2; // use sin to bend the curves
  curvePoint2 = 1 - curvePoint1;
  x = 0;
  y = 0;
  sineCounter += 0.05;
  // if(sineCounter > 46){
  //   randA = random(5) +5;
  //   randB = random(5) +5;
  //   randC = random(5) +5;
  //   sineCounter=10;
  // }
  // noLoop()
}
