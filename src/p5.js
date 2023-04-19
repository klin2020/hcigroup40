var game_scene = {
  preload: preload,
  create: create_game,
  update: update_game,
};

var width;
var height;
var start_time;
var timeText;
var scoreText;
var score;
var timedEvent;
var timeLimit = 15;

function preload () {
  this.load.setBaseURL('http://labs.phaser.io');
}

function create_game () {
  width = this.sys.game.canvas.width;
  height = this.sys.game.canvas.height;

  // timeText = this.add.text(150, 20, "",{ fontSize: 24 }).setOrigin(0.5,0.5);
  // scoreText = this.add.text(700, 20, "",{ fontSize: 24 }).setOrigin(0.5,0.5);
  timedEvent = this.time.addEvent({ delay: 9999999, callback: this.onClockEvent, callbackScope: this, repeat: 1 });
  score = 0;
  this.make.text({
    x: 400,
    y: 100,
    text: 'Test your reaction time and take your residential college to the top!',
    origin: { x: 0.5, y: 0.5},
    style: {
      font: 'bold 40px Arial',
      fill: 'white',
      wordWrap: {width: 600},
      align: "center"
    }
  });

  this.make.text({
    x: 400,
    y: 550,
    text: 'Stand still in front of screen for 3 seconds to begin',
    origin: { x: 0.5, y: 0.5},
    style: {
      font: 'bold 25px Arial',
      fill: 'white',
      wordWrap: {width: 700},
      align: "center"
    }
  });

  // this.add.ellipse(width/2, 450, 200, 100, 0xffffff);
}

var shape;

var make_shapes = true;
var oldTime = 0;

function update_game () {
  // console.log('updating');

  // update timer
  let elapsedTime = timedEvent.getElapsedSeconds();
  let timeLeft = timeLimit - elapsedTime;

  //display time and score
  // timeText.setText('Time Remaining: ' + Math.floor(timeLeft).toString());
  // scoreText.setText('Score: ' + score.toString());


    //create new circle every second until time runs out
    if (parseInt(oldTime) != parseInt(timeLeft)){
      let x = Phaser.Math.Between(0, width);
      let y = Phaser.Math.Between(height-350, height - 150);
      let size = Phaser.Math.Between(10, 100);
      let color = new Phaser.Display.Color();
      color = color.random();
      shape = this.add.circle(x, y, size, color.color);
      shape = this.add.group();
      
      // shape = this.add.circle(x, y, size, '0x00bfff');
      oldTime = timeLeft;
    }
    





  if (timeLeft <= 0) {
    //reset circles, loop
    this.scene.start('game_scene');
  }
}


  // randomly generate circle
  // if (make_shapes) {
  //   console.log(width);
  //   var x = Phaser.Math.Between(50, width-50);
  //   var y = Phaser.Math.Between(50, height-50);
  //   shape = this.add.circle(x, y, 50, '0x00bfff');
  //   shape.setInteractive();

  //   // placeholder for update logic
  //   shape.on('pointerdown', function (shape)
  //   {
  //     this.destroy();
  //     make_shapes = true;
  //     score += 100;
  //   });
  //   make_shapes = false;
  // }
