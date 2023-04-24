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
var timeLimit = 30;

var gameExitClickTime = null;
var gameExitVerifyTime = 2;


function preload () {
  this.load.setBaseURL('http://labs.phaser.io');
  pointer = this.add.circle(0, 0, 10, '0xff0000');
  leftPointer = this.add.circle(0, 0, 10, '0x00ff00');
}


function create_game () {
  gameExitButton = this.add.rectangle(75, 50, 100, 50, "0xffffff");
  this.gameExitButtonText = this.add.text(0, 0, "Hover to exit", {
    font: 'bold 15px Arial',
    fill: 'black',
    wordWrap: {width: 600},
    align: "left"
  });
  Phaser.Display.Align.In.Center(this.gameExitButtonText, gameExitButton);

  timeText = this.add.text(300, 50, "",{ fontSize: 24 }).setOrigin(0.5,0.5);
  scoreText = this.add.text(800, 50, "",{ fontSize: 24 }).setOrigin(0.5,0.5);
  timedEvent = this.time.addEvent({ delay: 9999999, callback: this.onClockEvent, callbackScope: this, repeat: 1 });
  score = 0;
}

var shape;
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
    Phaser.Geom.Intersects.CircleToCircle(shape, shape);
    make_shapes = false;
  }

  if (hand_x) {
    updatePointer(pointer, width - hand_x, hand_y);
    updatePointer(leftPointer, width - leftHand_x, leftHand_y);

    if (shape.radius && (Phaser.Geom.Intersects.CircleToCircle(pointer, shape) || Phaser.Geom.Intersects.CircleToCircle(leftPointer, shape))) {
      console.log('TOUCHDOWN');
      score+= 100;
      respawnShape(this);
    }
  }

  if (timeLeft <= 0) {
    this.scene.start('gameover_scene');
  }

  //EXIT BUTTON: hover over Exit for 2 seconds
  // if (Phaser.Geom.Intersects.CircleToRectangle(gameExitButton, pointer)
  // || Phaser.Geom.Intersects.CircleToRectangle(gameExitButton, leftPointer)) {
  //   gameExitButton.fillColor = '0x808080';
  //   if (gameExitClickTime == null) {
  //     gameExitClickTime = elapsedTime;
  //   }
  //   else {
  //     const gameToHomeScreen = gameExitVerifyTime - (elapsedTime - gameExitClickTime);
  //     if(gameToHomeScreen <= 0){
  //       userLocked = true;
  //       this.scene.start('start_scene');
  //     }
  //     this.instructionExitButtonText.setText('Exiting in ' + Math.ceil(gameToHomeScreen));
  //   }
  // }
  // else {
  //   gameExitClickTime = null;
  //   gameExitButton.fillColor = '0xffffff';
  //   this.gameExitButtonText.setText("Hover to exit");
  // }
  // if (userInactive) {
  //   if (inactiveStartTime) {
  //     let inactiveCountdown = inactiveTimeLimit - (elapsedTime - inactiveStartTime);
  //     this.inactiveText.setText(0, 0, 'User has left the screen \n Restarting in ' + inactiveCountdown);
  //     if (inactiveCountdown <= 0) {
  //       this.scene.start('start_scene');
  //     }
  //   }
  //   else {
  //     this.inactiveAlert = this.add.rectangle(width/2, height/2, width*.75, height*.75, '0x808080').setOrigin(0.5);
  //     this.inactiveText = this.add.text(0, 0, 'User has left the screen \n Restarting in ' + inactiveTimeLimit);
  //     Phaser.Display.Align.In.Center(this.inactiveText, this.inactiveAlert);
  //   }
  // }
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
  var x = Phaser.Math.Between(50, width-50);
  var y = Phaser.Math.Between(250, height-250);
  var size = Phaser.Math.Between(10, 50);
  var circleColor = new Phaser.Display.Color();
  circleColor = circleColor.random();
  circleColor = Phaser.Display.Color.GetColor32(circleColor["r"], circleColor["g"], circleColor["b"], circleColor["a"]);
  shape = game.add.circle(x, y, size, circleColor);
  shape.setInteractive();

  //testing
  shape.on('pointerdown', function (shape) {
    this.destroy();
    score += 100;
    make_shapes = true;
  });
}