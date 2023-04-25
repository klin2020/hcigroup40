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
  this.exitButtonSuper = makeExitButton(this);

  this.timeText = this.add.text(width/2, scale(50), "",{ fontSize: scale(24) }).setOrigin(0.5,0.5);
  this.scoreText = this.add.text(scale(800), scale(50), "",{ fontSize: scale(24) }).setOrigin(0.5,0.5);
  this.helpText = this.add.text(width/2, height - scale(60), "Hit the circles! Avoid the squares!", {fontSize: scale(15)}).setOrigin(0.5,0.5)
  this.expText = this.add.text(width/2, height - scale(30), "", {fontSize: scale(15)}).setOrigin(0.5,0.5);
  score = 0;
  this.shape = null;
  this.badShape = null;
  respawnShape(this);
  initializePointers(this);
}


function update_game () {
  updatePointers();
  // update timer
  let elapsedTime = timedEvent.getElapsedSeconds();
  let timeLeft = timeLimit - elapsedTime;
  this.timeText.setText('Time Remaining: ' + Math.ceil(timeLeft).toString());
  this.scoreText.setText('Score: ' + score.toString());

  if (hand_x && this.shape.radius) {
    if ((Phaser.Geom.Intersects.CircleToCircle(pointer, this.shape) || Phaser.Geom.Intersects.CircleToCircle(leftPointer, this.shape))) {
      console.log('TOUCHDOWN');
      score += 100;
      respawnShape(this);
      this.expText.setText("Nice! +100")
      this.expText.setColor("#00ff00")
    }

    if (circleOnRect(pointer, this.badShape) || circleOnRect(leftPointer, this.badShape)) {
      console.log('OOPS');
      if (score >= 100) {
        score -= 100;
      }
      respawnShape(this);
      this.expText.setText("Oh No! -100")
      this.expText.setColor("#ff0000")
    }
  }

  if (timeLeft <= 0) {
    this.scene.start('gameover_scene');
  }
  checkInactive(elapsedTime, this);
  this.exitButtonSuper.update();
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

  let x = Phaser.Math.Between(scale(50), width-scale(50));
  let y = Phaser.Math.Between(scale(125), height-scale(125));
  while (distance(x,y,lastCircleX,lastCircleY) < scale(100)
    || distance(x,y, lastSquareX, lastSquareY) < scale(100))
  {
    console.log('generating');
    x = Phaser.Math.Between(scale(50), width-scale(50));
    y = Phaser.Math.Between(scale(125), height-scale(125));
  }
  lastShapeX = x;
  lastShapeY = y;

  const size = scale(50);
  const badSize = scale(75);
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
    game.expText.setColor("#00ff00")
  });

  let x1 = Phaser.Math.Between(scale(50), width-scale(50));
  let y1 = Phaser.Math.Between(scale(125), height-scale(125));
  while (distance(x1,y1, lastCircleX,lastCircleY) < scale(100)
      || distance(x1,y1, lastSquareX, lastSquareY) < scale(100)
      || distance(x1,y1,x,y) < scale(200))
  {
    console.log('generating');
    x1 = Phaser.Math.Between(scale(50), width-scale(50));
    y1 = Phaser.Math.Between(scale(125), height-scale(125));
  }
  lastSquareX = x1;
  lastSquareY = y1;

  game.badShape = game.add.rectangle(x1, y1, badSize, badSize, circleColor);
  game.badShape.setInteractive();
  //testing
  game.badShape.on('pointerdown', function () {
    if (score >= 100) {
      score -= 100;
    }
    respawnShape(game);
    game.expText.setText("Oh no! -100")
    game.expText.setColor("#ff0000")
  });
}