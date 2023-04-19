// modifying after having copied from sketch.js
//

let timeLimit = 90; // limit in seconds
let startTime;
let scoreElem;
let timer;

function setup() {
  let canvas = createCanvas(windowWidth/2, windowHeight);
  canvas.parent("canvas-container");
  frameRate(3);
  stroke(255);
  strokeWeight(10);

  startTime = millis(); // TODO: figure out what to do with nav bar; may need to move

  timer = createDiv('NA');
  timer.parent('nav-bar');
  timer.id = 'timer'

  scoreElem = createDiv('Score = 0');
  scoreElem.style = ('color', '#ffffff');
  scoreElem.parent("nav-bar");
  scoreElem.id = 'score';
}

function draw() {
  background('#69cceb');
  updateTime();
}

function updateTime() {
  const currentTime = (millis() - startTime) / 1000;
  const timeLeft = timeLimit - floor(currentTime);
  timer.html('Time Left: ' + max(0, timeLeft));

  if (timeLeft < 0) {
    gameOver();
  }
}

function gameOver() {
  // gameover
  text('Game Over', width/2, height/2);
}
