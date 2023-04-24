var game_scene = {
  preload: preload,
  create: create_game,
  update: update_game,
};

var start_time;
var timeText;
var scoreText;
var score;
var timedEvent;
var timeLimit = 3;

var lastCircleX = -9999;
var lastCircleY = -9999

var lastSquareX = -9999;
var lastSquareY = -9999

var gameExitClickTime = null;
var gameExitVerifyTime = 2;


function preload () {
  this.load.setBaseURL('http://labs.phaser.io');
  pointer = this.add.circle(-50, 0, 10, '0xff0000');
  leftPointer = this.add.circle(-50, 0, 10, '0x00ff00');
}


function create_game () {
  width = this.sys.game.canvas.width;
  height = this.sys.game.canvas.height;
  if (timedEvent) {
    timedEvent.remove();
  }
  timedEvent = this.time.addEvent({ delay: 9999999, callback: this.onClockEvent, callbackScope: this, repeat: 1 });

  gameExitButton = this.add.rectangle(75, 50, 100, 50, "0xffffff");
  this.gameExitButtonText = this.add.text(0, 0, "Hover to exit", {
    font: 'bold 15px Arial',
    fill: 'black',
    wordWrap: {width: 600},
    align: "left"
  });
  gameExitButton.setInteractive();
  gameExitButton.on('pointerdown', () => {
    score = 0;
    // collegeName = null;
    // userLocked = false;
    // collegeSelected = false;
    this.scene.start('start_scene');
  });
  gameExitButtonSuper = activateButton(
    gameExitButton,
    this.gameExitButtonText,
    3,
    () => {
      score = 0;
      // other reset stuff...
      //collegeName = null;
      // userLocked = false;
      // collegeSelected = false;
      this.scene.start('start_scene');
    },
    "Hover to exit",
    "Exiting in ",
    '0xffffff',
    '0x808080'
  );
  Phaser.Display.Align.In.Center(this.gameExitButtonText, gameExitButton);

  timeText = this.add.text(300, 50, "",{ fontSize: 24 }).setOrigin(0.5,0.5);
  scoreText = this.add.text(800, 50, "",{ fontSize: 24 }).setOrigin(0.5,0.5);
  score = 0;
}

var shape;
var badShape;
var make_shapes = true;

function update_game () {
  // update timer
  let elapsedTime = timedEvent.getElapsedSeconds();
  let timeLeft = timeLimit - elapsedTime;
  timeText.setText('Time Remaining: ' + Math.floor(timeLeft).toString());
  scoreText.setText('Score: ' + score.toString());

  // randomly generate circle
  if (make_shapes) {
    respawnShape(this);
    make_shapes = false;
  }

  if (hand_x) {
    updatePointer(pointer, width - hand_x, hand_y);
    updatePointer(leftPointer, width - leftHand_x, leftHand_y);

    if (shape.radius && (Phaser.Geom.Intersects.CircleToCircle(pointer, shape) || Phaser.Geom.Intersects.CircleToCircle(leftPointer, shape))) {
      console.log('TOUCHDOWN');
      score += 100;
      respawnShape(this);
    }

    if (shape.radius && (circleOnRect(pointer, badShape) || circleOnRect(leftPointer, shape))) {
      console.log('OOPS');
      score -= 100;
      respawnShape(this);
    }
  }

  if (timeLeft <= 0) {
    this.scene.start('gameover_scene');
  }
  checkInactive(elapsedTime, this);
}

function updatePointer(p, x, y) {
  p.x = x;
  p.y = y;
}

function respawnShape(game) {
  if (shape) {
    shape.destroy();
  };
  if (badShape) {
    badShape.destroy();
  }

  let x = Phaser.Math.Between(50, width-50);
  let y = Phaser.Math.Between(250, height-250);
  while (distance(x,y,lastCircleX,lastCircleY) < 200
    || distance(x,y, lastSquareX, lastSquareY) < 200)
  {
    x = Phaser.Math.Between(50, width-50);
    y = Phaser.Math.Between(250, height-250);
  }
  lastShapeX = x;
  lastShapeY = y;

  const size = 50 * kinectScaleFactor;
  let circleColor = new Phaser.Display.Color();
  circleColor = circleColor.random();
  circleColor = Phaser.Display.Color.GetColor32(circleColor["r"], circleColor["g"], circleColor["b"], circleColor["a"]);
  shape = game.add.circle(x, y, size, circleColor);
  shape.setInteractive();
  //testing
  shape.on('pointerdown', function (shape) {
    score += 100
    respawnShape(game)
  });

  let x1 = Phaser.Math.Between(50, width-50);
  let y1 = Phaser.Math.Between(250, height-250);
  while (distance(x1,y1, lastCircleX,lastCircleY) < 200
      || distance(x1,y1, lastSquareX, lastSquareY) < 200
      || distance(x1,y1,x,y) < 200)
  {
    x1 = Phaser.Math.Between(50, width-50);
    y1 = Phaser.Math.Between(250, height-250);
  }
  lastSquareX = x1;
  lastSquareY = y1;

  badShape = game.add.rectangle(x1, y1, size, size, circleColor);
  badShape.setInteractive();
  //testing
  badShape.on('pointerdown', function (shape) {
    score -= 100;
    respawnShape(game);
  });
}