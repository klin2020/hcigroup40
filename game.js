var game_scene = {
  preload: preload,
  create: create_game,
  update: update_game,
};

var width;
var start_time;
var timeText;
var scoreText;
var score;
var timedEvent;
var timeLimit = 10;

function preload () {
  this.load.setBaseURL('http://labs.phaser.io');

  // this.load.image('sky', 'assets/skies/space3.png');
  // this.load.image('logo', 'assets/sprites/phaser3-logo.png');
  // this.load.image('red', 'assets/particles/red.png');
}

function create_game () {
  width = this.sys.game.canvas.width;
  height = this.sys.game.canvas.height;

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
    console.log(width);
    var x = Phaser.Math.Between(50, width-50);
    var y = Phaser.Math.Between(50, height-50);
    shape = this.add.circle(x, y, 50, '0x00bfff');
    shape.setInteractive();

    // placeholder for update logic
    shape.on('pointerdown', function (shape)
    {
      this.destroy();
      make_shapes = true;
      score += 100;
    });
    make_shapes = false;
  }

  if (timeLeft <= 0) {
    this.scene.start('gameover_scene');
  }
}