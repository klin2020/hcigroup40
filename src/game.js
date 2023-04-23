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
var timeLimit = 1000;


function preload () {
  this.load.setBaseURL('http://labs.phaser.io');
  pointer = this.add.circle(0, 0, 10, '0xff0000');
  leftPointer = this.add.circle(0, 0, 10, '0x00ff00');
}

function create_game () {

  timeText = this.add.text(150, 20, "",{ fontSize: 24 }).setOrigin(0.5,0.5);
  scoreText = this.add.text(700, 20, "",{ fontSize: 24 }).setOrigin(0.5,0.5);
  timedEvent = this.time.addEvent({ delay: 9999999, callback: this.onClockEvent, callbackScope: this, repeat: 1 });

  score = 0;
}

var shape;

var make_shapes = true;

function update_game () {
  // console.log('updating');

  // update timer
  let elapsedTime = timedEvent.getElapsedSeconds();
  let timeLeft = timeLimit - elapsedTime;
  timeText.setText('Time Remaining: ' + Math.floor(timeLeft).toString());
  scoreText.setText('Score: ' + score.toString());

  // randomly generate circle
  if (make_shapes) {
    respawnShape(this);
    // console.log(shape);
    Phaser.Geom.Intersects.CircleToCircle(shape, shape);
    // placeholder for update logic
    make_shapes = false;
  }

  if (hand_x) {
    // console.log('updating hand');
    // console.log(hand_x);
    // console.log(hand_y);
    updatePointer(pointer, width - hand_x, hand_y);
    updatePointer(leftPointer, width - leftHand_x, leftHand_y);

    if (shape.radius && (Phaser.Geom.Intersects.CircleToCircle(pointer, shape) || Phaser.Geom.Intersects.CircleToCircle(pointer, shape))) {
      console.log('TOUCHDOWN');
      score += 100;
      respawnShape(this);
    }
  }

  if (timeLeft <= 0) {
    this.scene.start('gameover_scene');
  }

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
  var y = Phaser.Math.Between(50, height-150);
  shape = game.add.circle(x, y, 50, '0x00bfff');
  shape.setInteractive();
  shape.on('pointerdown', function (shape)
    {
      this.destroy();
      make_shapes = true;
      score += 100;
    });
}