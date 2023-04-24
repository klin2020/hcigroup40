var game_scene = {
  preload: preload,
  create: create_game,
  update: update_game,
};

var score;
var timeLimit = 30;

var lastCircleX = -9999;
var lastCircleY = -9999

var lastSquareX = -9999;
var lastSquareY = -9999

function create_game () {
  width = this.sys.game.canvas.width;
  height = this.sys.game.canvas.height;

  if (timedEvent) {
    timedEvent.remove();
  }
  timedEvent = this.time.addEvent({ delay: 9999999, callback: this.onClockEvent, callbackScope: this, repeat: 1 });
  this.gameExitButton = this.add.rectangle(75, 50, 100, 50, "0xffffff");
  this.gameExitButtonText = this.add.text(0, 0, "Hover to exit", mediumText);
  Phaser.Display.Align.In.Center(this.gameExitButtonText, gameExitButton);
  this.gameExitButtonSuper = activateButton(
    gameExitButton,
    this.gameExitButtonText,
    3,
    () => {
      score = 0;
      // other reset stuff...
      //collegeName = null;
      // userLocked = false;
      // collegeSelected = false;
      timedEvent.remove();
      this.scene.start('start_scene');
    },
    "Hover to exit",
    "Exiting in ",
    '0xffffff',
    '0x808080'
  );

  this.timeText = this.add.text(300, 50, "",{ fontSize: 24 }).setOrigin(0.5,0.5);
  this.scoreText = this.add.text(800, 50, "",{ fontSize: 24 }).setOrigin(0.5,0.5);
  this.helpText = this.add.text(width/2, height - scale(100), "Hit the circles! Avoid the squares!").setOrigin(0.5,0.5)
  this.expText = this.add.text(width/2, height - scale(50), "Boom").setOrigin(0.5,0.5);
  score = 0;
  this.shape = null;
  this.badShape = null;
  respawnShape(this);
  initializePointers(this);
  this.gameExitButton
}


function update_game () {
  console.log('update');
  // update timer
  let elapsedTime = timedEvent.getElapsedSeconds();
  let timeLeft = timeLimit - elapsedTime;
  this.timeText.setText('Time Remaining: ' + Math.ceil(timeLeft).toString());
  this.scoreText.setText('Score: ' + score.toString());

  if (hand_x) {
    updatePointer(pointer, width - hand_x, hand_y);
    updatePointer(leftPointer, width - leftHand_x, leftHand_y);

    if (this.shape.radius && (Phaser.Geom.Intersects.CircleToCircle(pointer, this.shape) || Phaser.Geom.Intersects.CircleToCircle(leftPointer, this.shape))) {
      console.log('TOUCHDOWN');
      score += 100;
      respawnShape(this);
      this.expText.setText("Nice! +100")
      this.expText.setColor("0x00ff00")
    }

    if (this.shape.radius && (circleOnRect(pointer, this.badShape) || circleOnRect(leftPointer, this.shape))) {
      console.log('OOPS');
      score -= 100;
      respawnShape(this);
      this.expText.setText("Oh No! -100")
      this.expText.setColor('0xff0000')
    }
  }

  if (timeLeft <= 0) {
    this.scene.start('gameover_scene');
  }
  checkInactive(elapsedTime, this);
  this.gameExitButtonSuper.update();
}

function updatePointer(p, x, y) {
  p.x = x;
  p.y = y;
}

function respawnShape(game) {
  if (game.shape) {
    game.shape.destroy();
  };
  if (game.badShape) {
    game.badShape.destroy();
  }

  let x = Phaser.Math.Between(50, width-50);
  let y = Phaser.Math.Between(250, height-250);
  while (distance(x,y,lastCircleX,lastCircleY) < scale(100)
    || distance(x,y, lastSquareX, lastSquareY) < scale(100))
  {
    console.log('generating');
    x = Phaser.Math.Between(50, width-50);
    y = Phaser.Math.Between(250, height-scale(150));
  }
  lastShapeX = x;
  lastShapeY = y;

  const size = scale(50);
  let circleColor = new Phaser.Display.Color();
  circleColor = circleColor.random();
  circleColor = Phaser.Display.Color.GetColor32(circleColor["r"], circleColor["g"], circleColor["b"], circleColor["a"]);
  game.shape = game.add.circle(x, y, size, circleColor);
  game.shape.setInteractive();
  //testing
  game.shape.on('pointerdown', function () {
    score += 100
    respawnShape(game)
    game.expText.setText("Nice! +100")
    // game.expText.setColor("0x00ff00")
  });

  let x1 = Phaser.Math.Between(50, width-50);
  let y1 = Phaser.Math.Between(250, height-250);
  while (distance(x1,y1, lastCircleX,lastCircleY) < scale(100)
      || distance(x1,y1, lastSquareX, lastSquareY) < scale(100)
      || distance(x1,y1,x,y) < scale(200))
  {
    console.log('generating');
    x1 = Phaser.Math.Between(50, width-50);
    y1 = Phaser.Math.Between(250, height-scale(150));
  }
  lastSquareX = x1;
  lastSquareY = y1;

  game.badShape = game.add.rectangle(x1, y1, size, size, circleColor);
  game.badShape.setInteractive();
  //testing
  game.badShape.on('pointerdown', function () {
    score -= 100;
    respawnShape(game);
    game.expText.setText("Oh No! -100")
    // game.expText.setColor('0xff0000')
  });
}